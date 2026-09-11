import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { CATEGORY_META, menuTabs, allCategoryKeys, SEED_MENU_ITEMS } from "../data/menuData";
import { getPlaceholderImage } from "../utils/placeholderImage";
import { deleteMenuImage, uploadMenuImage } from "../utils/imageUpload";
import { supabase } from "../lib/supabase";

const MenuContext = createContext(null);

function parsePriceValue(priceStr) {
  const match = String(priceStr).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function normalizeItem(raw) {
  const priceValue = Number(raw.price_value ?? raw.priceValue ?? parsePriceValue(raw.price));
  return {
    id: raw.id,
    category: raw.category,
    name: {
      en: raw.name?.en ?? raw.name_en ?? "",
      hi: raw.name?.hi ?? raw.name_hi ?? "",
    },
    price: raw.price ?? (priceValue ? `₹${priceValue}` : "₹0"),
    priceValue,
    description: raw.description || "",
    image: raw.image ?? raw.image_url ?? null,
    rating: Number(raw.rating ?? 0),
    available: raw.available !== false,
  };
}

function toDbRow(item) {
  return {
    category: item.category,
    name_en: item.name?.en || "",
    name_hi: item.name?.hi || "",
    price: item.price || "₹0",
    price_value: parsePriceValue(item.price),
    description: item.description || "",
    image_url: item.image || null,
    rating: Number(item.rating || 0),
    available: item.available !== false,
  };
}

export function MenuProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Could not load menu from Supabase:", error);
      setMenuError(`Could not load the online menu: ${error.message}`);
      // Keep the site usable if Supabase has not been configured yet.
      setItems(SEED_MENU_ITEMS.map(normalizeItem));
    } else if (!data?.length) {
      setMenuError("The online menu database is empty. Run supabase_seed.sql once in Supabase.");
      setItems([]);
    } else {
      setMenuError("");
      setItems(data.map(normalizeItem));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMenu();

    const channel = supabase
      .channel("menu-items-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        () => {
          fetchMenu();
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.warn("Supabase Realtime channel could not connect.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMenu]);

  const addMenuItem = useCallback(async (data) => {
    const imageUrl = await uploadMenuImage(supabase, data.image);
    const row = toDbRow({ ...data, image: imageUrl });
    const { data: created, error } = await supabase
      .from("menu_items")
      .insert(row)
      .select("*")
      .single();
    if (error) throw error;
    setItems((prev) => [...prev, normalizeItem(created)]);
    return created.id;
  }, []);

  const updateMenuItem = useCallback(async (id, patch) => {
    const current = items.find((item) => item.id === id);
    if (!current) throw new Error("Menu item was not found.");

    let imageUrl = patch.image ?? current.image;
    if (patch.image && patch.image.startsWith("data:image/")) {
      imageUrl = await uploadMenuImage(supabase, patch.image);
    }

    const next = { ...current, ...patch, image: imageUrl };
    const row = toDbRow(next);
    const { data: updated, error } = await supabase
      .from("menu_items")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;

    if (current.image && imageUrl !== current.image) {
      await deleteMenuImage(supabase, current.image);
    }
    setItems((prev) => prev.map((it) => (it.id === id ? normalizeItem(updated) : it)));
  }, [items]);

  const deleteMenuItem = useCallback(async (id) => {
    const current = items.find((item) => item.id === id);
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) throw error;
    if (current?.image) await deleteMenuImage(supabase, current.image);
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, [items]);

  const toggleAvailability = useCallback(async (id) => {
    const current = items.find((item) => item.id === id);
    if (!current) throw new Error("Menu item was not found.");
    const { data: updated, error } = await supabase
      .from("menu_items")
      .update({ available: !current.available, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    setItems((prev) => prev.map((it) => (it.id === id ? normalizeItem(updated) : it)));
  }, [items]);

  const resolveImage = useCallback(
    (item) => item.image || getPlaceholderImage(CATEGORY_META[item.category]?.icon, item.name.en),
    []
  );

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
    Object.keys(grouped).forEach((key) => {
      if (grouped[key].items.length === 0) delete grouped[key];
    });
    return grouped;
  }, [items]);

  const value = {
    items,
    loading,
    menuError,
    categoryMeta: CATEGORY_META,
    categoryKeys: allCategoryKeys,
    menuTabs,
    groupedMenu,
    resolveImage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    refreshMenu: fetchMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within a MenuProvider");
  return ctx;
}
