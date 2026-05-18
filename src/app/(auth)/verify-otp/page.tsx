import VerifyOtpForm from "@/components/forms/VerifyOtpForm";
import Navbar from "@/components/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
<GlobalBackground />
      <VerifyOtpForm />
    </section>

  );

}
