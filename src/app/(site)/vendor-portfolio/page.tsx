import { Suspense } from "react";
import { createNoIndexMetadata } from "@/lib/seo";
import { VendorPortfolio } from "./VendorPortfolioMain";

export const metadata = createNoIndexMetadata({
  title: "Portfolio d’un spécialiste",
  description:
    "Parcours de consultation du portfolio d’un spécialiste RéactifPub.",
});

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="py-10 text-center">Chargement des sous-catégories...</div>
        }
      >
        <VendorPortfolio />
      </Suspense>
    </div>
  );
};

export default page;
