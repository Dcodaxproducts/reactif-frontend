import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
}: FormFieldProps) {
  const inputId = useId();

  return (
    <div className="flex-1 flex flex-col gap-2">
      <Label htmlFor={inputId} className="text-[#F5F5F580] text-xs md:text-sm font-medium">
        {label}
      </Label>
      <Input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-white/10 px-4 text-white outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}
