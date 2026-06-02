"use client";

import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useBookingDetail } from "@/hooks/useBookings";
import { formatBookingStatusLabel } from "@/lib/booking-status";
import { parseBookingData } from "./management/order-management-utils";
import { OrderConfirmationActions } from "./confirmation/OrderConfirmationActions";
import { OrderConfirmationSummary } from "./confirmation/OrderConfirmationSummary";

function OrderConfirmContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { booking, loading, error } = useBookingDetail(bookingId);
  const { serviceData, fieldResponses } = booking
    ? parseBookingData(booking)
    : { serviceData: null, fieldResponses: [] };
  const serviceName =
    serviceData?.service_name ?? booking?.service?.name ?? "your selected service";
  const statusLabel = booking
    ? formatBookingStatusLabel(booking.status)
    : "Pending confirmation";

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div
        id="booking-receipt"
        className="w-full max-w-5xl p-6 sm:p-8 md:p-10 bg-neutral-800/80 rounded-3xl border border-neutral-50/10 flex flex-col gap-10"
      >
        <div className="text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-green-600/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-neutral-50 font-hk">
            Thank You! Your Order is Confirmed
          </h1>

          <p className="max-w-2xl text-neutral-50/60 text-sm sm:text-base md:text-xl font-medium font-hk">
            {booking
              ? `Booking #${booking.id} for ${serviceName} is ${statusLabel.toLowerCase()}.`
              : "We are loading the latest booking details for your receipt."}
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
