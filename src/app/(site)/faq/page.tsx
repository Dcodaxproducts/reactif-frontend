import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import FeaturedFAQs from "@/components/pages/HelpCenter/FeaturedFAQs";
import { StaticFaqHero } from "@/components/pages/StaticFaqHero";

export default function Page() {
  return (
    <PageShell>
      <Container
        gutter="page"
        width="7xl"
        className="pt-14 pb-10 md:pt-24 md:pb-14"
      >
        <StaticFaqHero />
      </Container>
      <div className="pb-12 md:pb-20">
        <FeaturedFAQs />
      </div>
    </PageShell>
  );
}
