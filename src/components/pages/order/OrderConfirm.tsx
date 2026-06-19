"use client";

import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookingDetail } from "@/hooks/useBookings";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import { parseBookingData } from "./management/order-management-utils";
import { OrderConfirmationActions } from "./confirmation/OrderConfirmationActions";
import { OrderConfirmationSummary } from "./confirmation/OrderConfirmationSummary";

function OrderConfirmContent() {
  const { t } = useAppTranslation();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { booking, loading, error } = useBookingDetail(bookingId);
  const { serviceData, fieldResponses } = booking
    ? parseBookingData(booking)
    : { serviceData: null, fieldResponses: [] };
  const serviceName =
    serviceData?.service_name ?? booking?.service?.name ?? t("order.selectedService");
  const statusLabel = booking
    ? t(getBookingStatusTranslationKey(booking.status))
    : t("order.pendingConfirmation");

  return (
    <section
      data-print-page="true"
      className="w-full flex justify-center px-4 py-10"
    >
      <div
        id="booking-receipt"
        data-print-receipt="true"
        className="w-full max-w-5xl p-6 sm:p-8 md:p-10 bg-neutral-800/80 rounded-3xl border border-neutral-50/10 flex flex-col gap-10"
      >
        <div
          data-print-receipt-header="true"
          className="text-center flex flex-col items-center gap-4"
        >
          <div className="p-4 bg-green-600/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-neutral-50 font-hk">
            {t("order.confirmationTitle")}
          </h1>

          <p className="max-w-2xl text-neutral-50/60 text-sm sm:text-base md:text-xl font-medium font-hk">
            {booking
              ? t("order.confirmationDescription", {
                  bookingId: booking.id,
                  serviceName,
                  status: statusLabel.toLowerCase(),
                })
              : t("order.confirmationLoadingDescription")}
          </p>
        </div>

        <OrderConfirmationSummary
          booking={booking}
          fieldResponses={fieldResponses}
          loading={loading}
          error={error}
          serviceName={serviceName}
        />
        <OrderConfirmationActions bookingId={booking?.id ?? bookingId} />
      </div>
    </section>
  );
}

export function OrderConfirm() {
  return (
    <Suspense fallback={<p className="text-neutral-50/60 p-8">Loading...</p>}>
      <OrderConfirmContent />
    </Suspense>
  );
}
