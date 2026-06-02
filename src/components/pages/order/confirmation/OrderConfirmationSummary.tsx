import { formatBookingStatusLabel } from "@/lib/booking-status";
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
  if (loading) {
    return (
      <div className="w-full p-6 sm:p-8 md:p-10 bg-neutral-800 rounded-3xl border border-neutral-50/10">
        <p className="text-neutral-50/60">Loading receipt details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="w-full p-6 sm:p-8 md:p-10 bg-neutral-800 rounded-3xl border border-neutral-50/10">
        <p className="text-neutral-50/60">
          Receipt details are unavailable. Please check your order management page.
        </p>
      </div>
    );
  }

  const orderConfirmationInfo = [
    { title: "Booking Number", value: `#${booking.id}` },
    {
      title: "Order Date",
      value: new Date(booking.created_at).toLocaleDateString(),
    },
    { title: "Status", value: formatBookingStatusLabel(booking.status) },
    { title: "Service", value: serviceName },
    { title: "Payment Method", value: booking.payment_type ?? "Payment recorded" },
    { title: "Booking Type", value: booking.booking_type ?? "Service booking" },
  ];
  const orderConfirmationTotals = [
    {
      label: "Subtotal",
      value: formatCurrency(booking.subtotal ?? booking.total_amount),
    },
    {
      label: "Extra Charges",
      value: formatCurrency(booking.extra_charges_amount ?? 0),
    },
  ];

  return (
    <div className="w-full p-6 sm:p-8 md:p-10 bg-neutral-800 rounded-3xl border border-neutral-50/10 flex flex-col gap-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-50 font-hk">
        Order Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orderConfirmationInfo.map((item) => (
          <InfoItem key={item.title} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoItem title="Service Address" value={booking.address || "Not provided"} />
        <InfoItem title="Latitude" value={String(booking.latitude ?? "Not provided")} />
        <InfoItem title="Longitude" value={String(booking.longitude ?? "Not provided")} />
      </div>

      {fieldResponses.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-neutral-50 text-base sm:text-lg font-semibold font-hk">
            Submitted Details
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
                  {field.value ?? "Not provided"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full md:max-w-sm ml-auto flex flex-col gap-4">
        {orderConfirmationTotals.map((item) => (
          <TotalItem key={item.label} {...item} />
        ))}

        <div className="border-t border-neutral-50/10 pt-4 flex justify-between font-semibold text-neutral-50">
          <span>Total</span>
          <span>{formatCurrency(booking.total_amount)}</span>
        </div>
      </div>
    </div>
  );
}
