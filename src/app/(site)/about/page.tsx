import { PageShell } from "@/components/common/PageShell";
import AboutContent from "@/components/pages/About/AboutContent";
import Hero from "@/components/pages/About/Hero";
import OurCommitment from "@/components/pages/About/OurCommitment";
import OurExpertise from "@/components/pages/About/OurExpertise";

export default function Page() {
  return (
    <PageShell>
      <Hero />
      <AboutContent />
      <OurExpertise />
      <OurCommitment />
    </PageShell>
  );
}
