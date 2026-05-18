import { apiClient } from "@/services/api-client";
import type { ApiListResponse } from "@/types/categories";
import type { Booking } from "@/types/bookings";

export const bookingService = {
  list(token: string) {
    return apiClient<ApiListResponse<Booking>>("/booking-list", {
      token,
    });
  },

  create(payload: FormData, token: string) {
    return apiClient<{ data?: Booking; message?: string }>("/booking", {
      method: "POST",
      token,
      body: payload,
    });
  },
};
