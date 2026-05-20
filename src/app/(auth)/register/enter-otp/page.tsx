import OTPForm from "@/components/forms/OTPForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <OTPForm />
    </section>
  );
}
