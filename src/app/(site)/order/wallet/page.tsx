import OrderPageShell from "@/components/pages/order/OrderPageShell";
import { Wallet } from "@/components/pages/order/Wallet";

export default function Page() {
  return (
    <OrderPageShell>
      <Wallet />
    </OrderPageShell>
  );
}
