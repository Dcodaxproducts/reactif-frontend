import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addressFields, personalInfoFields } from "@/data/order";
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
}: {
  fields?: EditableInputFieldProps[];
  editableAddressFields?: EditableInputFieldProps[];
  locationLoading?: boolean;
  onAddressChange?: (name: string, value: string) => void;
  onUseCurrentLocation?: () => void;
  onSave?: () => void;
}) {
  return (
    <Card className="w-full max-w-6xl bg-neutral-800/80 rounded-3xl border border-neutral-50/30">
      <CardContent className="p-6 md:p-10 flex flex-col gap-8 md:py-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <EditableInputField key={field.label} {...field} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
                Address
              </h2>
              <p className="text-neutral-50/50 text-sm font-medium">
                Address, latitude, and longitude are required to submit your booking.
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
              {locationLoading ? "Locating..." : "Use current location"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {editableAddressFields.map((field) => (
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
            className="px-5 h-10 text-neutral-50 text-base md:text-lg font-semibold font-['HK_Grotesk']"
          >
            Save
          </Button>

          <Button
            type="button"
            variant="neutralOutline"
            className="px-5 h-10 text-base md:text-lg font-semibold font-['HK_Grotesk']"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
