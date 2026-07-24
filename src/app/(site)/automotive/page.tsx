import { AutomotivePage } from "@/components/pages/Automotive/AutomotivePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Covering et protection automobile à Genève",
  description:
    "Découvrez nos services automobiles : covering publicitaire, protection de peinture, vitres teintées et marquage de véhicules à Genève.",
  path: "/automotive",
});

export default function Page() {
  return <AutomotivePage />;
}
