import { GalleryPage } from "@/components/pages/GalleryPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Galerie de réalisations",
  description:
    "Découvrez une sélection de réalisations RéactifPub en covering automobile, signalétique, impression et habillage de supports.",
  path: "/gallery",
  image: "/og/og-gallery.png",
  imageAlt: "Galerie des réalisations RéactifPub",
});

export default function Page() {
  return <GalleryPage />;
}
