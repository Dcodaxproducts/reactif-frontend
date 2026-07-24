import { AutomotivePage } from "@/components/pages/Automotive/AutomotivePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Covering et protection automobile à Genève",
  description:
    "Découvrez nos services automobiles : covering publicitaire, protection de peinture, vitres teintées et marquage de véhicules à Genève.",
  path: "/automotive",
  image: "/og/og-automotive.png",
  imageAlt: "Services de communication visuelle automobile RéactifPub",
});

export default function Page() {
  return <AutomotivePage />;
}
