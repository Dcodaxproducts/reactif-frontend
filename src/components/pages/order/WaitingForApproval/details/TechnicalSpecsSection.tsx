import { technicalSpecs } from "@/data/order";
import { SpecItem } from "./SpecItem";

export function TechnicalSpecsSection() {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-bold font-hk">
        Technical Specifications
      </p>
      {technicalSpecs.map((spec) => (
        <SpecItem key={spec.label} {...spec} />
      ))}
    </div>
  );
}
