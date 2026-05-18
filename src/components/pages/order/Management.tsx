"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useBookings } from "@/hooks/useBookings";
import { OrderCard } from "./management/OrderCard";

const Management = () => {
  const { bookings, loading, error } = useBookings();

  useEffect(() => {
    if (error) toast.error("Failed to load bookings");
  }, [error]);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-neutral-50 text-3xl sm:text-4xl font-semibold font-hk">
            Booking Management
          </h1>
          <p className="text-neutral-50/60 text-base sm:text-lg font-medium font-hk">
            Track and manage your bookings
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {loading && <p className="text-neutral-50/60">Loading...</p>}

          {!loading && bookings.length === 0 && (
            <p className="text-neutral-50/60">No bookings found.</p>
          )}

          {bookings.map((booking) => (
            <OrderCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Management;
