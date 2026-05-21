import { PageShell } from "@/components/common/PageShell";
import PrivacyPolicy from "@/components/pages/Terms/PrivacyPolicyContent";

export default function Page() {
  return (
    <PageShell
      backgroundStyle={{
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
      url('/assets/AllVendorServices/background.png')
    `,
      }}
    >
      <PrivacyPolicy />
    </PageShell>
  );
}
