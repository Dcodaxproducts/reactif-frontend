import { StaticCustomerPage } from "@/components/pages/StaticCustomerPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portfolio de projets",
  description:
    "Explorez les projets RéactifPub de covering de véhicules, signalétique et applications de marque réalisés pour nos clients.",
  path: "/portfolio",
  image: "/og/og-portfolio.png",
  imageAlt: "Portfolio des projets clients RéactifPub",
});

export default function Page() {
  return <StaticCustomerPage page="portfolio" />;
}
