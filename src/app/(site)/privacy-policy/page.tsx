import Navbar from "@/components/layout/navbar/navbar";
import PrivacyPolicy from "@/components/pages/Terms/PrivacyPolicyContent";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground
        style={{
          backgroundImage: `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
      url('/assets/AllVendorServices/background.png')
    `,
        }}
      />
      <PrivacyPolicy />
    </section>
  );
}
