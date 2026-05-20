import Profile from "@/components/cards/Profile";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground />
      <Profile />
    </section>
  );
}
