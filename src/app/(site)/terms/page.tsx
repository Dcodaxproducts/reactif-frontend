import { PageShell } from "@/components/common/PageShell";
import TermsOfService from "@/components/pages/Terms/TermsContent";

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
