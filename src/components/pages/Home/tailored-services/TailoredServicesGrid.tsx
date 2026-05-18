import { FaLightbulb } from "react-icons/fa";
import { ServiceCard } from "./ServiceCard";
import type { TailoredServicesGridProps } from "@/types/component-props";

export function TailoredServicesGrid({
  categories,
  gridRef,
}: TailoredServicesGridProps) {
  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
    >
      {categories.map((category, index) => (
        <ServiceCard
          key={category.id}
          id={category.id}
          title={category.name}
          description={category.description || ""}
          icon={FaLightbulb}
          index={index}
        />
      ))}
    </div>
  );
}
