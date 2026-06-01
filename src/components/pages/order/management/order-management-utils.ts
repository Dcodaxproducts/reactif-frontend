import type { Booking, BookingFieldResponse } from "@/types/bookings";
import {
  formatBookingStatusLabel,
  getBookingStatusProgress,
} from "@/lib/booking-status";
import type {
  BookingParsedData,
  BookingServiceData,
} from "@/types/component-props";

export const getProgressFromStatus = (status: string) => {
  return getBookingStatusProgress(status);
};

export const formatStatusLabel = (status: string) =>
  formatBookingStatusLabel(status);

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
