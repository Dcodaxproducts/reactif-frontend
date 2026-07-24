import { PageShell } from "@/components/common/PageShell";
import AboutContent from "@/components/pages/About/AboutContent";
import Hero from "@/components/pages/About/Hero";
import OurCommitment from "@/components/pages/About/OurCommitment";
import OurExpertise from "@/components/pages/About/OurExpertise";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "À propos de notre atelier de communication visuelle",
  description:
    "Découvrez RéactifPub, son expertise en covering automobile, signalétique et impression ainsi que son engagement pour des réalisations professionnelles à Genève.",
  path: "/about",
  image: "/og/og-about.png",
  imageAlt: "Présentation de l’expertise RéactifPub",
});

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
