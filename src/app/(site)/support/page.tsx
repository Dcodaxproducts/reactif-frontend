import { StartProjectSection as ContactFormSection } from "@/components/pages/Home/ContactFormSection";
import { StaticCustomerPage } from "@/components/pages/StaticCustomerPage";
import { SupportRequestsSection } from "@/components/pages/SupportRequestsSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Support client",
  description:
    "Contactez le support RéactifPub pour une question sur votre commande, votre design, un service ou votre compte client.",
  path: "/support",
});

export default function Page() {
  return (
    <StaticCustomerPage page="support">
      <ContactFormSection />
      <SupportRequestsSection />
    </StaticCustomerPage>
  );
}
