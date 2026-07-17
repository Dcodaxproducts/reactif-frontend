import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import DeliveryService from "./DeliveryService";
import { SpecialistsSection } from "./SpecialistsSection";

export function AllVendorServicesPage() {
  return (
    <>
      <PageShell>
        <SpecialistsSection />
      </PageShell>

      <Container gutter="page" className="bg-[#010304] pb-16 md:pb-30">
        <DeliveryService />
      </Container>
    </>
  );
}
