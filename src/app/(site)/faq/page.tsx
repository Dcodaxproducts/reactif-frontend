import { FaqPageContent } from "@/components/pages/FaqPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqPageData } from "@/lib/faq-page-data";
import { createFaqPageJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Questions fréquentes",
  description:
    "Retrouvez les réponses aux questions fréquentes sur les délais, l’installation, les matériaux vinyle et les services RéactifPub.",
  path: "/faq",
});

export default async function Page() {
  const faqs = await getFaqPageData();

  return (
    <>
      <JsonLd data={createFaqPageJsonLd(faqs, "/faq")} />
      <FaqPageContent initialFaqs={faqs} />
    </>
  );
}
