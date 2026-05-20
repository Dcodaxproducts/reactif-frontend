import ProfileForm from "@/components/forms/ProfileForm";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <ProfileForm />
    </section>
  );
}
