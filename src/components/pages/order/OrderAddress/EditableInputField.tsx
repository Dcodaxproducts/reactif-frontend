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
      <label className="text-neutral-50 text-lg md:text-md font-semibold font-['HK_Grotesk']">
        {label}
      </label>

      <Input
        name={inputName}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        placeholder={placeholder ?? label}
        readOnly={readOnly}
        onChange={({ target }) => onChange?.(inputName, target.value)}
        className="h-10 bg-neutral-800 rounded-lg border border-neutral-50/10 text-neutral-50 text-base md:text-lg font-medium font-['HK_Grotesk'] focus-visible:ring-0 focus-visible:border-blue-500"
      />
    </div>
  );
}
