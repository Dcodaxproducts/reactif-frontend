import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  onChange,
}: FormFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div className="flex-1 flex flex-col gap-2">
      <Label htmlFor={inputId} className={CONTACT_LABEL_CLASS}>
        {label}
      </Label>
      <Input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-white/10 px-4 text-white outline-none focus:border-blue-500 transition"
      />
      {error ? (
        <p id={errorId} className="text-xs font-medium text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
