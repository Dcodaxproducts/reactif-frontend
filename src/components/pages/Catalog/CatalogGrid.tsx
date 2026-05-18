import { useCatalog } from "@/hooks/useCatalog";
import CatalogSection from "./CatalogSection";

export default function CatalogGrid() {
  const { items } = useCatalog();

  return (
    <div className="space-y-6">
      <CatalogSection title="Our Services" items={items} />
      <CatalogSection title="Popular Services" items={items.slice(2)} />
    </div>
  );
}
