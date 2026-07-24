import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addressFields, personalInfoFields } from "@/data/order";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { EditableInputFieldProps } from "@/types/component-props";
import { LocateFixed } from "lucide-react";
import { EditableInputField } from "./EditableInputField";

export function PersonalInfo({
  fields = personalInfoFields,
  editableAddressFields = addressFields,
  locationLoading = false,
  onAddressChange,
  onUseCurrentLocation,
  onSave,
  onCancel,
}: {
  fields?: EditableInputFieldProps[];
  editableAddressFields?: EditableInputFieldProps[];
  locationLoading?: boolean;
  onAddressChange?: (name: string, value: string) => void;
  onUseCurrentLocation?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  const { t } = useAppTranslation();
  const translatedFields = fields.map((field) => ({
    ...field,
    label: field.labelKey ? t(field.labelKey) : field.label,
    placeholder: field.placeholderKey ? t(field.placeholderKey) : field.placeholder,
  }));
  const translatedAddressFields = editableAddressFields.map((field) => ({
    ...field,
    label: field.labelKey ? t(field.labelKey) : field.label,
    placeholder: field.placeholderKey ? t(field.placeholderKey) : field.placeholder,
  }));

  return (
    <Card className="w-full max-w-6xl rounded-3xl border border-neutral-50/30 bg-neutral-800/80 font-hk">
      <CardContent className="p-6 md:p-10 flex flex-col gap-8 md:py-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-neutral-50 md:text-2xl">
            {t("order.personalInformation")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {translatedFields.map((field) => (
              <EditableInputField key={field.label} {...field} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-50 md:text-2xl">
                {t("order.address")}
              </h2>
              <p className="text-neutral-50/50 text-sm font-medium">
                {t("order.addressRequirement")}
              </p>
            </div>

            <Button
              type="button"
              variant="neutralOutline"
              onClick={onUseCurrentLocation}
              disabled={locationLoading}
              className="h-10 px-4 text-sm font-semibold"
            >
              <LocateFixed className="h-4 w-4" />
              {locationLoading ? t("order.locating") : t("order.useCurrentLocation")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {translatedAddressFields.map((field) => (
              <EditableInputField
                key={field.label}
                {...field}
                onChange={onAddressChange}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="brandSolid"
            onClick={onSave}
            className="h-10 px-5 text-base font-semibold text-neutral-50 md:text-lg"
          >
            {t("order.save")}
          </Button>

          <Button
            type="button"
            variant="neutralOutline"
            onClick={onCancel}
            className="h-10 px-5 text-base font-semibold md:text-lg"
          >
            {t("order.cancel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
