import CatalogGrid from "@/components/pages/Catalog/CatalogGrid";
import Hero from "@/components/pages/Catalog/Hero";
import ProductFilterBar from "@/components/pages/Catalog/ProductFilterBar";
import Navbar from "@/components/layout/navbar/navbar";
import GlobalBackground from "@/hooks/GlobalBackground";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground
        style={{
          backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url('/assets/AllVendorServices/background.png')
    `,
        }}
      />
      <Hero />
      <div className="px-10 md:px-30 space-y-15 pb-20">
        <ProductFilterBar />
        <CatalogGrid />
      </div>
    </section>
  );
}
