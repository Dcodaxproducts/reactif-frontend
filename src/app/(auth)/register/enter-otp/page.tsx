import { Suspense } from "react";
import { AuthPageShell } from "@/components/forms/AuthFormShell";
import OTPForm from "@/components/forms/OTPForm";

export default function Page() {
  return (
    <AuthPageShell>
      <Suspense fallback={null}>
        <OTPForm />
      </Suspense>
    </AuthPageShell>
  );
}
