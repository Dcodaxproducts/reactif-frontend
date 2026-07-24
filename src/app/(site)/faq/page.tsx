import { FaqPageContent } from "@/components/pages/FaqPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Questions fréquentes",
  description:
    "Retrouvez les réponses aux questions fréquentes sur les délais, l’installation, les matériaux vinyle et les services RéactifPub.",
  path: "/faq",
});

export default function Page() {
  return <FaqPageContent />;
}
