import type { ShipmentStatusData } from "@/types/component-props";

export function StatusCard({ title, value }: ShipmentStatusData) {
  return (
    <div className="bg-[#333] rounded-lg p-5 flex flex-col gap-2">
      <span className="text-white/60 text-sm">{title}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
    </div>
  );
}
