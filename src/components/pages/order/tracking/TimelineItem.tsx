import { CheckCircle, Store, Truck } from "lucide-react";
import type { TrackingTimelineItemData } from "@/types/component-props";

const icons = {
  store: Store,
  truck: Truck,
  check: CheckCircle,
};

export function TimelineItem({
  icon,
  title,
  date,
  last,
}: TrackingTimelineItemData) {
  const Icon = icons[icon];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 flex items-center justify-center text-white">
          <Icon className="w-5 h-5" />
        </div>

        {!last && <div className="w-[1.6px] flex-1 bg-gray-400 mt-1" />}
      </div>

      <div>
        <div className="text-white font-[600] text-md">{title}</div>
        <div className="text-white/60 text-sm">{date}</div>
      </div>
    </div>
  );
}
