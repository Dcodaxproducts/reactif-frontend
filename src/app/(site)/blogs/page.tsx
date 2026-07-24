import { BlogsPage } from "@/components/pages/BlogsPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Conseils covering, vinyle et signalétique",
  description:
    "Guides pratiques RéactifPub sur le covering automobile, l’entretien du vinyle, la signalétique et la communication visuelle professionnelle.",
  path: "/blogs",
  image: "/og/og-blogs.png",
  imageAlt: "Guides RéactifPub sur le covering et la signalétique",
});

export default function Page() {
  return <BlogsPage />;
}
