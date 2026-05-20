import RegistrationForm from "@/components/forms/Registration";
import Navbar from "@/components/layout/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />
      <RegistrationForm />
    </section>
  );
}
