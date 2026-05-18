
import Navbar from "@/components/navbar/navbar";
import OrderPayment from "@/components/order/OrderPayment";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <OrderPayment />
    </section>

  );

}
