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
  ServiceFormValue,
  ServiceFormValues,
} from "@/types/component-props";

const commonInputClasses =
  "rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-sm text-neutral-50 focus-visible:border-[#F262B5] focus-visible:ring-[#F262B5]/30";

type ServiceFieldRenderProps = Pick<
  Service["fields"][number],
  "id" | "input_type" | "field_name" | "is_required" | "placeholder" | "options"
>;

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
  const { fields } = service;

  if (!fields.length) return null;

  return (
    <div className="w-full flex flex-col gap-5 mt-2">
      {fields.map((field) => {
        const {
          id,
          label,
          input_type,
          field_name,
          is_required,
          placeholder,
          options,
        } = field;
        const value = formValues[field_name] ?? "";
        const error = formErrors[field_name];

        return (
          <div key={id} className="flex flex-col gap-2">
            <Label
              htmlFor={`service-field-${id}`}
              className="text-sm text-neutral-300 font-medium"
            >
              {label}
              {is_required && <span className="text-[#F262B5] ml-1">*</span>}
            </Label>

            {renderField({
              field: {
                id,
                input_type,
                field_name,
                is_required,
                placeholder,
                options,
              },
              value,
              onChange,
            })}

            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        );
      })}
    </div>
  );
}

function renderField({
  field: { id, input_type, field_name, is_required, placeholder, options },
  value,
  onChange,
}: {
  field: ServiceFieldRenderProps;
  value: ServiceFormValue;
  onChange: FieldChangeHandler;
}) {
  const stringValue = typeof value === "string" ? value : "";

  switch (input_type) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "date":
      return (
        <Input
          id={`service-field-${id}`}
          type={input_type}
          placeholder={placeholder}
          required={is_required}
          value={stringValue}
          onChange={({ target: { value: nextValue } }) =>
            onChange(field_name, nextValue)
          }
          className={commonInputClasses}
        />
      );

    case "color":
      const colorValue = stringValue === "" ? "#000000" : stringValue;

      return (
        <div className="flex items-center gap-3">
          <Input
            id={`service-field-${id}`}
            type="color"
            required={is_required}
            value={colorValue}
            onChange={({ target }) => onChange(field_name, target.value)}
            className="w-14 h-10 p-1 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
          />
          <span className="text-sm text-neutral-400">{colorValue}</span>
        </div>
      );

    case "textarea":
      return (
        <Textarea
          id={`service-field-${id}`}
          placeholder={placeholder}
          required={is_required}
          value={stringValue}
          rows={4}
          onChange={({ target: { value: nextValue } }) =>
            onChange(field_name, nextValue)
          }
          className={`${commonInputClasses} resize-none`}
        />
      );

    case "file":
      return (
        <Input
          id={`service-field-${id}`}
          type="file"
          required={is_required}
          onChange={({ target }) => onChange(field_name, target.files?.[0] ?? null)}
          className={`${commonInputClasses} file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-[#F262B5]/20 file:text-[#F262B5]`}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={(nextValue) => onChange(field_name, nextValue)}
          value={stringValue}
        >
          <SelectTrigger
            id={`service-field-${id}`}
            className="w-full h-12 rounded-xl text-sm text-neutral-50 bg-black/20 border border-slate-700 focus:border-[#F262B5] focus:ring-1 focus:ring-[#F262B5]/30"
          >
            <SelectValue placeholder={placeholder ?? "Select"} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => {
              const { key, display } = option;

              return (
                <SelectItem key={key} value={key}>
                  {display}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          id={`service-field-${id}`}
          className="flex flex-col gap-3 mt-1"
          value={stringValue}
          onValueChange={(nextValue) => onChange(field_name, nextValue)}
        >
          {options?.map((option) => {
            const { key, display } = option;

            const optionId = `service-field-${id}-${key}`;

            return (
              <Label
                key={key}
                htmlFor={optionId}
                className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
              >
                <RadioGroupItem id={optionId} value={key} className="size-4" />
                {display}
              </Label>
            );
          })}
        </RadioGroup>
      );

    case "checkbox":
      return (
        <div className="flex flex-col gap-3 mt-1">
          {options?.map((option) => {
            const { key, display } = option;
            const checkedValues = Array.isArray(value) ? value : [];
            const optionId = `service-field-${id}-${key}`;

            return (
              <Label
                key={key}
                htmlFor={optionId}
                className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
              >
                <Checkbox
                  id={optionId}
                  value={key}
                  checked={checkedValues.includes(key)}
                  onCheckedChange={(checked) => {
                    const nextValues =
                      checked === true
                        ? [...checkedValues, key]
                        : checkedValues.filter((item) => item !== key);
                    onChange(field_name, nextValues);
                  }}
                />
                {display}
              </Label>
            );
          })}
        </div>
      );

    default:
      return (
        <Input
          id={`service-field-${id}`}
          type="text"
          placeholder={placeholder}
          value={stringValue}
          onChange={({ target: { value: nextValue } }) =>
            onChange(field_name, nextValue)
          }
          className={commonInputClasses}
        />
      );
  }
}
