"use client";

import { useEffect, useState } from "react";

import { OrderSummaryCard } from "./payment/OrderSummaryCard";
import { PaymentDetailsCard } from "./payment/PaymentDetailsCard";
import { readBookingDraft } from "@/lib/booking-draft";
import type { BookingDraft } from "@/types/bookings";

export function OrderPayment() {
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    setDraft(readBookingDraft());
  }, []);

  const title = draft
    ? `Booking for ${draft.selected_service.name}`
    : "Booking payment";
  const subtotal = draft?.subtotal ?? "0";
  const extraCharges = draft?.extra_charges_amount ?? "0";
  const total = draft?.total_amount ?? "0";

  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-neutral-50 text-3xl md:text-4xl font-semibold font-['HK_Grotesk']">
            Complete Your Payment
          </h1>
          <p className="text-neutral-50/60 text-lg md:text-xl font-medium font-['HK_Grotesk']">
            Get help from our support team
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <OrderSummaryCard
            title={title}
            subtotal={subtotal}
            extraCharges={extraCharges}
            total={total}
            draft={draft}
          />
          <PaymentDetailsCard />
        </div>
      </div>
    </section>
  );
}
