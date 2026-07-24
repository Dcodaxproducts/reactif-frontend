import type { OrderPaymentMethodData } from "@/types/component-props";

export function PaymentTab({ label, active }: OrderPaymentMethodData) {
  return (
    <div
      className={`flex h-11 items-center justify-center rounded-lg px-4 text-lg font-semibold transition font-hk ${
        active
          ? "bg-pink-400 text-neutral-50"
          : "bg-neutral-800 border border-neutral-50/10 text-neutral-50"
      }`}
    >
      {label}
    </div>
  );
}
