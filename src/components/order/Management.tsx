"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

const getProgressFromStatus = (status: string) => {
  switch (status) {
    case "new_booking":
      return 25;
    case "accepted":
      return 60;
    case "completed":
      return 100;
    case "canceled":
      return 0;
    default:
      return 10;
  }
};

const formatStatusLabel = (status: string) => {
  return status
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const OrderCard = ({
  booking,
}: any) => {
  const router = useRouter();

  let serviceData: any = null;
let fieldResponses: any[] = [];

try {
  serviceData =
    typeof booking.service_data === "string"
      ? JSON.parse(booking.service_data)
      : booking.service_data || null;
} catch {
  serviceData = null;
}

try {
  const parsed =
    typeof booking.field_responses === "string"
      ? JSON.parse(booking.field_responses)
      : booking.field_responses;

  fieldResponses = Array.isArray(parsed) ? parsed : [];
} catch {
  fieldResponses = [];
}
  const quantityField = fieldResponses.find(
    (f: any) => f.field_name === "quantity"
  );

  const quantity = quantityField?.value || null;

  const progress = getProgressFromStatus(booking.status);

  const showTracking =
    booking.status === "accepted" || booking.status === "completed";

  return (
    <Card className="w-full bg-neutral-800 border border-neutral-50/30 rounded-xl px-4 sm:px-6 py-6 flex flex-col gap-8">
      
      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 p-2 bg-indigo-600/20 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-blue-600 rounded-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-neutral-50 text-lg sm:text-xl font-semibold font-hk">
              {serviceData?.service_name || booking.service?.name}
              {quantity && ` (x${quantity})`}
            </h3>
            <p className="text-neutral-50/60 text-sm font-medium font-hk">
              ORD-{booking.id} • Ordered on{" "}
              {new Date(booking.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="text-neutral-50 text-base font-semibold font-hk">
            ${booking.total_amount}
          </div>

          <div className="px-3 py-1 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-neutral-50 text-xs font-medium font-hk">
              {formatStatusLabel(booking.status)}
            </span>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-neutral-50/60 text-sm font-semibold font-hk">
          <span>Order Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 bg-indigo-600/10 rounded-full">
          <div
            className="h-3 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* INFO BOX */}
      <div className="w-full bg-neutral-800 border border-neutral-50/10 rounded-lg px-4 py-4 flex flex-col md:flex-row gap-6 md:gap-16">

        <div className="flex flex-col gap-1">
          <span className="text-neutral-50 text-sm font-semibold font-hk">
            Scheduled Date
          </span>
          <span className="text-neutral-50/60 text-sm font-medium font-hk">
            {booking.schedule_datetime
              ? new Date(booking.schedule_datetime).toLocaleDateString()
              : "Not Scheduled"}
          </span>
        </div>

        {showTracking && (
          <div className="flex flex-col gap-1">
            <span className="text-neutral-50 text-sm font-semibold font-hk">
              Tracking Number
            </span>
            <span className="text-neutral-50/60 text-sm font-medium font-hk">
              TRK-{booking.id} {/* Static since backend doesn't send */}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-neutral-50 text-sm font-semibold font-hk">
            Status
          </span>
          <span className="text-neutral-50/60 text-sm font-medium font-hk">
            {formatStatusLabel(booking.status)}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      {showTracking && (
        <div className="pt-4 border-t border-neutral-50/10">
          <Button
            onClick={() => router.push(`/order/track`)}
            className="h-11 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-neutral-50 rounded-lg font-hk font-semibold"
          >
            Track Shipment
          </Button>
        </div>
      )}
    </Card>
  );
};

const Management = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("sessionToken");

        const res = await fetch(`${API_BASE_URL}/booking-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error("Failed to load bookings");
          return;
        }

        setBookings(data.data || []);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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