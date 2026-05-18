"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const OrderPayment = () => {
  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-neutral-50 text-3xl md:text-4xl font-semibold font-['HK_Grotesk']">
            Complete Your Payment
          </h1>
          <p className="text-neutral-50/60 text-lg md:text-xl font-medium font-['HK_Grotesk']">
            Get help from our support team
          </p>
        </div>

        <div className="flex flex-col gap-8">

          {/* ================= Order Summary ================= */}
          <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
            <CardContent className="p-6 md:px-10 md:py-6 flex flex-col gap-6">

              <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
                Order Summary
              </h2>

              {/* Quotation Row */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 p-4 bg-pink-400/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 relative">
                    <div className="w-3.5 h-5 left-[8.75px] top-[0.75px] absolute outline outline-[1.5px] outline-pink-400" />
                    <div className="w-4 h-6 left-[0.75px] top-[0.75px] absolute outline outline-[1.5px] outline-pink-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
                    Quotation #12345
                  </div>
                  <div className="text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
                    A detailed summary of your purchase
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-50/10" />

              {/* Pricing */}
              <div className="flex flex-col gap-4">
                <PriceRow label="Sub Total" value="$1100.00" />
                <PriceRow label="Tax (10%)" value="$110.00" />
                <PriceRow label="Service Margin" value="$40.00" />
              </div>

              <div className="border-t border-neutral-50/10" />

              <div className="flex justify-between items-center">
                <span className="text-neutral-50 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
                  Total Payable Amount
                </span>
                <span className="text-pink-400 text-xl md:text-2xl font-semibold font-['HK_Grotesk']">
                  $1250.00
                </span>
              </div>

            </CardContent>
          </Card>

          {/* ================= Payment Details ================= */}
          <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
            <CardContent className="p-6 md:px-10 md:py-8 flex flex-col gap-6">

              <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
                Payment Details
              </h2>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PaymentTab active label="Credit / Debit Card" />
                <PaymentTab label="Google Pay" />
                <PaymentTab label="Apple Pay" />
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4">
                <InputField label="Name on Card" placeholder="John Smith" />
                <InputField label="Card Number" placeholder="0000 0000 0000 0000" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="Expiry Date" placeholder="MM / YY" />
                  <InputField label="CVC" placeholder="123" />
                  <InputField label="ZIP or Postal Code" placeholder="12345" />
                </div>
              </div>

              {/* Pay Button */}
             <Link
  href="/order/success"
  className="
    w-full
    h-12
    bg-pink-400
    hover:bg-pink-500
    rounded-lg
    text-neutral-50
    text-lg
    font-semibold
    font-['HK_Grotesk']
    flex
    items-center
    justify-center
  "
>
  Pay $1250.00
</Link>
              <p className="text-center text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
                Your Payment is securely processed by Stripe
              </p>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}

export default OrderPayment


/* ================= Reusable Components ================= */

function PriceRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-neutral-50/60 text-lg font-medium font-['HK_Grotesk']">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function PaymentTab({ label, active }: any) {
  return (
    <div
      className={`
        h-11
        px-4
        rounded-lg
        flex items-center justify-center
        text-lg font-semibold font-['HK_Grotesk']
        transition
        ${
          active
            ? "bg-pink-400 text-neutral-50"
            : "bg-neutral-800 border border-neutral-50/10 text-neutral-50"
        }
      `}
    >
      {label}
    </div>
  )
}

function InputField({ label, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-neutral-50 text-lg font-semibold font-['HK_Grotesk']">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        className="
          h-11
          px-3
          bg-neutral-800
          rounded-lg
          border border-neutral-50/10
          text-neutral-50
          placeholder:text-neutral-50/60
          focus-visible:ring-0
          focus-visible:ring-offset-0
          focus-visible:border-pink-400
        "
      />
    </div>
  )
}
