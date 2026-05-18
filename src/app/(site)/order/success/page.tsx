import Navbar from "@/components/layout/navbar/navbar";
import OrderConfirm from "@/components/pages/order/OrderConfirm";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <OrderConfirm />
    </section>
  );
}
