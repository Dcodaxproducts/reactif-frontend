
import Navbar from "@/components/navbar/navbar";
import OrderConfirm from "@/components/order/OrderConfirm";
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
