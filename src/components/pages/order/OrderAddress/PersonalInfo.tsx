import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addressFields, personalInfoFields } from "@/data/order";
import type { EditableInputFieldProps } from "@/types/component-props";
import { EditableInputField } from "./EditableInputField";

export function PersonalInfo({
  fields = personalInfoFields,
}: {
  fields?: EditableInputFieldProps[];
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
          <h2 className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
            Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {addressFields.map((field) => (
              <EditableInputField key={field.label} {...field} />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="brandSolid" className="px-5 h-10 text-neutral-50 text-base md:text-lg font-semibold font-['HK_Grotesk']">
            Save
          </Button>

          <Button variant="neutralOutline" className="px-5 h-10 text-base md:text-lg font-semibold font-['HK_Grotesk']">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
