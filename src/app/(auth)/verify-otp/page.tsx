import VerifyOtpForm from "@/components/forms/VerifyOtpForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <VerifyOtpForm />
    </section>
  );
}
