import { GalleryPage } from "@/components/pages/GalleryPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Galerie de réalisations",
  description:
    "Découvrez une sélection de réalisations RéactifPub en covering automobile, signalétique, impression et habillage de supports.",
  path: "/gallery",
});

export default function Page() {
  return <GalleryPage />;
}
