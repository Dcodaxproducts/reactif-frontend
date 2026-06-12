"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CART_UPDATED_EVENT,
  clearCartItems,
  readCartItems,
  removeCartItem,
  type FrontendCartItem,
} from "@/lib/cart";

export const useCart = () => {
  const [items, setItems] = useState<FrontendCartItem[]>([]);

  const refresh = useCallback(() => {
    setItems(readCartItems());
  }, []);

  useEffect(() => {
    refresh();

    window.addEventListener(CART_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const removeItem = useCallback(
    (id: string) => {
      removeCartItem(id);
      refresh();
    },
    [refresh],
  );

  const clearItems = useCallback(() => {
    clearCartItems();
    refresh();
  }, [refresh]);

  return {
    items,
    count: items.length,
    refresh,
    removeItem,
    clearItems,
  };
};
