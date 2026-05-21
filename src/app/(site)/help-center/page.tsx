import { PageShell } from "@/components/common/PageShell";
import { HelpCenterBackground } from "@/components/pages/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/pages/HelpCenter/page-shell/HelpCenterContent";

export default function Page() {
  return (
    <PageShell background={<HelpCenterBackground />}>
      <HelpCenterContent />
    </PageShell>
  );
}
