
import HelpGrid from "@/components/HelpCenter/HelpGrid";
import Hero from "@/components/HelpCenter/Hero";
import Navbar from "@/components/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";

import ContactFormSection from "@/components/Home/ContactFormSection";
import FeaturedFAQs from "@/components/HelpCenter/FeaturedFAQs";

export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
     <GlobalBackground
  style={{
    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.75) 0%,
        rgba(0,0,0,0.3) 30%,
        rgba(0,0,0,0.7) 100%
      ),
      url('/assets/AllVendorServices/background.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
  }}
/>
<div className="pointer-events-none absolute inset-0 z-[1]">
  {/* top glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1e3a8a]/30 blur-[120px] opacity-60" />

  {/* center subtle glow */}
  <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0a0f1c]/40 blur-[100px] opacity-50" />

</div>
  
      <Hero />
      <HelpGrid />
        <FeaturedFAQs />
      <ContactFormSection />
     
      
    </section>

  );

}
