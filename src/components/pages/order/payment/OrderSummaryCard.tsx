import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import type { BookingDraft } from "@/types/bookings";
import { PriceRow } from "./PriceRow";

export function OrderSummaryCard({
  title,
  subtotal,
  extraCharges,
  total,
  draft,
}: {
  title: string;
  subtotal: string;
  extraCharges: string;
  total: string;
  draft?: BookingDraft | null;
}) {
  const paymentSummaryRows = [
    { label: "Sub Total", value: formatCurrency(subtotal) },
    { label: "Extra Charges", value: formatCurrency(extraCharges) },
  ];
  const bookingDetails = draft
    ? [
        { label: "Category", value: draft.selected_category ?? "Not selected" },
        {
          label: "Subcategory",
          value: draft.selected_subcategory?.name ?? "Not selected",
        },
        { label: "Service", value: draft.selected_service.name },
        { label: "Address", value: draft.address || "Missing" },
        { label: "Latitude", value: draft.latitude || "Missing" },
        { label: "Longitude", value: draft.longitude || "Missing" },
      ]
    : [];
  const dynamicDetails = draft?.dynamic_field_responses.slice(0, 4) ?? [];

  return (
    <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
      <CardContent className="p-6 md:px-10 md:py-6 flex flex-col gap-6">
        <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
          Order Summary
        </h2>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 p-4 bg-pink-400/10 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 relative">
              <div className="w-3.5 h-5 left-[8.75px] top-[0.75px] absolute outline-[1.5px] outline-pink-400" />
              <div className="w-4 h-6 left-[0.75px] top-[0.75px] absolute outline-[1.5px] outline-pink-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
              {title}
            </div>
            <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
              A detailed summary of your purchase
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-50/10" />

        {bookingDetails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bookingDetails.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-neutral-50/10 bg-black/10 p-3"
              >
                <div className="text-neutral-50/50 text-xs font-semibold uppercase">
                  {label}
                </div>
                <div className="mt-1 break-words text-neutral-50 text-sm font-semibold">
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {dynamicDetails.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-neutral-50/50 text-xs font-semibold uppercase">
              Submitted details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {dynamicDetails.map((field) => (
                <div
                  key={`${field.field_id ?? field.field_name}-${field.field_name}`}
                  className="flex justify-between gap-3 rounded-lg bg-neutral-900/60 px-3 py-2"
                >
                  <span className="text-neutral-50/60 text-sm">
                    {field.label ?? field.lable ?? field.field_name}
                  </span>
                  <span className="break-words text-right text-neutral-50 text-sm font-semibold">
                    {field.value ?? "Not provided"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-neutral-50/10" />

        <div className="flex flex-col gap-4">
          {paymentSummaryRows.map((row) => (
            <PriceRow key={row.label} {...row} />
          ))}
        </div>

        <div className="border-t border-neutral-50/10" />

        <div className="flex justify-between items-center">
          <span className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
            Total Payable Amount
          </span>
          <span className="text-pink-400 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
            {formatCurrency(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
