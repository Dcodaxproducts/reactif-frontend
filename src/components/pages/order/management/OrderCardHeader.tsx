import { ShoppingCart } from "lucide-react";
import type { OrderCardMetaProps } from "@/types/component-props";
import { formatStatusLabel } from "./order-management-utils";

export function OrderCardHeader({
  title,
  subtitle,
  amount,
  status,
}: OrderCardMetaProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 p-2 bg-indigo-600/20 rounded-lg flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-blue-600 rounded-sm" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-neutral-50 text-lg sm:text-xl font-semibold font-hk">
            {title}
          </h3>
          <p className="text-neutral-50/60 text-sm font-medium font-hk">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="text-neutral-50 text-base font-semibold font-hk">
          ${amount}
        </div>

        <div className="px-3 py-1 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-neutral-50 text-xs font-medium font-hk">
            {formatStatusLabel(status)}
          </span>
        </div>
      </div>
    </div>
  );
}
