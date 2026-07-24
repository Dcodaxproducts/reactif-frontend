import { PageShell } from "@/components/common/PageShell";
import { HelpCenterBackground } from "@/components/pages/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/pages/HelpCenter/page-shell/HelpCenterContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Centre d’aide",
  description:
    "Consultez le centre d’aide RéactifPub pour vos questions sur les commandes, livraisons, fichiers de design, installations et comptes.",
  path: "/help-center",
});

export default function Page() {
  return (
    <PageShell background={<HelpCenterBackground />}>
      <HelpCenterContent />
    </PageShell>
  );
}
