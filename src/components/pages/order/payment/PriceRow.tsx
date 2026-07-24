import type { OrderPriceRowData } from "@/types/component-props";

export function PriceRow({ label, value }: OrderPriceRowData) {
  return (
    <div className="flex items-center justify-between text-lg font-medium text-neutral-50/60 font-hk">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
