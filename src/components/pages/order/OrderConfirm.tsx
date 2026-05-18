import { CheckCircle } from "lucide-react";
import { OrderConfirmationActions } from "./confirmation/OrderConfirmationActions";
import { OrderConfirmationSummary } from "./confirmation/OrderConfirmationSummary";

export default function OrderConfirm() {
  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl p-6 sm:p-8 md:p-10 bg-neutral-800/80 rounded-3xl border border-neutral-50/10 flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-green-600/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-neutral-50 font-hk">
            Thank You! Your Order is Confirmed
          </h1>

          <p className="max-w-2xl text-neutral-50/60 text-sm sm:text-base md:text-xl font-medium font-hk">
            Your order #123-4567890 has been placed. A confirmation email has
            been sent to your registered email address.
          </p>
        </div>

        <OrderConfirmationSummary />
        <OrderConfirmationActions />
      </div>
    </section>
  );
}
