import { StaticCustomerPage } from "@/components/pages/StaticCustomerPage";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata({
  title: "Portfolio de projets",
  description:
    "Le portfolio de projets RéactifPub est en cours de préparation.",
});

export default function Page() {
  return <StaticCustomerPage page="portfolio" />;
}
