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
      {categories.map(({ id, name, description }, index) => (
        <ServiceCard
          key={id}
          id={id}
          title={name}
          description={description ?? ""}
          icon={FaLightbulb}
          index={index}
        />
      ))}
    </div>
  );
}
