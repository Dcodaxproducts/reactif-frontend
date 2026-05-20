import { HelpCenterBackground } from "@/components/pages/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/pages/HelpCenter/page-shell/HelpCenterContent";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <HelpCenterBackground />
      <HelpCenterContent />
    </section>
  );
}
