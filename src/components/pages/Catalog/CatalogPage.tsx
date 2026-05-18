import Navbar from "@/components/layout/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";
import { catalogBackgroundStyle } from "@/data/catalog";
import CatalogGrid from "./CatalogGrid";
import CatalogHero from "./CatalogHero";
import ProductFilterBar from "./ProductFilterBar";

export default function CatalogPage() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground style={catalogBackgroundStyle} />
      <CatalogHero />
      <div className="px-10 md:px-30 space-y-15 pb-20">
        <ProductFilterBar />
        <CatalogGrid />
      </div>
    </section>
  );
}
