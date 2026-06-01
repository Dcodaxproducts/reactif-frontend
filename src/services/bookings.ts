import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import type { Booking, CancelBookingPayload } from "@/types/bookings";
import type { ApiItemResponse, ApiListResponse } from "@/types/api";

export type CreateBookingPayload = FormData;

export type CreateBookingResponse = {
  data?: Booking;
  message?: string;
};

export type CancelBookingResponse = {
  data?: Booking;
  message?: string;
};

export const BOOKING_ROUTES = {
  list: API_ENDPOINTS.bookingList,
  create: API_ENDPOINTS.booking,
  detail: API_ENDPOINTS.bookingDetail,
};

export const getBookings = async (): Promise<ApiListResponse<Booking>> => {
  const { data } = await api.get<ApiListResponse<Booking>>(BOOKING_ROUTES.list);

  return data;
};

export const getBookingDetail = async (
  bookingId: number | string,
): Promise<ApiItemResponse<Booking>> => {
  const { data } = await api.get<ApiItemResponse<Booking>>(
    BOOKING_ROUTES.detail,
    {
      params: {
        booking_id: bookingId,
      },
    },
  );

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

export const cancelBooking = async (
  payload: CancelBookingPayload,
): Promise<CancelBookingResponse> => {
  const { data } = await api.post<CancelBookingResponse>(
    BOOKING_ROUTES.create,
    payload,
  );

  return data;
};
