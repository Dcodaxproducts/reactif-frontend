import ContactFormSection from "@/components/pages/Home/ContactFormSection";
import { StaticCustomerPage } from "@/components/pages/StaticCustomerPage";
import { SupportRequestsSection } from "@/components/pages/SupportRequestsSection";

export default function Page() {
  return (
    <StaticCustomerPage page="support">
      <ContactFormSection />
      <SupportRequestsSection />
    </StaticCustomerPage>
  );
}
