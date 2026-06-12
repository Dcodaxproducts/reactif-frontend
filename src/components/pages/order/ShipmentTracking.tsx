"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { StatusCard as StatusMessageCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookingDetail } from "@/hooks/useBookings";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import {
  TRACKING_STAGES,
  getTrackingStageFromStatus,
  getTrackingStageIndex,
  getTrackingStageTranslationKey,
} from "@/lib/tracking-status";
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
    return (
      <section className="w-full px-4 py-10">
        <StatusMessageCard
          tone="loading"
          title={t("order.trackingLoading")}
          className="mx-auto max-w-3xl"
        />
      </section>
    );
  }

  if (error || !booking) {
    return (
      <section className="w-full px-4 py-10">
        <StatusMessageCard
          tone="error"
          label={t("common.backendError")}
          title={t("order.trackingUnavailable")}
          description={error ?? undefined}
          action={
            <Button
              asChild
              variant="neutralOutline"
              className="h-11 rounded-full px-5"
            >
              <Link href="/order/management">{t("common.back")}</Link>
            </Button>
          }
          className="mx-auto max-w-3xl"
        />
      </section>
    );
  }

  const currentStage = getTrackingStageFromStatus(booking.status);
  const currentStageIndex = getTrackingStageIndex(currentStage);
  const statusLabel = t(getBookingStatusTranslationKey(booking.status));
  const stageLabel = t(getTrackingStageTranslationKey(currentStage));
  const shipmentStatuses = [
    { title: t("order.currentStatus"), value: stageLabel },
    { title: t("order.backendStatus"), value: statusLabel },
    {
      title: t("order.estimatedDelivery"),
      value: booking.schedule_datetime ?? t("order.pendingConfirmation"),
    },
  ];
  const activeStageDate =
    booking.booking_datetime ?? booking.datetime ?? booking.created_at;
  const shipmentTimeline = TRACKING_STAGES.map((stage, index) => ({
    icon:
      index === 0
        ? ("store" as const)
        : stage === "delivered"
          ? ("check" as const)
          : ("truck" as const),
    title: t(getTrackingStageTranslationKey(stage)),
    date: index <= currentStageIndex ? activeStageDate : t("order.trackingPending"),
    last: index === TRACKING_STAGES.length - 1,
  }));
  const shipmentDetails = [
    { title: t("order.trackingNumberLabel"), value: `TRK-${booking.id}` },
    { title: t("order.service"), value: booking.service?.name ?? t("order.bookingService") },
    { title: t("order.origin"), value: booking.address || t("order.addressPending") },
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

          <Button
            asChild
            className="h-11 px-6 bg-pink-400 text-white font-semibold"
          >
            <Link href={`/support?bookingId=${encodeURIComponent(String(booking.id))}`}>
              {t("order.contactSupport")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
