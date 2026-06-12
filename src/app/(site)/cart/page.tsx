import { CartPage } from "@/components/pages/cart/CartPage";
import OrderPageShell from "@/components/pages/order/OrderPageShell";

export default function Page() {
  return (
    <OrderPageShell>
      <CartPage />
    </OrderPageShell>
  );
}
