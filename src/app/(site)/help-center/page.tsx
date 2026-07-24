import { PageShell } from "@/components/common/PageShell";
import { HelpCenterBackground } from "@/components/pages/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/pages/HelpCenter/page-shell/HelpCenterContent";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageData } from "@/lib/faq-page-data";

export const metadata = createPageMetadata({
  title: "Centre d’aide",
  description:
    "Consultez le centre d’aide RéactifPub pour vos questions sur les commandes, livraisons, fichiers de design, installations et comptes.",
  path: "/help-center",
});

export default async function Page() {
  const faqs = await getFaqPageData();

  return (
    <PageShell background={<HelpCenterBackground />}>
      <HelpCenterContent initialFaqs={faqs} />
    </PageShell>
  );
}
