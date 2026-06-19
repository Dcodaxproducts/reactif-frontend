import type { Booking, CancelBookingPayload } from "@/types/bookings";

const readRequiredBookingValue = (
  value: string | number | null | undefined,
): string | number | null => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return value;
};

const readRequiredBookingText = (
  value: string | null | undefined,
): string | null => {
  if (!value) {
    return null;
  }

  return value;
};

export const buildCancelBookingPayload = (
  booking: Booking,
  cancellationReason: string,
): CancelBookingPayload | null => {
  const serviceId = readRequiredBookingValue(
    booking.service_id ?? booking.service?.id,
  );
  const address = readRequiredBookingText(booking.address);
  const latitude = readRequiredBookingValue(booking.latitude);
  const longitude = readRequiredBookingValue(booking.longitude);
  const datetime = readRequiredBookingText(
    booking.datetime ?? booking.booking_datetime ?? booking.schedule_datetime,
  );

  if (
    serviceId === null ||
    address === null ||
    latitude === null ||
    longitude === null ||
    datetime === null
  ) {
    return null;
  }

  return {
    booking_id: booking.id,
    cancellation_reason: cancellationReason,
    service_id: serviceId,
    address,
    latitude,
    longitude,
    datetime,
    status: "canceled",
  };
};
