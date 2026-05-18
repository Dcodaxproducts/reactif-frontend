import Navbar from "@/components/layout/navbar/navbar";
import WaitingForApproval from "@/components/pages/order/WaitingForApproval";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <WaitingForApproval />
    </section>
  );
}
