import { Suspense } from "react";
import { AllVendorServicesPage } from "@/components/pages/AllVendorServices/AllVendorServicesPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Spécialistes en impression et communication visuelle",
  description:
    "Trouvez les spécialistes RéactifPub adaptés à votre projet de covering, signalétique, impression ou communication visuelle à Genève.",
  path: "/all-vendor-services",
});

export default function Page() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center">Chargement des spécialistes...</div>}
    >
      <AllVendorServicesPage />
    </Suspense>
  );
}
