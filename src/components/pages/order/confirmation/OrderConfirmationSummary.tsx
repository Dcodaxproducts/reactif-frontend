import { StatusCard } from "@/components/common/StatusCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import { formatCurrency } from "@/lib/currency";
import type { Booking, BookingFieldResponse } from "@/types/bookings";
import { InfoItem } from "./InfoItem";
import { TotalItem } from "./TotalItem";

const getFieldLabel = (field: BookingFieldResponse) =>
  field.label ?? field.lable ?? field.field_name.replaceAll("_", " ");

export function OrderConfirmationSummary({
  booking,
  fieldResponses,
  loading,
  error,
  serviceName,
}: {
  booking: Booking | null;
  fieldResponses: BookingFieldResponse[];
  loading: boolean;
  error: string | null;
  serviceName: string;
}) {
  const { t } = useAppTranslation();

  if (loading) {
    return (
      <StatusCard tone="loading" title={t("order.loadingReceipt")} />
    );
  }

  if (error || !booking) {
    return (
      <StatusCard
        tone="error"
        label={t("common.backendError")}
        title={t("order.receiptUnavailable")}
        description={error ?? undefined}
      />
    );
  }

  const orderConfirmationInfo = [
    { title: t("order.bookingNumber"), value: `#${booking.id}` },
    {
      title: t("order.orderDate"),
      value: new Date(booking.created_at).toLocaleDateString(),
    },
    { title: t("order.status"), value: t(getBookingStatusTranslationKey(booking.status)) },
    { title: t("order.service"), value: serviceName },
    { title: t("order.paymentMethod"), value: booking.payment_type ?? t("order.paymentRecorded") },
    { title: t("booking.bookingType"), value: booking.booking_type ?? t("order.serviceBooking") },
  ];
  const orderConfirmationTotals = [
    {
      label: t("booking.subtotal"),
      value: formatCurrency(booking.subtotal ?? booking.total_amount),
    },
    {
      label: t("order.extraCharges"),
      value: formatCurrency(booking.extra_charges_amount ?? 0),
    },
  ];

  return (
    <div
      data-print-receipt-summary="true"
      className="w-full p-6 sm:p-8 md:p-10 bg-neutral-800 rounded-3xl border border-neutral-50/10 flex flex-col gap-8"
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-50 font-hk">
        {t("order.summaryTitle")}
      </h2>

      <div
        data-print-receipt-grid="true"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {orderConfirmationInfo.map((item) => (
          <InfoItem key={item.title} {...item} />
        ))}
      </div>

      <div
        data-print-receipt-grid="true"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <InfoItem title={t("order.serviceAddress")} value={booking.address || t("booking.notProvided")} />
        <InfoItem title={t("order.latitude")} value={String(booking.latitude ?? t("booking.notProvided"))} />
        <InfoItem title={t("order.longitude")} value={String(booking.longitude ?? t("booking.notProvided"))} />
      </div>

      {fieldResponses.length > 0 && (
        <div data-print-receipt-details="true" className="flex flex-col gap-3">
          <h3 className="text-neutral-50 text-base sm:text-lg font-semibold font-hk">
            {t("order.submittedDetails")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fieldResponses.map((field) => (
              <div
                key={`${field.field_id ?? field.field_name}-${field.field_name}`}
                className="rounded-xl border border-neutral-50/10 bg-neutral-900/60 p-4"
              >
                <p className="text-neutral-50/50 text-xs font-semibold uppercase">
                  {getFieldLabel(field)}
                </p>
                <p className="mt-1 break-words text-neutral-50 text-sm font-semibold">
                  {field.value ?? t("booking.notProvided")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        data-print-receipt-totals="true"
        className="w-full md:max-w-sm ml-auto flex flex-col gap-4"
      >
        {orderConfirmationTotals.map((item) => (
          <TotalItem key={item.label} {...item} />
        ))}

        <div className="border-t border-neutral-50/10 pt-4 flex justify-between font-semibold text-neutral-50">
          <span>{t("booking.total")}</span>
          <span>{formatCurrency(booking.total_amount)}</span>
        </div>
      </div>
    </div>
  );
}
