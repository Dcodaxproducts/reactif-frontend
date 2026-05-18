import OrderPageShell from "@/components/pages/order/OrderPageShell";
import ShipmentTracking from "@/components/pages/order/ShipmentTracking";

export default function Page() {
  return (
    <OrderPageShell>
      <ShipmentTracking />
    </OrderPageShell>
  );
}
