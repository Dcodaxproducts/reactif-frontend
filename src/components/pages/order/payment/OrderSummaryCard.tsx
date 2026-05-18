import { Card, CardContent } from "@/components/ui/card";
import { paymentSummaryRows } from "@/data/order";
import { PriceRow } from "./PriceRow";

export function OrderSummaryCard() {
  return (
    <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
      <CardContent className="p-6 md:px-10 md:py-6 flex flex-col gap-6">
        <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
          Order Summary
        </h2>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 p-4 bg-pink-400/10 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 relative">
              <div className="w-3.5 h-5 left-[8.75px] top-[0.75px] absolute outline outline-[1.5px] outline-pink-400" />
              <div className="w-4 h-6 left-[0.75px] top-[0.75px] absolute outline outline-[1.5px] outline-pink-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
              Quotation #12345
            </div>
            <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
              A detailed summary of your purchase
            </div>
          </div>
        </div>

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
            $1250.00
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
