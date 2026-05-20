import AboutContent from "@/components/pages/About/AboutContent";
import Hero from "@/components/pages/About/Hero";
import OurCommitment from "@/components/pages/About/OurCommitment";
import OurExpertise from "@/components/pages/About/OurExpertise";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <Hero />
      <AboutContent />
      <OurExpertise />
      <OurCommitment />
    </section>
  );
}
