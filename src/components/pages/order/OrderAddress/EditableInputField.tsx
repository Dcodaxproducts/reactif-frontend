import { Input } from "@/components/ui/input";
import type { EditableInputFieldProps } from "@/types/component-props";

export function EditableInputField({
  label,
  defaultValue,
  fullWidth,
  name,
  value,
  placeholder,
  readOnly,
  onChange,
}: EditableInputFieldProps) {
  const inputName = name ?? label;

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
      <label className="font-hk text-lg font-semibold text-neutral-50 md:text-base">
        {label}
      </label>

      <Input
        name={inputName}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        placeholder={placeholder ?? label}
        readOnly={readOnly}
        onChange={({ target }) => onChange?.(inputName, target.value)}
        className="h-10 rounded-lg border border-neutral-50/10 bg-neutral-800 font-hk text-base font-medium text-neutral-50 focus-visible:border-blue-500 focus-visible:ring-0 md:text-lg"
      />
    </div>
  );
}
