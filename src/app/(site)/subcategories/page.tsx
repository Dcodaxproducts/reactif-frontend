import { SubcategoriesMain } from "./SubcategoriesMain";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services de communication visuelle",
  description:
    "Parcourez les catégories de services RéactifPub pour trouver la solution de covering, signalétique ou impression adaptée à votre projet.",
  path: "/subcategories",
});

const page = () => {
  return <SubcategoriesMain />;
};

export default page;
