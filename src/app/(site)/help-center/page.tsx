import { HelpCenterBackground } from "@/components/pages/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/pages/HelpCenter/page-shell/HelpCenterContent";
import Navbar from "@/components/layout/navbar/navbar";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <HelpCenterBackground />
      <HelpCenterContent />
    </section>
  );
}
