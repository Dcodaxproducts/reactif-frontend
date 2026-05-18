import OTPForm from "@/components/forms/OTPForm";
import Navbar from "@/components/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
<GlobalBackground />
    <OTPForm />
    </section>

  );

}
