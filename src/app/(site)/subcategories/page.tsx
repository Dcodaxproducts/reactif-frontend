import { SubcategoriesMain } from "./SubcategoriesMain";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata({
  title: "Services de communication visuelle",
  description:
    "Parcours de sélection des catégories et services RéactifPub.",
});

const page = () => {
  return <SubcategoriesMain />;
};

export default page;
