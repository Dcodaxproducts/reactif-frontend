"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookingDetail, useCancelBooking } from "@/hooks/useBookings";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import { parseBookingData } from "./management/order-management-utils";

export default function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const { t } = useAppTranslation();
  const bookingId = typeof params?.id === "string" ? params.id : null;
  const { booking, loading, error } = useBookingDetail(bookingId);
  const cancelBookingMutation = useCancelBooking();

  const handleCancel = async () => {
    if (!bookingId) return;

    try {
      await cancelBookingMutation.mutateAsync({
        booking_id: bookingId,
        cancellation_reason: "Canceled by customer",
      });
    } catch {
      toast.error(t("booking.unableToCancel"));
    }
  };

  if (loading) {
    return <p className="text-neutral-50/60 p-8">{t("booking.loadingBooking")}</p>;
  }

  if (error || !booking) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <p className="text-neutral-50/60">{t("booking.detailUnavailable")}</p>
        <Button onClick={() => router.push("/order/management")}>
          {t("common.back")}
        </Button>
      </div>
    );
  }

  const { serviceData, fieldResponses } = parseBookingData(booking);
  const serviceName =
    serviceData?.service_name ?? booking.service?.name ?? t("booking.bookingFallback");
  const statusLabel = t(getBookingStatusTranslationKey(booking.status));

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800/80 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              {serviceName}
            </h1>
            <p className="text-neutral-50/60">
              ORD-{booking.id} • {statusLabel}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-50/70">
            <p>{t("booking.total")}: ${booking.total_amount}</p>
            <p>{t("booking.subtotal")}: ${booking.subtotal ?? booking.total_amount}</p>
            <p>{t("booking.scheduled")}: {booking.schedule_datetime ?? t("booking.notScheduled")}</p>
            <p>{t("booking.address")}: {booking.address || t("booking.notProvided")}</p>
            <p>{t("booking.payment")}: {booking.payment_type ?? t("booking.pending")}</p>
            <p>{t("booking.bookingType")}: {booking.booking_type ?? t("booking.direct")}</p>
          </div>

          {fieldResponses.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-neutral-50 text-xl font-semibold">
                {t("booking.configuration")}
              </h2>
              {fieldResponses.map((field) => (
                <div
                  key={`${field.field_id ?? field.field_name}`}
                  className="flex justify-between gap-4 text-neutral-50/70"
                >
                  <span>{field.label ?? field.lable ?? field.field_name}</span>
                  <span>{field.value ?? t("booking.notProvided")}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push(`/order/track/${booking.id}`)}>
              {t("booking.track")}
            </Button>
            <Button
              variant="neutralOutline"
              disabled={cancelBookingMutation.isPending}
              onClick={handleCancel}
            >
              {t("booking.cancelBooking")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
