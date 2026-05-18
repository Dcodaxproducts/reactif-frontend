"use client";

import { useEffect, useState } from "react";
import { bookingService } from "@/services/bookings";
import type { Booking } from "@/types/bookings";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) {
          setBookings([]);
          return;
        }

        const data = await bookingService.list(token);
        setBookings(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
};
