import OrderPageShell from "@/components/pages/order/OrderPageShell";
import { PaymentHistory } from "@/components/pages/order/PaymentHistory";

export default function Page() {
  return (
    <OrderPageShell>
      <PaymentHistory />
    </OrderPageShell>
  );
}
