import { OrderInfoText } from "@/components/pages/order/OrderInfoText";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { getBookingStatusTranslationKey } from "@/lib/booking-status";
import type { OrderInfoBoxProps } from "@/types/component-props";

export function OrderInfoBox({
  scheduledDate,
  status,
  trackingNumber,
}: OrderInfoBoxProps) {
  const { t } = useAppTranslation();

  return (
    <div className="w-full bg-neutral-800 border border-neutral-50/10 rounded-lg px-4 py-4 flex flex-col md:flex-row gap-6 md:gap-16">
      <OrderInfoText
        label={t("booking.scheduled")}
        value={scheduledDate}
        wrapperClassName="flex flex-col gap-1"
      />

      {trackingNumber && (
        <OrderInfoText
          label={t("order.trackingNumberLabel")}
          value={trackingNumber}
          wrapperClassName="flex flex-col gap-1"
        />
      )}

      <OrderInfoText
        label={t("order.status")}
        value={t(getBookingStatusTranslationKey(status))}
        wrapperClassName="flex flex-col gap-1"
      />
    </div>
  );
}
