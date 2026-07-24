import { PageShell } from "@/components/common/PageShell";
import PrivacyPolicy from "@/components/pages/Terms/PrivacyPolicyContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Consultez la politique de confidentialité RéactifPub et la manière dont vos informations sont collectées, utilisées et protégées.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <PageShell
      backgroundStyle={{
        backgroundImage: "linear-gradient(180deg, #010101 0%, #030303 100%)",
      }}
    >
      <PrivacyPolicy />
    </PageShell>
  );
}
