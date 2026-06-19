"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, PackageSearch, XCircle } from "lucide-react";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookingDetail, useCancelBooking } from "@/hooks/useBookings";
import {
  formatBookingDateTime,
  formatBookingDisplayValue,
  formatBookingLabel,
} from "@/lib/booking-display";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import { buildCancelBookingPayload } from "@/lib/cancel-booking-payload";
import { formatCurrency } from "@/lib/currency";
import { parseBookingData } from "./management/order-management-utils";

export default function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const { t } = useAppTranslation();
  const bookingId = typeof params?.id === "string" ? params.id : null;
  const { booking, loading, error } = useBookingDetail(bookingId);
  const cancelBookingMutation = useCancelBooking();

  const handleCancel = async () => {
    if (!booking) return;

    try {
      const payload = buildCancelBookingPayload(
        booking,
        t("booking.cancelReasonCustomer"),
      );

      if (!payload) {
        toast.error(t("booking.unableToCancel"));
        return;
      }

      await cancelBookingMutation.mutateAsync(payload);
    } catch {
      toast.error(t("booking.unableToCancel"));
    }
  };

  if (loading) {
    return (
      <section className="w-full px-4 py-10">
        <StatusCard
          tone="loading"
          title={t("booking.loadingBooking")}
          className="mx-auto max-w-3xl"
        />
      </section>
    );
  }

  if (error || !booking) {
    return (
      <section className="w-full px-4 py-10">
        <StatusCard
          tone="error"
          label={t("common.backendError")}
          title={t("booking.detailUnavailable")}
          description={error ?? undefined}
          action={
            <Button
              type="button"
              variant="neutralOutline"
              className="h-11 rounded-full px-5"
              onClick={() => router.push("/order/management")}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("common.back")}
            </Button>
          }
          className="mx-auto max-w-3xl"
        />
      </section>
    );
  }

  const { serviceData, fieldResponses } = parseBookingData(booking);
  const serviceName =
    serviceData?.service_name ?? booking.service?.name ?? t("booking.bookingFallback");
  const statusLabel = t(getBookingStatusTranslationKey(booking.status));
  const notProvided = t("booking.notProvided");
  const scheduledDate = formatBookingDateTime(
    booking.schedule_datetime,
    t("booking.notScheduled"),
  );
  const createdDate = formatBookingDateTime(booking.created_at, notProvided);
  const paymentType = formatBookingLabel(
    booking.payment?.payment_type ?? booking.payment_type,
    t("booking.pending"),
  );
  const paymentStatus = formatBookingLabel(
    booking.payment?.payment_status,
    t("booking.pending"),
  );
  const categoryName = formatBookingDisplayValue(
    serviceData?.category,
    notProvided,
  );
  const subcategoryName = formatBookingDisplayValue(
    serviceData?.subcategory?.name,
    notProvided,
  );
  const bookingDetails = [
    { label: t("booking.total"), value: formatCurrency(booking.total_amount) },
    {
      label: t("booking.subtotal"),
      value: formatCurrency(booking.subtotal ?? booking.total_amount),
    },
    { label: t("booking.scheduled"), value: scheduledDate },
    { label: t("booking.created"), value: createdDate },
    {
      label: t("booking.address"),
      value: formatBookingDisplayValue(booking.address, notProvided),
    },
    { label: t("booking.payment"), value: paymentType },
    { label: t("booking.paymentStatus"), value: paymentStatus },
    {
      label: t("booking.bookingType"),
      value: formatBookingLabel(booking.booking_type, t("booking.direct")),
    },
    { label: t("booking.category"), value: categoryName },
    { label: t("booking.subcategory"), value: subcategoryName },
    {
      label: t("booking.designPath"),
      value: formatBookingDisplayValue(serviceData?.design_path, notProvided),
    },
  ];
  const customerDetails = [
    {
      label: t("booking.customer"),
      value: formatBookingDisplayValue(booking.user?.name, notProvided),
    },
    {
      label: t("booking.email"),
      value: formatBookingDisplayValue(booking.user?.email, notProvided),
    },
    {
      label: t("booking.phone"),
      value: formatBookingDisplayValue(booking.user?.contact_number, notProvided),
    },
  ];
  const bookingHistory = booking.booking_history ?? [];

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

          <div className="grid grid-cols-1 gap-4 text-neutral-50/70 md:grid-cols-2">
            {bookingDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-50/45">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm text-neutral-50">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-neutral-50">
              {t("booking.customerDetails")}
            </h2>
            <div className="grid grid-cols-1 gap-4 text-neutral-50/70 md:grid-cols-3">
              {customerDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-50/45">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm text-neutral-50">{detail.value}</p>
                </div>
              ))}
            </div>
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

          {bookingHistory.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-neutral-50">
                {t("booking.bookingHistory")}
              </h2>
              <div className="flex flex-col gap-3">
                {bookingHistory.map((history, index) => (
                  <div
                    key={history.id ?? `${history.history_type}-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-sm font-semibold text-neutral-50">
                      {history.history_message ??
                        formatBookingLabel(history.history_type, notProvided)}
                    </p>
                    <p className="mt-1 text-sm text-neutral-50/55">
                      {formatBookingDateTime(
                        history.datetime ?? history.created_at,
                        notProvided,
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <Button
              type="button"
              variant="brandSolid"
              className="h-12 rounded-full px-6 shadow-lg shadow-blue-950/20"
              onClick={() => router.push(`/order/track/${booking.id}`)}
            >
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
              {t("booking.track")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="h-12 rounded-full border border-red-300/25 bg-red-500/15 px-6 text-red-100 hover:bg-red-500/25"
              disabled={cancelBookingMutation.isPending}
              onClick={handleCancel}
            >
              <XCircle className="h-4 w-4" aria-hidden="true" />
              {cancelBookingMutation.isPending
                ? t("booking.canceling")
                : t("booking.cancelBooking")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
