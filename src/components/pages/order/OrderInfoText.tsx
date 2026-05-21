import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const ORDER_INFO_PRIMARY_TEXT_CLASS =
  "text-neutral-50 text-sm font-semibold font-hk";
export const ORDER_INFO_SECONDARY_TEXT_CLASS =
  "text-neutral-50/60 text-sm font-medium font-hk";
export const ORDER_INFO_LABEL_TEXT_CLASS =
  "text-neutral-50/60 text-xs font-medium font-hk";

type OrderInfoTextProps = {
  label: ReactNode;
  value: ReactNode;
  variant?: "management" | "detail";
  wrapperClassName?: string;
};

export function OrderInfoText({
  label,
  value,
  variant = "management",
  wrapperClassName,
}: OrderInfoTextProps) {
  const labelClassName =
    variant === "detail"
      ? ORDER_INFO_LABEL_TEXT_CLASS
      : ORDER_INFO_PRIMARY_TEXT_CLASS;
  const valueClassName =
    variant === "detail"
      ? ORDER_INFO_PRIMARY_TEXT_CLASS
      : ORDER_INFO_SECONDARY_TEXT_CLASS;

  return (
    <div className={cn(wrapperClassName)}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
