import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  FieldChangeHandler,
  Service,
  ServiceFormErrors,
  ServiceFormValues,
} from "@/types/component-props";

const commonInputClasses =
  "w-full px-4 py-3 rounded-xl outline outline-1 outline-slate-700 text-sm text-neutral-50 bg-black/20 focus:outline-[#F262B5] focus:ring-1 focus:ring-[#F262B5] transition";

export function DynamicServiceFields({
  service,
  formValues,
  formErrors,
  onChange,
}: {
  service: Service;
  formValues: ServiceFormValues;
  formErrors: ServiceFormErrors;
  onChange: FieldChangeHandler;
}) {
  if (!service.fields?.length) return null;

  return (
    <div className="w-full flex flex-col gap-5 mt-2">
      {service.fields.map((field) => {
        const value = formValues[field.field_name] || "";

        return (
          <div key={field.id} className="flex flex-col gap-2">
            <Label className="text-sm text-neutral-300 font-medium">
              {field.label}
              {field.is_required && (
                <span className="text-[#F262B5] ml-1">*</span>
              )}
            </Label>

            {renderField({ field, value, onChange })}

            {formErrors[field.field_name] && (
              <p className="text-xs text-red-400">
                {formErrors[field.field_name]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderField({
  field,
  value,
  onChange,
}: {
  field: Service["fields"][number];
  value: unknown;
  onChange: FieldChangeHandler;
}) {
  const stringValue = typeof value === "string" ? value : "";

  switch (field.input_type) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "date":
      return (
        <Input
          type={field.input_type}
          placeholder={field.placeholder}
          required={field.is_required}
          value={stringValue}
          onChange={(event) => onChange(field.field_name, event.target.value)}
          className={commonInputClasses}
        />
      );

    case "color":
      return (
        <div className="flex items-center gap-3">
          <Input
            type="color"
            required={field.is_required}
            value={stringValue || "#000000"}
            onChange={(event) => onChange(field.field_name, event.target.value)}
            className="w-14 h-10 p-1 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
          />
          <span className="text-sm text-neutral-400">
            {stringValue || "#000000"}
          </span>
        </div>
      );

    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder}
          required={field.is_required}
          value={stringValue}
          rows={4}
          onChange={(event) => onChange(field.field_name, event.target.value)}
          className={`${commonInputClasses} resize-none`}
        />
      );

    case "file":
      return (
        <Input
          type="file"
          required={field.is_required}
          onChange={(event) =>
            onChange(field.field_name, event.target.files?.[0] || null)
          }
          className={`${commonInputClasses} file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-[#F262B5]/20 file:text-[#F262B5]`}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={(nextValue) => onChange(field.field_name, nextValue)}
          value={stringValue}
        >
          <SelectTrigger className="w-full h-12 rounded-xl text-sm text-neutral-50 bg-black/20 border border-slate-700 focus:border-[#F262B5] focus:ring-1 focus:ring-[#F262B5]">
            <SelectValue placeholder={field.placeholder || "Select"} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          className="flex flex-col gap-3 mt-1"
          value={stringValue}
          onValueChange={(nextValue) => onChange(field.field_name, nextValue)}
        >
          {field.options?.map((option) => (
            <Label
              key={option.key}
              className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
            >
              <RadioGroupItem value={option.key} className="size-4" />
              {option.display}
            </Label>
          ))}
        </RadioGroup>
      );

    case "checkbox":
      return (
        <div className="flex flex-col gap-3 mt-1">
          {field.options?.map((option) => {
            const checkedValues = Array.isArray(value)
              ? (value as string[])
              : [];
            return (
              <Label
                key={option.key}
                className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
              >
                <Checkbox
                  value={option.key}
                  checked={checkedValues.includes(option.key)}
                  onCheckedChange={(checked) => {
                    const nextValues = checked
                      ? [...checkedValues, option.key]
                      : checkedValues.filter((item) => item !== option.key);
                    onChange(field.field_name, nextValues);
                  }}
                />
                {option.display}
              </Label>
            );
          })}
        </div>
      );

    default:
      return (
        <Input
          type="text"
          placeholder={field.placeholder}
          value={stringValue}
          onChange={(event) => onChange(field.field_name, event.target.value)}
          className={commonInputClasses}
        />
      );
  }
}
