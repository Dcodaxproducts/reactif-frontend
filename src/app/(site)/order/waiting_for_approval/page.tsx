import OrderPageShell from "@/components/pages/order/OrderPageShell";
import WaitingForApproval from "@/components/pages/order/WaitingForApproval";

export default function Page() {
  return (
    <OrderPageShell>
      <WaitingForApproval />
    </OrderPageShell>
  );
}
