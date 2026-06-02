"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { canTrackBookingStatus } from "@/lib/booking-status";
import { useAppTranslation } from "@/hooks/useAppTranslation";
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
  const { t } = useAppTranslation();
  const { id, status, created_at, schedule_datetime, total_amount, service } =
    booking;
  const { name: serviceName } = service ?? {};
  const { serviceData, fieldResponses } = parseBookingData(booking);
  const quantity =
    fieldResponses.find(({ field_name }) => field_name === "quantity")?.value ||
    null;
  const progress = getProgressFromStatus(status);
  const showTracking = canTrackBookingStatus(status) || status === "completed";
  const title = `${String(serviceData?.service_name ?? serviceName ?? t("booking.bookingFallback"))}${quantity ? ` (x${quantity})` : ""}`;
  const scheduledDate = schedule_datetime
    ? new Date(schedule_datetime).toLocaleDateString()
    : t("booking.notScheduled");

  return (
    <Card className="w-full bg-neutral-800 border border-neutral-50/30 rounded-xl px-4 sm:px-6 py-6 flex flex-col gap-8">
      <OrderCardHeader
        title={title}
        subtitle={`ORD-${id} • ${t("booking.orderedOn", {
          date: new Date(created_at).toLocaleDateString(),
        })}`}
        amount={total_amount}
        status={status}
      />

      <OrderProgress progress={progress} />

      <OrderInfoBox
        scheduledDate={scheduledDate}
        status={status}
        trackingNumber={showTracking ? `TRK-${id}` : undefined}
      />

      <div className="pt-4 border-t border-neutral-50/10 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => router.push(`/order/management/${id}`)}
          className="h-11 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-50 rounded-lg font-hk font-semibold"
        >
          {t("booking.viewDetails")}
        </Button>

        {showTracking && (
          <Button
            onClick={() => router.push(`/order/track/${id}`)}
            className="h-11 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-neutral-50 rounded-lg font-hk font-semibold"
          >
            {t("booking.trackShipment")}
          </Button>
        )}
      </div>
    </Card>
  );
}
