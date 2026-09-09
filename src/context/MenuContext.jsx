import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { CATEGORY_META, menuTabs, allCategoryKeys, SEED_MENU_ITEMS } from "../data/menuData";
import { loadStoredMenuItems, saveStoredMenuItems } from "../data/menuStorage";
import { getPlaceholderImage } from "../utils/placeholderImage";

// ---------------------------------------------------------------------
// MenuContext — THE single data source for the whole app.
//
//        Admin Panel  --->  MenuContext (this file)  --->  Customer Menu
//                                     |
//                                     v
//                                   Cart
//
// Every menu item lives once, here. AdminPanel calls the CRUD functions
// below; the customer Menu page and the Cart both read from the same
// `items` state — so an edit made in the Admin Panel is reflected
// everywhere else the instant it's saved. No data is duplicated.
// ---------------------------------------------------------------------

const MenuContext = createContext(null);

function parsePriceValue(priceStr) {
  const match = String(priceStr).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function normalizeItem(raw) {
  // Always derive priceValue fresh from the price string, so editing the
  // price in the Admin Panel is guaranteed to update what the Cart charges.
  const priceValue = parsePriceValue(raw.price);
  return {
    id: raw.id,
    category: raw.category,
    name: { en: raw.name?.en || "", hi: raw.name?.hi || "" },
    price: raw.price ?? (priceValue ? `₹${priceValue}` : "₹0"),
    priceValue,
    description: raw.description || "",
    image: raw.image || null,
    available: raw.available !== false,
  };
}

function makeId(category, name) {
  const slug = String(name || "item")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${category}-${slug}-${Date.now().toString(36)}`;
}

export function MenuProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = loadStoredMenuItems();
    const base = stored && stored.length ? stored : SEED_MENU_ITEMS;
    return base.map(normalizeItem);
  });

  // Persist every change immediately — this is the "database write" step.
  // (See src/data/menuStorage.js for why this is localStorage today and
  // what swapping to a real backend would look like.)
  useEffect(() => {
    saveStoredMenuItems(items);
  }, [items]);

  const addMenuItem = useCallback((data) => {
    const id = makeId(data.category, data.name?.en);
    setItems((prev) => [...prev, normalizeItem({ ...data, id })]);
    return id;
  }, []);

  const updateMenuItem = useCallback((id, patch) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? normalizeItem({ ...it, ...patch }) : it))
    );
  }, []);

  const deleteMenuItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const toggleAvailability = useCallback((id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, available: !it.available } : it))
    );
  }, []);

  const resolveImage = useCallback(
    (item) => item.image || getPlaceholderImage(CATEGORY_META[item.category]?.icon, item.name.en),
    []
  );

  // Shape data the way the existing customer Menu / MenuCategoryCard
  // components already expect: { [categoryKey]: { icon, label, items } }
  const groupedMenu = useMemo(() => {
    const grouped = {};
    allCategoryKeys.forEach((key) => {
      grouped[key] = { ...CATEGORY_META[key], items: [] };
    });
    items
      .filter((it) => it.available)
      .forEach((it) => {
        if (!grouped[it.category]) {
          grouped[it.category] = { icon: "🍽️", label: { en: it.category, hi: "" }, items: [] };
        }
        grouped[it.category].items.push(it);
      });
    // drop empty categories from the customer-facing view
    Object.keys(grouped).forEach((key) => {
      if (grouped[key].items.length === 0) delete grouped[key];
    });
    return grouped;
  }, [items]);

  const value = {
    items,
    categoryMeta: CATEGORY_META,
    categoryKeys: allCategoryKeys,
    menuTabs,
    groupedMenu,
    resolveImage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within a MenuProvider");
  return ctx;
}
