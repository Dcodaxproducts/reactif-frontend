import ContactFormSection from "@/components/pages/Home/ContactFormSection";
import { StaticCustomerPage } from "@/components/pages/StaticCustomerPage";

export default function Page() {
  return (
    <StaticCustomerPage page="support">
      <ContactFormSection />
    </StaticCustomerPage>
  );
}
