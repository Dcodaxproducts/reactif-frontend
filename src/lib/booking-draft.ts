import type {
  BookingDraft,
  BookingDraftFileReference,
  BookingFieldResponse,
} from "@/types/bookings";

export const BOOKING_DRAFT_STORAGE_KEY = "reactif.bookingDraft";

const bookingDraftFiles = new Map<string, File>();

const isBrowser = () => typeof window !== "undefined";

const safeReadStorage = () => {
  if (!isBrowser()) return null;

  try {
    return window.sessionStorage.getItem(BOOKING_DRAFT_STORAGE_KEY);
  } catch {
    return null;
  }
};

const safeWriteStorage = (draft: BookingDraft) => {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(BOOKING_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    window.localStorage.setItem(BOOKING_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const isBookingFieldResponse = (value: unknown): value is BookingFieldResponse =>
  isRecord(value) && typeof value.field_name === "string";

const isFileReference = (value: unknown): value is BookingDraftFileReference =>
  isRecord(value) &&
  typeof value.fieldName === "string" &&
  typeof value.key === "string" &&
  typeof value.name === "string" &&
  typeof value.type === "string" &&
  typeof value.size === "number";

export const normalizeBookingDraft = (value: unknown): BookingDraft | null => {
  if (!isRecord(value)) return null;

  const selectedService = value.selected_service;
  if (!isRecord(selectedService)) return null;

  const serviceId = Number(selectedService.id);
  if (!Number.isFinite(serviceId)) return null;

  const fieldResponses = Array.isArray(value.dynamic_field_responses)
    ? value.dynamic_field_responses.filter(isBookingFieldResponse)
    : [];
  const fileReferences = Array.isArray(value.uploaded_file_references)
    ? value.uploaded_file_references.filter(isFileReference)
    : [];
  const selectedSubcategory = isRecord(value.selected_subcategory)
    ? {
        id:
          typeof value.selected_subcategory.id === "number"
            ? value.selected_subcategory.id
            : null,
        name: readString(value.selected_subcategory.name) || null,
      }
    : null;

  return {
    selected_service: {
      id: serviceId,
      name: readString(selectedService.name) || "Selected Service",
      price:
        typeof selectedService.price === "number"
          ? selectedService.price
          : Number.isFinite(Number(selectedService.price))
            ? Number(selectedService.price)
            : null,
      description: readString(selectedService.description) || null,
      image: readString(selectedService.image) || null,
      field_count: Number.isFinite(Number(selectedService.field_count))
        ? Number(selectedService.field_count)
        : fieldResponses.length,
    },
    selected_category: readString(value.selected_category) || null,
    selected_subcategory: selectedSubcategory,
    selected_design_path: readString(value.selected_design_path) || null,
    selected_designer_id: readString(value.selected_designer_id) || null,
    dynamic_field_responses: fieldResponses,
    uploaded_file_references: fileReferences,
    address: readString(value.address),
    latitude: readString(value.latitude),
    longitude: readString(value.longitude),
    booking_datetime: readString(value.booking_datetime),
    schedule_datetime: readString(value.schedule_datetime),
    distance: readString(value.distance),
    subtotal: readString(value.subtotal),
    extra_charges_amount: readString(value.extra_charges_amount),
    total_amount: readString(value.total_amount),
    payment_type: readString(value.payment_type),
    booking_type: readString(value.booking_type),
  };
};

export const writeBookingDraft = (draft: BookingDraft) => {
  safeWriteStorage(draft);
};

export const readBookingDraft = (): BookingDraft | null => {
  const rawDraft = safeReadStorage();
  if (!rawDraft) return null;

  try {
    return normalizeBookingDraft(JSON.parse(rawDraft));
  } catch {
    return null;
  }
};

export const clearBookingDraft = () => {
  bookingDraftFiles.clear();

  if (!isBrowser()) return;

  try {
    window.sessionStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY);
    window.localStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private or embedded browser contexts.
  }
};

export const rememberBookingDraftFile = (key: string, file: File) => {
  bookingDraftFiles.set(key, file);
};

export const getBookingDraftFile = (key: string) => bookingDraftFiles.get(key);
