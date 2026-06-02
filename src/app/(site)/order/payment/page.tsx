import OrderPageShell from "@/components/pages/order/OrderPageShell";
import { OrderPayment } from "@/components/pages/order/OrderPayment";

export default function Page() {
  return (
    <OrderPageShell>
      <OrderPayment />
    </OrderPageShell>
  );
}
