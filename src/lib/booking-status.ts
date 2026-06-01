const BOOKING_PROGRESS: Record<string, number> = {
  new_booking: 15,
  pending: 20,
  accepted: 35,
  arriving: 45,
  arrived: 55,
  in_progress: 65,
  processing: 70,
  ready_to_pickup: 80,
  picked_up: 88,
  pickedup: 88,
  delivered: 95,
  completed: 100,
  canceled: 0,
};

export const normalizeBookingStatus = (status: string | null | undefined) =>
  (status ?? "pending").trim().toLowerCase();

export const getBookingStatusProgress = (status: string | null | undefined) =>
  BOOKING_PROGRESS[normalizeBookingStatus(status)] ?? 10;

export const formatBookingStatusLabel = (status: string | null | undefined) =>
  normalizeBookingStatus(status)
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const canTrackBookingStatus = (status: string | null | undefined) =>
  getBookingStatusProgress(status) > 0 &&
  getBookingStatusProgress(status) < 100;

