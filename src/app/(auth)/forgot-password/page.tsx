import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <ForgotPasswordForm />
    </section>
  );
}
