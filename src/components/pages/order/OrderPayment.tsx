"use client";

import { useEffect, useState } from "react";

import { OrderSummaryCard } from "./payment/OrderSummaryCard";
import { PaymentDetailsCard } from "./payment/PaymentDetailsCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { readBookingDraft } from "@/lib/booking-draft";
import type { BookingDraft } from "@/types/bookings";

export function OrderPayment() {
  const { t } = useAppTranslation();
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    setDraft(readBookingDraft());
  }, []);

  const title = draft
    ? t("order.bookingFor", { serviceName: draft.selected_service.name })
    : t("order.bookingPayment");
  const subtotal = draft?.subtotal ?? "0";
  const extraCharges = draft?.extra_charges_amount ?? "0";
  const total = draft?.total_amount ?? "0";

  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-neutral-50 text-3xl md:text-4xl font-semibold font-['HK_Grotesk']">
            {t("order.paymentTitle")}
          </h1>
          <p className="text-neutral-50/60 text-lg md:text-xl font-medium font-['HK_Grotesk']">
            {t("order.paymentSubtitle")}
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
