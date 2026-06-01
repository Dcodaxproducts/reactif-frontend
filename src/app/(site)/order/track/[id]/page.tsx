import { Suspense } from "react";
import OrderPageShell from "@/components/pages/order/OrderPageShell";
import ShipmentTracking from "@/components/pages/order/ShipmentTracking";

export default function Page() {
  return (
    <OrderPageShell>
      <Suspense fallback={<p className="text-white/60 p-8">Loading tracking...</p>}>
        <ShipmentTracking />
      </Suspense>
    </OrderPageShell>
  );
}
