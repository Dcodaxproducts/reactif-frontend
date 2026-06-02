import { OrderAddress } from "@/components/pages/order/OrderAddress";
import OrderPageShell from "@/components/pages/order/OrderPageShell";
import { orderBackgroundStyle } from "@/data/order";

export default function Page() {
  return (
    <OrderPageShell backgroundStyle={orderBackgroundStyle}>
      <OrderAddress />
    </OrderPageShell>
  );
}
