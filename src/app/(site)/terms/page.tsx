import TermsOfService from "@/components/pages/Terms/TermsContent";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground
        style={{
          backgroundImage: `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
      url('/assets/AllVendorServices/background.png')
    `,
        }}
      />
      <TermsOfService />
    </section>
  );
}
