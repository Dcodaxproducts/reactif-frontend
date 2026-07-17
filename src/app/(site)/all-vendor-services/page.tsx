import { Suspense } from "react";
import { AllVendorServicesPage } from "@/components/pages/AllVendorServices/AllVendorServicesPage";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center">Chargement des spécialistes...</div>}
    >
      <AllVendorServicesPage />
    </Suspense>
  );
}
