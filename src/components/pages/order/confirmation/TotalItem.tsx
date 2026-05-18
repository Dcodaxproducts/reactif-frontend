import type { OrderPriceRowData } from "@/types/component-props";

export function TotalItem({ label, value }: OrderPriceRowData) {
  return (
    <div className="flex justify-between text-neutral-50/60">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
