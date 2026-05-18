
import Navbar from "@/components/navbar/navbar";
import ShipmentTracking from "@/components/order/ShipmentTracking";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <ShipmentTracking />
    </section>

  );

}
