import { OrderInfoText } from "@/components/pages/order/OrderInfoText";
import type { DetailPair } from "@/types/component-props";

export function DetailRow({ left, right }: DetailPair) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
      <OrderInfoText label={left.label} value={left.value} variant="detail" />
      <OrderInfoText label={right.label} value={right.value} variant="detail" />
    </div>
  );
}
