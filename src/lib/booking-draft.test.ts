import { afterEach, describe, expect, it, vi } from "vitest";

import {
  BOOKING_DRAFT_STORAGE_KEY,
  clearBookingDraft,
  readBookingDraft,
  writeBookingDraft,
} from "./booking-draft";
import type { BookingDraft } from "@/types/bookings";

const createStorage = () => {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
  };
};

const draft: BookingDraft = {
  selected_service: { id: 1, name: "Wrap", price: 100 },
  selected_category: "Paint",
  selected_subcategory: { id: 2, name: "Front" },
  selected_design_path: "Paint",
  selected_designer_id: "9",
  dynamic_field_responses: [
    { field_id: 10, field_name: "finish", field_type: "text", value: "matte" },
  ],
  uploaded_file_references: [
    {
      fieldName: "logo",
      fieldId: 11,
      key: "file_11",
      name: "logo.png",
      type: "image/png",
      size: 100,
    },
  ],
  address: "Customer address",
  latitude: "1",
  longitude: "2",
  booking_datetime: "2026-06-01T00:00:00.000Z",
  schedule_datetime: "2026-06-02T00:00:00.000Z",
  distance: "12",
  subtotal: "100",
  extra_charges_amount: "5",
  total_amount: "105",
  payment_type: "pending",
  booking_type: "direct",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("booking draft storage", () => {
  it("saves and reads booking draft", () => {
    const sessionStorage = createStorage();
    vi.stubGlobal("window", {
      sessionStorage,
      localStorage: createStorage(),
    });

    writeBookingDraft(draft);

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      BOOKING_DRAFT_STORAGE_KEY,
      JSON.stringify(draft),
    );
    expect(readBookingDraft()).toMatchObject({
      selected_service: { id: 1, name: "Wrap" },
      dynamic_field_responses: draft.dynamic_field_responses,
    });
  });

  it("clears booking draft", () => {
    const sessionStorage = createStorage();
    const localStorage = createStorage();
    vi.stubGlobal("window", { sessionStorage, localStorage });

    clearBookingDraft();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith(
      BOOKING_DRAFT_STORAGE_KEY,
    );
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      BOOKING_DRAFT_STORAGE_KEY,
    );
  });

  it("falls back safely when draft is missing", () => {
    vi.stubGlobal("window", {
      sessionStorage: createStorage(),
      localStorage: createStorage(),
    });

    expect(readBookingDraft()).toBeNull();
  });
});
