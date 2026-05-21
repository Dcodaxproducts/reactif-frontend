import { Suspense } from "react";
import { AuthPageShell } from "@/components/forms/AuthFormShell";
import VerifyOtpForm from "@/components/forms/VerifyOtpForm";

export default function Page() {
  return (
    <AuthPageShell>
      <Suspense fallback={null}>
        <VerifyOtpForm />
      </Suspense>
    </AuthPageShell>
  );
}
