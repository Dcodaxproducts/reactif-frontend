"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePaymentHistory } from "@/hooks/usePayments";

export default function PaymentHistory() {
  const { payments, loading, error } = usePaymentHistory();

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
            Payment History
          </h1>
          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && payments.length === 0 && (
            <p className="text-neutral-50/60">No payments found.</p>
          )}
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-neutral-50/10 pt-4 text-neutral-50/70"
            >
              <span>Booking #{payment.booking_id}</span>
              <span>${payment.amount}</span>
              <span>{payment.payment_status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
