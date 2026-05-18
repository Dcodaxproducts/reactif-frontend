import type { OrderPaymentMethodData } from "@/types/component-props";

export function PaymentTab({ label, active }: OrderPaymentMethodData) {
  return (
    <div
      className={`h-11 px-4 rounded-lg flex items-center justify-center text-lg font-semibold font-['HK_Grotesk'] transition ${
        active
          ? "bg-pink-400 text-neutral-50"
          : "bg-neutral-800 border border-neutral-50/10 text-neutral-50"
      }`}
    >
      {label}
    </div>
  );
}
