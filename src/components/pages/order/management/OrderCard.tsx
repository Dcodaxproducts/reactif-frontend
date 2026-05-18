"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Booking } from "@/types/bookings";
import { OrderCardHeader } from "./OrderCardHeader";
import { OrderInfoBox } from "./OrderInfoBox";
import { OrderProgress } from "./OrderProgress";
import {
  getProgressFromStatus,
  parseBookingData,
} from "./order-management-utils";

export function OrderCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const { serviceData, fieldResponses } = parseBookingData(booking);
  const quantity =
    fieldResponses.find((field) => field.field_name === "quantity")?.value ||
    null;
  const progress = getProgressFromStatus(booking.status);
  const showTracking =
    booking.status === "accepted" || booking.status === "completed";
  const title = `${String(serviceData?.service_name || booking.service?.name || "Booking")}${quantity ? ` (x${quantity})` : ""}`;
  const scheduledDate = booking.schedule_datetime
    ? new Date(booking.schedule_datetime).toLocaleDateString()
    : "Not Scheduled";

  return (
    <Card className="w-full bg-neutral-800 border border-neutral-50/30 rounded-xl px-4 sm:px-6 py-6 flex flex-col gap-8">
      <OrderCardHeader
        title={title}
        subtitle={`ORD-${booking.id} • Ordered on ${new Date(booking.created_at).toLocaleDateString()}`}
        amount={booking.total_amount}
        status={booking.status}
      />

      <OrderProgress progress={progress} />

      <OrderInfoBox
        scheduledDate={scheduledDate}
        status={booking.status}
        trackingNumber={showTracking ? `TRK-${booking.id}` : undefined}
      />

      {showTracking && (
        <div className="pt-4 border-t border-neutral-50/10">
          <Button
            onClick={() => router.push("/order/track")}
            className="h-11 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-neutral-50 rounded-lg font-hk font-semibold"
          >
            Track Shipment
          </Button>
        </div>
      )}
    </Card>
  );
}
