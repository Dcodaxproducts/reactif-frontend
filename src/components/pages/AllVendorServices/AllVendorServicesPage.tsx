import GlobalBackground from "@/hooks/GlobalBackground";
import { Container } from "@/components/common/Container";
import DeliveryService from "./DeliveryService";
import SpecialistsSection from "./SpecialistsSection";

export default function AllVendorServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GlobalBackground />
        <SpecialistsSection />
      </section>

      <Container gutter="page" className="bg-[#010304] pb-16 md:pb-30">
        <DeliveryService />
      </Container>
    </>
  );
}
