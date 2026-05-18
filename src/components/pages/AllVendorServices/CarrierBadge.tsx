import { BadgeCheck } from "lucide-react";
import type { CarrierBadgeProps } from "@/types/component-props";

export default function CarrierBadge({ carrier }: CarrierBadgeProps) {
  return (
    <div className="px-4 md:px-5 py-2 rounded-full border border-stone-500/50 flex items-center gap-2 text-white text-sm md:text-base font-semibold hover:border-indigo-400 transition">
      <BadgeCheck size={16} className="text-indigo-400" />
      {carrier}
    </div>
  );
}
