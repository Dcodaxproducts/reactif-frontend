import { FiCheckCircle } from "react-icons/fi";

import { OrderInfoText } from "@/components/pages/order/OrderInfoText";
import type { SpecItemData } from "@/types/component-props";

export function SpecItem({ label, value, iconColorClass }: SpecItemData) {
  return (
    <div className="p-3 bg-zinc-900 rounded-lg border border-neutral-50/10 flex gap-2">
      <FiCheckCircle size={16} className={iconColorClass} />
      <OrderInfoText label={label} value={value} variant="detail" />
    </div>
  );
}
