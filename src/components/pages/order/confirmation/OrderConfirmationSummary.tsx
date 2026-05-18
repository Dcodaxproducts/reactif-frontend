import {
  orderConfirmationInfo,
  orderConfirmationItems,
  orderConfirmationTotals,
} from "@/data/order";
import { InfoItem } from "./InfoItem";
import { OrderItem } from "./OrderItem";
import { TotalItem } from "./TotalItem";

export function OrderConfirmationSummary() {
  return (
    <div className="w-full p-6 sm:p-8 md:p-10 bg-neutral-800 rounded-3xl border border-neutral-50/10 flex flex-col gap-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-50 font-hk">
        Order Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orderConfirmationInfo.map((item) => (
          <InfoItem key={item.title} {...item} />
        ))}
      </div>

      <InfoItem
        title="Shipping Address"
        value="123 Main Street, Anytown, USA 12345"
      />

      <div className="border border-neutral-50/10 rounded-xl overflow-hidden">
        <div className="hidden md:grid grid-cols-3 items-center px-4 py-4 text-neutral-50 font-medium bg-neutral-700/40">
          <div>Item</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
        </div>

        {orderConfirmationItems.map((item) => (
          <OrderItem key={item.name} {...item} />
        ))}
      </div>

      <div className="w-full md:max-w-sm ml-auto flex flex-col gap-4">
        {orderConfirmationTotals.map((item) => (
          <TotalItem key={item.label} {...item} />
        ))}

        <div className="border-t border-neutral-50/10 pt-4 flex justify-between font-semibold text-neutral-50">
          <span>Total</span>
          <span>$1,073.26</span>
        </div>
      </div>
    </div>
  );
}
