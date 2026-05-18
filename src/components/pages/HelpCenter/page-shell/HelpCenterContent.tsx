import ContactFormSection from "@/components/pages/Home/ContactFormSection";
import FeaturedFAQs from "@/components/pages/HelpCenter/FeaturedFAQs";
import HelpGrid from "@/components/pages/HelpCenter/HelpGrid";
import Hero from "@/components/pages/HelpCenter/Hero";

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
