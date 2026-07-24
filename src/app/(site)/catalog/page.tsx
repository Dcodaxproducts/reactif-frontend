import { CatalogPage } from "@/components/pages/Catalog/CatalogPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Catalogue de communication visuelle",
  description:
    "Explorez le catalogue RéactifPub de covering, signalétique, impressions, habillages de vitrines et supports publicitaires personnalisés.",
  path: "/catalog",
});

export default function Page() {
  return <CatalogPage />;
}
