import api from "@/lib/axios";
import type { Booking } from "@/types/bookings";
import type { ApiListResponse } from "@/types/api";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type CreateBookingPayload = FormData;

export type CreateBookingResponse = {
  data?: Booking;
  message?: string;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const BOOKING_ROUTES = {
  list: "/booking-list",
  create: "/booking",
};

/**
 * ==============================
 * BOOKING APIS
 * ==============================
 */

export const getBookings = async (): Promise<ApiListResponse<Booking>> => {
  const { data } = await api.get<ApiListResponse<Booking>>(BOOKING_ROUTES.list);

  return data;
};

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<CreateBookingResponse> => {
  const { data } = await api.post<CreateBookingResponse>(
    BOOKING_ROUTES.create,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};
