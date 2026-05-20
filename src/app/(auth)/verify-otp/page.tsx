import { Suspense } from "react";
import VerifyOtpForm from "@/components/forms/VerifyOtpForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <Suspense fallback={null}>
        <VerifyOtpForm />
      </Suspense>
    </section>
  );
}
