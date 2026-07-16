import { PageShell } from "@/components/common/PageShell";
import PrivacyPolicy from "@/components/pages/Terms/PrivacyPolicyContent";

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
