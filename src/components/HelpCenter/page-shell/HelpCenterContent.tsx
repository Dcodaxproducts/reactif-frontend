import ContactFormSection from "@/components/Home/ContactFormSection";
import FeaturedFAQs from "@/components/HelpCenter/FeaturedFAQs";
import HelpGrid from "@/components/HelpCenter/HelpGrid";
import Hero from "@/components/HelpCenter/Hero";

export function HelpCenterContent() {
  return (
    <>
      <Hero />
      <HelpGrid />
      <FeaturedFAQs />
      <ContactFormSection />
    </>
  );
}
