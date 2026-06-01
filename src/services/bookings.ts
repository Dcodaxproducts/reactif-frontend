import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import type { Booking } from "@/types/bookings";
import type { ApiListResponse } from "@/types/api";

export type CreateBookingPayload = FormData;

export type CreateBookingResponse = {
  data?: Booking;
  message?: string;
};

export const BOOKING_ROUTES = {
  list: API_ENDPOINTS.bookingList,
  create: API_ENDPOINTS.booking,
  detail: API_ENDPOINTS.bookingDetail,
  paymentGatewayList: API_ENDPOINTS.paymentGatewayList,
  savePayment: API_ENDPOINTS.savePayment,
};

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
