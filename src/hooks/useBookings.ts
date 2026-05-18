"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createBooking,
  getBookings,
  type CreateBookingPayload,
} from "@/services/bookings";

/**
 * ==============================
 * QUERY KEYS
 * ==============================
 */

export const bookingKeys = {
  all: ["bookings"] as const,
  list: () => ["bookings", "list"] as const,
};

/**
 * ==============================
 * BOOKING HOOKS
 * ==============================
 */

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
