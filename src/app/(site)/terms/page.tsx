import { PageShell } from "@/components/common/PageShell";
import TermsOfService from "@/components/pages/Terms/TermsContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Conditions générales",
  description:
    "Consultez les conditions générales applicables aux services, commandes, paiements et prestations proposés par RéactifPub.",
  path: "/terms",
});

export default function Page() {
  return (
    <PageShell
      backgroundStyle={{
        backgroundImage: "linear-gradient(180deg, #010101 0%, #030303 100%)",
      }}
    >
      <TermsOfService />
    </PageShell>
  );
}
