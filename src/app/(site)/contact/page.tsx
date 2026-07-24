import { PageShell } from "@/components/common/PageShell";
import { StartProjectSection as ContactFormSection } from "@/components/pages/Home/ContactFormSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Devis covering et signalétique à Genève",
  description:
    "Contactez RéactifPub à Vernier, Genève, pour discuter de votre projet de covering, signalétique ou impression et demander un devis personnalisé.",
  path: "/contact",
});

export default function Page() {
  return (
    <PageShell>
      <ContactFormSection headingLevel="h1" />
    </PageShell>
  );
}
