import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/pages/BlogDetailPage";
import { blogArticles, findBlogArticleBySlug } from "@/data/blogs";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const metadataBySlug: Record<string, { title: string; description: string }> = {
  "branded-wrap-moving-campaign": {
    title: "How a branded wrap turns every trip into a campaign | Reactif",
    description:
      "Layout, readability, and material choices for fleet graphics that stay sharp on the road.",
  },
  "vinyl-care-color-finish-edges": {
    title: "Vinyl care habits for color, finish, and edges | Reactif",
    description:
      "Simple cleaning and maintenance habits that help wraps and signage surfaces keep their finish longer.",
  },
  "signage-storefront-event-display": {
    title: "Choosing signage from storefront to event display | Reactif",
    description:
      "How to compare durability, viewing distance, lighting, and installation context for brand signage.",
  },
};

export function generateStaticParams() {
  return blogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = metadataBySlug[slug];

  if (!metadata) {
    return {
      title: "Blog | Reactif",
    };
  }

  return metadata;
}

export default async function Page({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = findBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailPage article={article} />;
}
