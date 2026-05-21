import { PageShell } from "@/components/common/PageShell";
import TermsOfService from "@/components/pages/Terms/TermsContent";

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
      <TermsOfService />
    </PageShell>
  );
}
