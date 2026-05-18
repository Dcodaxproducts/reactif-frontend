import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  paymentFields,
  paymentMethods,
  paymentSecondaryFields,
} from "@/data/order";
import { PaymentInputField } from "./PaymentInputField";
import { PaymentTab } from "./PaymentTab";

export function PaymentDetailsCard() {
  return (
    <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
      <CardContent className="p-6 md:px-10 md:py-8 flex flex-col gap-6">
        <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
          Payment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <PaymentTab key={method.label} {...method} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {paymentFields.map((field) => (
            <PaymentInputField key={field.label} {...field} />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentSecondaryFields.map((field) => (
              <PaymentInputField key={field.label} {...field} />
            ))}
          </div>
        </div>

        <Link
          href="/order/success"
          className="w-full h-12 bg-pink-400 hover:bg-pink-500 rounded-lg text-neutral-50 text-lg font-semibold font-['HK_Grotesk'] flex items-center justify-center"
        >
          Pay $1250.00
        </Link>
        <p className="text-center text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
          Your Payment is securely processed by Stripe
        </p>
      </CardContent>
    </Card>
  );
}
