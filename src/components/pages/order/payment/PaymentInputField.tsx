import { Input } from "@/components/ui/input";
import type { PaymentInputFieldProps } from "@/types/component-props";

export function PaymentInputField({
  label,
  placeholder,
}: PaymentInputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold text-neutral-50 font-hk">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        className="h-11 px-3 bg-neutral-800 rounded-lg border border-neutral-50/10 text-neutral-50 placeholder:text-neutral-50/60 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-400"
      />
    </div>
  );
}
