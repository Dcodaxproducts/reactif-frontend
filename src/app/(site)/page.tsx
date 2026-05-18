import Container from "@/components/container";
import ContactFormSection from "@/components/pages/Home/ContactFormSection";
import ContactSection from "@/components/pages/Home/ContactSection";
import Hero from "@/components/pages/Home/Hero";
import TailoredServices from "@/components/pages/Home/TailoredServices";
import WhyChooseUs from "@/components/pages/Home/WhyChooseUs";

export default function Home() {
  return (
    <Container>
      <Hero />
      <section id="categories">
        <TailoredServices />
      </section>
      <WhyChooseUs />
      <ContactSection />

      <section id="contact">
        <ContactFormSection />
      </section>
    </Container>
  );
}
