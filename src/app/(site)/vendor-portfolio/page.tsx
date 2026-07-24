import { Suspense } from "react";
import { createPageMetadata } from "@/lib/seo";
import { VendorPortfolio } from "./VendorPortfolioMain";

export const metadata = createPageMetadata({
  title: "Portfolio d’un spécialiste",
  description:
    "Consultez les réalisations et services proposés par un spécialiste de la plateforme RéactifPub.",
  path: "/vendor-portfolio",
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
