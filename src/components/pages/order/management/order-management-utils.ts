import type { Booking, BookingFieldResponse } from "@/types/bookings";
import type {
  BookingParsedData,
  BookingServiceData,
} from "@/types/component-props";

export const getProgressFromStatus = (status: string) => {
  switch (status) {
    case "new_booking":
      return 25;
    case "accepted":
      return 60;
    case "completed":
      return 100;
    case "canceled":
      return 0;
    default:
      return 10;
  }
};

export const formatStatusLabel = (status: string) =>
  status.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export const parseBookingData = (booking: Booking): BookingParsedData => {
  const { service_data, field_responses } = booking;
  let serviceData: BookingServiceData | null = null;
  let fieldResponses: BookingFieldResponse[] = [];

  try {
    serviceData =
      typeof service_data === "string"
        ? (JSON.parse(service_data) as BookingServiceData)
        : ((service_data as BookingServiceData | null) ?? null);
  } catch {
    serviceData = null;
  }

  try {
    const parsed =
      typeof field_responses === "string"
        ? JSON.parse(field_responses)
        : field_responses;

    fieldResponses = Array.isArray(parsed) ? parsed : [];
  } catch {
    fieldResponses = [];
  }

  return { serviceData, fieldResponses };
};
