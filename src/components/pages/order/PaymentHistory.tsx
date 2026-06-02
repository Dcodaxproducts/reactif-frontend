"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { usePaymentHistory } from "@/hooks/usePayments";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { PaymentHistoryItem } from "@/types/payments";

const statusClassNames: Record<string, string> = {
  confirmed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  paid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  failed: "border-red-400/30 bg-red-400/10 text-red-300",
  cancelled: "border-red-400/30 bg-red-400/10 text-red-300",
};

const columns = ["Booking", "Amount", "Method", "Transaction", "Date", "Status"];

const formatStatusLabel = (status: string) =>
  status
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Unknown";

const getPaymentAmount = (payment: PaymentHistoryItem) =>
  payment.total_amount ?? payment.amount ?? 0;

const getPaymentDate = (payment: PaymentHistoryItem) => {
  const rawDate = payment.datetime || payment.created_at;

  if (!rawDate) return "Not recorded";

  const date = new Date(rawDate);
  return Number.isNaN(date.getTime()) ? "Not recorded" : date.toLocaleDateString();
};

const getPaymentReference = (payment: PaymentHistoryItem) =>
  payment.txn_id || payment.transaction_id || "No transaction reference";

const getStatusClassName = (status: string) =>
  statusClassNames[status.toLowerCase()] ??
  "border-neutral-50/20 bg-neutral-50/10 text-neutral-50/70";

function PaymentStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", getStatusClassName(status))}
    >
      {formatStatusLabel(status)}
    </Badge>
  );
}

function PaymentHistoryMobileCard({ payment }: { payment: PaymentHistoryItem }) {
  const status = payment.payment_status || "unknown";

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-neutral-50/10 bg-neutral-900/50 p-4 md:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-neutral-50/50 text-xs font-semibold uppercase">
            Booking
          </p>
          <p className="mt-1 text-neutral-50 text-base font-semibold">
            #{payment.booking_id}
          </p>
        </div>
        <PaymentStatusBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PaymentMeta label="Amount" value={formatCurrency(getPaymentAmount(payment))} />
        <PaymentMeta
          label="Method"
          value={formatStatusLabel(payment.payment_type || "Not recorded")}
        />
        <PaymentMeta
          label="Transaction"
          value={getPaymentReference(payment)}
        />
        <PaymentMeta label="Date" value={getPaymentDate(payment)} />
      </div>
    </article>
  );
}

function PaymentMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-neutral-50/50 text-xs font-semibold uppercase">{label}</p>
      <p className="mt-1 break-words text-neutral-50 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

export function PaymentHistory() {
  const { payments, loading, error } = usePaymentHistory();

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              Payment History
            </h1>
            <p className="text-neutral-50/60">
              Review booking payments, transaction references, and payment status.
            </p>
          </div>

          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && payments.length === 0 && (
            <p className="text-neutral-50/60">No payments found.</p>
          )}

          {payments.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="hidden md:grid grid-cols-[1.1fr_1fr_1fr_1.4fr_1fr_1fr] gap-4 rounded-xl border border-neutral-50/10 bg-neutral-900/70 px-4 py-3">
                {columns.map((column) => (
                  <span
                    key={column}
                    className="text-neutral-50/50 text-xs font-semibold uppercase"
                  >
                    {column}
                  </span>
                ))}
              </div>

              {payments.map((payment) => {
                const status = payment.payment_status || "unknown";

                return (
                  <div key={payment.id}>
                    <PaymentHistoryMobileCard payment={payment} />
                    <div className="hidden md:grid grid-cols-[1.1fr_1fr_1fr_1.4fr_1fr_1fr] gap-4 items-center rounded-xl border border-neutral-50/10 bg-neutral-900/40 px-4 py-4 text-neutral-50/70">
                      <span className="text-neutral-50 font-semibold">
                        Booking #{payment.booking_id}
                      </span>
                      <span className="font-semibold text-neutral-50">
                        {formatCurrency(getPaymentAmount(payment))}
                      </span>
                      <span className="capitalize">
                        {formatStatusLabel(payment.payment_type || "Not recorded")}
                      </span>
                      <span className="break-words">
                        {getPaymentReference(payment)}
                      </span>
                      <span>{getPaymentDate(payment)}</span>
                      <PaymentStatusBadge status={status} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
