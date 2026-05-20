import LoginForm from "@/components/forms/LoginForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <LoginForm />
    </section>
  );
}
