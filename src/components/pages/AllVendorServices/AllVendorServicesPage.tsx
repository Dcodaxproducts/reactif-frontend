import Navbar from "@/components/layout/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";
import DeliveryService from "./DeliveryService";
import SpecialistsSection from "./SpecialistsSection";

export default function AllVendorServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Navbar />
        <GlobalBackground />
        <SpecialistsSection />
      </section>

      <div className="bg-[#010304] px-4 sm:px-6 md:px-30 pb-16 md:pb-30">
        <DeliveryService />
      </div>
    </>
  );
}
