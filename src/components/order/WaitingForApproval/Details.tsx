import { DetailsHeader } from "./details/DetailsHeader";
import { TechnicalSpecsSection } from "./details/TechnicalSpecsSection";
import { VehicleDetailsSection } from "./details/VehicleDetailsSection";

export default function Details() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6">
      <div className="p-4 sm:p-6 md:p-9 bg-neutral-800/80 rounded-xl border border-neutral-50/30 flex flex-col gap-6">
        <DetailsHeader />
        <div className="h-px bg-neutral-50/20" />
        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          <TechnicalSpecsSection />
          <VehicleDetailsSection />
        </div>
      </div>
    </section>
  );
}
