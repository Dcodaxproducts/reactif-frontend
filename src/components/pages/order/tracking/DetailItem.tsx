import type { TrackingDetailData } from "@/types/component-props";

export function DetailItem({ title, value }: TrackingDetailData) {
  return (
    <div className="border-t border-gray-600 pt-4 flex flex-col gap-1">
      <span className="text-white text-sm font-semibold">{title}</span>
      <span className="text-white/60 text-sm">{value}</span>
    </div>
  );
}
