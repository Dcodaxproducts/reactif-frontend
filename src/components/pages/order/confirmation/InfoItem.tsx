import type { OrderInfoItemData } from "@/types/component-props";

export function InfoItem({ title, value }: OrderInfoItemData) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-neutral-50 font-semibold">{title}</span>
      <span className="text-neutral-50/60">{value}</span>
    </div>
  );
}
