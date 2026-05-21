import { AuthPageShell } from "@/components/forms/AuthFormShell";
import RegistrationForm from "@/components/forms/Registration";

export default function Page() {
  return (
    <AuthPageShell>
      <RegistrationForm />
    </AuthPageShell>
  );
}
