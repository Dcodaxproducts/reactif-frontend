import { ContactAnchorScroller } from "@/components/common/ContactAnchorScroller";
import { Container } from "@/components/common/Container";
import { StartProjectSection as ContactFormSection } from "@/components/pages/Home/ContactFormSection";
import { ContactSection } from "@/components/pages/Home/ContactSection";
import { Hero } from "@/components/pages/Home/Hero";
import { GallerySection } from "@/components/pages/Home/GallerySection";
import { TailoredServices } from "@/components/pages/Home/TailoredServices";
import { WhyChooseUs } from "@/components/pages/Home/WhyChooseUs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Communication visuelle automobile à Genève",
  description:
    "Transformez véhicules, vitrines et supports imprimés en outils publicitaires avec RéactifPub, spécialiste du covering et de la signalétique à Genève.",
  path: "/",
});

export default function Home() {
  return (
    <Container>
      <ContactAnchorScroller />
      <Hero />
      <section id="categories">
        <TailoredServices />
      </section>
      <WhyChooseUs />
      <GallerySection />
      <ContactSection />

      <section>
        <ContactFormSection />
      </section>
    </Container>
  );
}
