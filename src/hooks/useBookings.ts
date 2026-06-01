"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  cancelBooking,
  createBooking,
  getBookingDetail,
  getBookings,
  type CancelBookingResponse,
  type CreateBookingPayload,
} from "@/services/bookings";
import type { CancelBookingPayload } from "@/types/bookings";

export const bookingKeys = {
  all: ["bookings"] as const,
  list: () => ["bookings", "list"] as const,
  detail: (bookingId: number | string | null | undefined) =>
    ["bookings", "detail", bookingId] as const,
};

export const useBookings = () => {
  const query = useQuery({
    queryKey: bookingKeys.list(),
    queryFn: getBookings,
  });

  return {
    ...query,
    bookings: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong")
      : null,
  };
};

export const useBookingDetail = (bookingId?: number | string | null) => {
  const query = useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: () => getBookingDetail(bookingId ?? ""),
    enabled: Boolean(bookingId),
  });

  return {
    ...query,
    booking: query.data?.data ?? null,
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong")
      : null,
  };
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      toast.success("Booking created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create booking"));
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<CancelBookingResponse, Error, CancelBookingPayload>({
    mutationFn: (payload) => cancelBooking(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(payload.booking_id),
      });
      toast.success("Booking canceled successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to cancel booking"));
    },
  });
};
