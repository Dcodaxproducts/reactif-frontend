import type { OrderInfoBoxProps } from "@/types/component-props";
import { formatStatusLabel } from "./order-management-utils";

export function OrderInfoBox({
  scheduledDate,
  status,
  trackingNumber,
}: OrderInfoBoxProps) {
  return (
    <div className="w-full bg-neutral-800 border border-neutral-50/10 rounded-lg px-4 py-4 flex flex-col md:flex-row gap-6 md:gap-16">
      <div className="flex flex-col gap-1">
        <span className="text-neutral-50 text-sm font-semibold font-hk">
          Scheduled Date
        </span>
        <span className="text-neutral-50/60 text-sm font-medium font-hk">
          {scheduledDate}
        </span>
      </div>

      {trackingNumber && (
        <div className="flex flex-col gap-1">
          <span className="text-neutral-50 text-sm font-semibold font-hk">
            Tracking Number
          </span>
          <span className="text-neutral-50/60 text-sm font-medium font-hk">
            {trackingNumber}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <span className="text-neutral-50 text-sm font-semibold font-hk">
          Status
        </span>
        <span className="text-neutral-50/60 text-sm font-medium font-hk">
          {formatStatusLabel(status)}
        </span>
      </div>
    </div>
  );
}
