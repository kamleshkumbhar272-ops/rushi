import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cart shape: { [itemId]: { id, nameEn, nameHi, price, qty } }
  const [cart, setCart] = useState({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function addItem(item) {
    setCart((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          ...item,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
    });
  }

  function decrementItem(id) {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...existing, qty: existing.qty - 1 } };
    });
  }

  function removeItem(id) {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  function clearCart() {
    setCart({});
  }

  const items = useMemo(() => Object.values(cart), [cart]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = {
    cart,
    items,
    itemCount,
    total,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
