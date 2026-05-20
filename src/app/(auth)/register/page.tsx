import RegistrationForm from "@/components/forms/Registration";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <RegistrationForm />
    </section>
  );
}
