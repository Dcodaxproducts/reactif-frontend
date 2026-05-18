import type { OrderPriceRowData } from "@/types/component-props";

export function PriceRow({ label, value }: OrderPriceRowData) {
  return (
    <div className="flex justify-between items-center text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
