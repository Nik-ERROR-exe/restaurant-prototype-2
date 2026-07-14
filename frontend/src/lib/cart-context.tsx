import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Dish } from "./menu-data";

export interface CartItem {
  dish: Dish;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (dish: Dish, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add: CartCtx["add"] = (dish, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { dish, qty }];
    });
  };

  const remove: CartCtx["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.dish.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) => {
    if (qty <= 0) return remove(id);
    setItems((prev) => prev.map((i) => (i.dish.id === id ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.qty * i.dish.price, 0),
    }),
    [items, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
