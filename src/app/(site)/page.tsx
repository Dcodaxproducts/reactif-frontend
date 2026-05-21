import { ContactAnchorScroller } from "@/components/common/ContactAnchorScroller";
import { Container } from "@/components/common/Container";
import ContactFormSection from "@/components/pages/Home/ContactFormSection";
import ContactSection from "@/components/pages/Home/ContactSection";
import Hero from "@/components/pages/Home/Hero";
import TailoredServices from "@/components/pages/Home/TailoredServices";
import WhyChooseUs from "@/components/pages/Home/WhyChooseUs";

export default function Home() {
  return (
    <Container>
      <ContactAnchorScroller />
      <Hero />
      <section id="categories">
        <TailoredServices />
      </section>
      <WhyChooseUs />
      <ContactSection />

      <section id="contact" className="scroll-mt-24">
        <ContactFormSection />
      </section>
    </Container>
  );
}
