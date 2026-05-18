"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PersonalInfo = () => {
  return (
      <Card className="w-full max-w-6xl bg-neutral-800/80 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8 md:py-5">

          {/* ================= Personal Information ================= */}
          <div className="flex flex-col gap-4">
            <h2 className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Full Name" defaultValue="John Doe" />
              <InputField label="Email Address" defaultValue="john.doe@acme.com" />
              <InputField label="Phone Number" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          {/* ================= Address ================= */}
          <div className="flex flex-col gap-4">
            <h2 className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
              Address
            </h2>

            <InputField
              label="Street Address"
              defaultValue="123 Business St, Suite 100"
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="City" defaultValue="San Francisco" />
              <InputField label="State" defaultValue="CA" />
              <InputField label="Zip Code" defaultValue="94567" />
            </div>
          </div>

          {/* ================= Actions ================= */}
          <div className="flex gap-4">
            <Button className="px-5 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-neutral-50 text-base md:text-lg font-semibold font-['HK_Grotesk']">
              Save
            </Button>

            <Button
              className="
                px-5
                h-10
                rounded-lg
                bg-transparent
                border
                border-neutral-50/30
                text-neutral-50
                hover:bg-neutral-50/10
                text-base md:text-lg
                font-semibold
                font-['HK_Grotesk']
              "
            >
              Cancel
            </Button>
          </div>

        </CardContent>
      </Card>
  )
}

export default PersonalInfo


/* ================= Reusable Editable Field ================= */

function InputField({
  label,
  defaultValue,
  fullWidth,
}: {
  label: string
  defaultValue: string
  fullWidth?: boolean
}) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
      <label className="text-neutral-50 text-lg md:text-md font-semibold font-['HK_Grotesk']">
        {label}
      </label>

      <Input
        defaultValue={defaultValue}
        className="
          h-10
          bg-neutral-800
          rounded-lg
          border
          border-neutral-50/10
          text-neutral-50
          text-base md:text-lg
          font-medium
          font-['HK_Grotesk']
          focus-visible:ring-0
          focus-visible:border-blue-500
        "
      />
    </div>
  )
}
