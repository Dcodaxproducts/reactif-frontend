import { HelpCenterBackground } from "@/components/HelpCenter/page-shell/HelpCenterBackground";
import { HelpCenterContent } from "@/components/HelpCenter/page-shell/HelpCenterContent";
import Navbar from "@/components/navbar/navbar";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <HelpCenterBackground />
      <HelpCenterContent />
    </section>
  );
}
