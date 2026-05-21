import { OrderInfoText } from "@/components/pages/order/OrderInfoText";
import type { OrderInfoBoxProps } from "@/types/component-props";
import { formatStatusLabel } from "./order-management-utils";

export function OrderInfoBox({
  scheduledDate,
  status,
  trackingNumber,
}: OrderInfoBoxProps) {
  return (
    <div className="w-full bg-neutral-800 border border-neutral-50/10 rounded-lg px-4 py-4 flex flex-col md:flex-row gap-6 md:gap-16">
      <OrderInfoText
        label="Scheduled Date"
        value={scheduledDate}
        wrapperClassName="flex flex-col gap-1"
      />

      {trackingNumber && (
        <OrderInfoText
          label="Tracking Number"
          value={trackingNumber}
          wrapperClassName="flex flex-col gap-1"
        />
      )}

      <OrderInfoText
        label="Status"
        value={formatStatusLabel(status)}
        wrapperClassName="flex flex-col gap-1"
      />
    </div>
  );
}
