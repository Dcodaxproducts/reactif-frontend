import { OrderSummaryCard } from "./payment/OrderSummaryCard";
import { PaymentDetailsCard } from "./payment/PaymentDetailsCard";

const OrderPayment = () => {
  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-neutral-50 text-3xl md:text-4xl font-semibold font-['HK_Grotesk']">
            Complete Your Payment
          </h1>
          <p className="text-neutral-50/60 text-lg md:text-xl font-medium font-['HK_Grotesk']">
            Get help from our support team
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <OrderSummaryCard />
          <PaymentDetailsCard />
        </div>
      </div>
    </section>
  );
};

export default OrderPayment;
