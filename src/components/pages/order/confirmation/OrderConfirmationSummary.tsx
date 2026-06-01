"use client";

import { useSearchParams } from "next/navigation";
import { InfoItem } from "./InfoItem";
import { TotalItem } from "./TotalItem";

export function OrderConfirmationSummary() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") ?? "pending";
  const orderConfirmationInfo = [
    { title: "Booking Number", value: String(bookingId) },
    { title: "Order Date", value: new Date().toLocaleDateString() },
    { title: "Payment Method", value: "Confirmed payment" },
  ];
  const orderConfirmationTotals = [
    { label: "Subtotal", value: "Recorded on booking" },
    { label: "Extra Charges", value: "Recorded on booking" },
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

      <InfoItem title="Shipping Address" value="Saved with booking details" />

      <div className="w-full md:max-w-sm ml-auto flex flex-col gap-4">
        {orderConfirmationTotals.map((item) => (
          <TotalItem key={item.label} {...item} />
        ))}

        <div className="border-t border-neutral-50/10 pt-4 flex justify-between font-semibold text-neutral-50">
          <span>Total</span>
          <span>Recorded on booking</span>
        </div>
      </div>
    </div>
  );
}
