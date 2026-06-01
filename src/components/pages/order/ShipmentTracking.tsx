"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBookingDetail } from "@/hooks/useBookings";
import { formatBookingStatusLabel } from "@/lib/booking-status";
import { DetailItem } from "./tracking/DetailItem";
import { StatusCard } from "./tracking/StatusCard";
import { TimelineItem } from "./tracking/TimelineItem";

export default function ShipmentTracking() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId =
    (typeof params?.id === "string" ? params.id : null) ??
    searchParams.get("bookingId");
  const { booking, loading, error } = useBookingDetail(bookingId);

  if (loading) {
    return <p className="text-white/60 p-8">Loading tracking...</p>;
  }

  if (error || !booking) {
    return <p className="text-white/60 p-8">Tracking data is unavailable.</p>;
  }

  const statusLabel = formatBookingStatusLabel(booking.status);
  const shipmentStatuses = [
    { title: "Current Status", value: statusLabel },
    {
      title: "Estimated Delivery",
      value: booking.schedule_datetime ?? "Pending confirmation",
    },
    { title: "Origin", value: booking.address || "Address pending" },
  ];
  const shipmentTimeline = [
    {
      icon: "store" as const,
      title: "Booking Created",
      date: booking.created_at,
    },
    {
      icon: "truck" as const,
      title: statusLabel,
      date: booking.booking_datetime ?? booking.datetime ?? booking.created_at,
    },
    {
      icon: "check" as const,
      title: "Completed",
      date: booking.status === "completed" ? booking.created_at : "Pending",
      last: true,
    },
  ];
  const shipmentDetails = [
    { title: "Tracking Number", value: `TRK-${booking.id}` },
    { title: "Service", value: booking.service?.name ?? "Booking service" },
    { title: "Distance", value: String(booking.distance ?? "Pending") },
    { title: "Payment", value: booking.payment_type ?? "Pending" },
  ];

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-[#222] border border-white/30 rounded-xl p-6 md:p-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white font-hk">
            Shipment Tracking
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Tracking number: TRK-{booking.id}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shipmentStatuses.map((status) => (
            <StatusCard key={status.title} {...status} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {shipmentTimeline.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Shipment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipmentDetails.map((detail) => (
              <DetailItem key={detail.title} {...detail} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/order/management/${booking.id}`}
            className="h-11 px-6 bg-[#E8EDF2] text-black font-[600] flex items-center justify-center rounded-sm"
          >
            View Order Details
          </Link>

          <Button className="h-11 px-6 bg-pink-400 text-white font-semibold">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
