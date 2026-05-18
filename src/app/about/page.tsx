
import AboutContent from "@/components/About/AboutContent";
import Hero from "@/components/About/Hero";
import OurCommitment from "@/components/About/OurCommitment";
import OurExpertise from "@/components/About/OurExpertise";
import Navbar from "@/components/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <Hero />
      <AboutContent />
      <OurExpertise />
      <OurCommitment />
      
    </section>

  );

}
