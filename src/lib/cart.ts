import type { BookingDraft } from "@/types/bookings";
import { normalizeBookingDraft, writeBookingDraft } from "./booking-draft";

export type FrontendCartItem = {
  id: string;
  draft: BookingDraft;
  added_at: string;
  updated_at: string;
};

export const CART_STORAGE_KEY = "reactif.cartItems";
export const ACTIVE_CART_ITEM_STORAGE_KEY = "reactif.activeCartItemId";
export const CART_UPDATED_EVENT = "reactif-cart-updated";

const isBrowser = () => typeof window !== "undefined";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const safeReadStorage = (key: string) => {
  if (!isBrowser()) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const emitCartUpdated = () => {
  if (!isBrowser()) return;

  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

const safeWriteStorage = (items: FrontendCartItem[]) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    emitCartUpdated();
  } catch {
    // Storage can be unavailable in private or embedded browser contexts.
  }
};

const normalizeCartItem = (value: unknown): FrontendCartItem | null => {
  if (!isRecord(value)) return null;

  const draft = normalizeBookingDraft(value.draft);
  if (!draft) return null;

  const id = readString(value.id);
  if (!id) return null;

  const now = new Date().toISOString();

  return {
    id,
    draft,
    added_at: readString(value.added_at) || now,
    updated_at: readString(value.updated_at) || now,
  };
};

export const createCartItemId = (draft: BookingDraft) =>
  [
    draft.selected_service.id,
    draft.selected_category,
    draft.selected_subcategory?.id,
    draft.selected_designer_id,
  ]
    .filter(Boolean)
    .join(":");

export const readCartItems = (): FrontendCartItem[] => {
  const rawCart = safeReadStorage(CART_STORAGE_KEY);
  if (!rawCart) return [];

  try {
    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeCartItem)
      .filter((item): item is FrontendCartItem => Boolean(item));
  } catch {
    return [];
  }
};

export const addCartItem = (draft: BookingDraft) => {
  const now = new Date().toISOString();
  const id = createCartItemId(draft);
  const items = readCartItems();
  const existingItem = items.find((item) => item.id === id);
  const nextItem: FrontendCartItem = {
    id,
    draft,
    added_at: existingItem?.added_at ?? now,
    updated_at: now,
  };
  const nextItems = [
    nextItem,
    ...items.filter((item) => item.id !== id),
  ];

  safeWriteStorage(nextItems);
  return nextItem;
};

export const removeCartItem = (id: string | null | undefined) => {
  if (!id) return;

  safeWriteStorage(readCartItems().filter((item) => item.id !== id));
};

export const clearCartItems = () => {
  safeWriteStorage([]);
  clearActiveCartItemId();
};

export const activateCartItem = (item: FrontendCartItem) => {
  writeBookingDraft(item.draft);

  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(ACTIVE_CART_ITEM_STORAGE_KEY, item.id);
  } catch {
    // Storage can be unavailable in private or embedded browser contexts.
  }
};

export const readActiveCartItemId = () => {
  if (!isBrowser()) return null;

  try {
    return window.sessionStorage.getItem(ACTIVE_CART_ITEM_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const clearActiveCartItemId = () => {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.removeItem(ACTIVE_CART_ITEM_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private or embedded browser contexts.
  }
};
