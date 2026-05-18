import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Navbar from "@/components/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
  <GlobalBackground />
      <ForgotPasswordForm />
    </section>

  );

}
