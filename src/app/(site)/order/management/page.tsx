import Navbar from "@/components/navbar/navbar";
import Management from "@/components/order/Management";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />

      <Management />
    </section>
  );
}
