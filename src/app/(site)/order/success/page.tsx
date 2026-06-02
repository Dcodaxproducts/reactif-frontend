import { Suspense } from "react";
import OrderPageShell from "@/components/pages/order/OrderPageShell";
import { OrderConfirm } from "@/components/pages/order/OrderConfirm";

export default function Page() {
  return (
    <OrderPageShell>
      <Suspense fallback={<p className="text-neutral-50/60 p-8">Loading...</p>}>
        <OrderConfirm />
      </Suspense>
    </OrderPageShell>
  );
}
