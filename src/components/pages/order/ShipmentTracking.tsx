"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookingDetail } from "@/hooks/useBookings";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import { DetailItem } from "./tracking/DetailItem";
import { StatusCard } from "./tracking/StatusCard";
import { TimelineItem } from "./tracking/TimelineItem";

export default function ShipmentTracking() {
  const { t } = useAppTranslation();
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId =
    (typeof params?.id === "string" ? params.id : null) ??
    searchParams.get("bookingId");
  const { booking, loading, error } = useBookingDetail(bookingId);

  if (loading) {
    return <p className="text-white/60 p-8">{t("order.trackingLoading")}</p>;
  }

  if (error || !booking) {
    return <p className="text-white/60 p-8">{t("order.trackingUnavailable")}</p>;
  }

  const statusLabel = t(getBookingStatusTranslationKey(booking.status));
  const shipmentStatuses = [
    { title: t("order.currentStatus"), value: statusLabel },
    {
      title: t("order.estimatedDelivery"),
      value: booking.schedule_datetime ?? t("order.pendingConfirmation"),
    },
    { title: t("order.origin"), value: booking.address || t("order.addressPending") },
  ];
  const shipmentTimeline = [
    {
      icon: "store" as const,
      title: t("order.bookingCreated"),
      date: booking.created_at,
    },
    {
      icon: "truck" as const,
      title: statusLabel,
      date: booking.booking_datetime ?? booking.datetime ?? booking.created_at,
    },
    {
      icon: "check" as const,
      title: t("order.completed"),
      date: booking.status === "completed" ? booking.created_at : t("order.trackingPending"),
      last: true,
    },
  ];
  const shipmentDetails = [
    { title: t("order.trackingNumberLabel"), value: `TRK-${booking.id}` },
    { title: t("order.service"), value: booking.service?.name ?? t("order.bookingService") },
    { title: t("order.distance"), value: String(booking.distance ?? t("order.trackingPending")) },
    { title: t("booking.payment"), value: booking.payment_type ?? t("booking.pending") },
  ];

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-[#222] border border-white/30 rounded-xl p-6 md:p-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white font-hk">
            {t("order.trackingTitle")}
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            {t("order.trackingNumber", { trackingNumber: `TRK-${booking.id}` })}
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
            {t("order.shipmentDetails")}
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
            {t("order.viewOrderDetails")}
          </Link>

          <Button className="h-11 px-6 bg-pink-400 text-white font-semibold">
            {t("order.contactSupport")}
          </Button>
        </div>
      </div>
    </section>
  );
}
