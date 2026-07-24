import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/pages/BlogDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogArticles, findBlogArticleBySlug } from "@/data/blogs";
import {
  absoluteUrl,
  createPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const metadataBySlug: Record<
  string,
  { title: string; description: string; section: string; image: string }
> = {
  "branded-wrap-moving-campaign": {
    title: "Transformer chaque trajet en campagne avec un covering",
    description:
      "Hiérarchie visuelle, lisibilité et choix des matériaux pour créer un covering publicitaire efficace et durable sur la route.",
    section: "Covering automobile",
    image: "/og/og-blog-branded-wrap.png",
  },
  "vinyl-care-color-finish-edges": {
    title: "Entretenir un vinyle : couleur, finition et bords",
    description:
      "Les gestes de nettoyage et d’entretien qui préservent plus longtemps la couleur, la finition et les bords de votre covering vinyle.",
    section: "Entretien du vinyle",
    image: "/og/og-blog-vinyl-care.png",
  },
  "signage-storefront-event-display": {
    title: "Choisir sa signalétique, de la vitrine à l’événement",
    description:
      "Comparez durabilité, distance de lecture, éclairage et contexte de pose pour choisir une signalétique adaptée à votre marque.",
    section: "Signalétique",
    image: "/og/og-blog-signage.png",
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
      title: "Blog",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const article = findBlogArticleBySlug(slug);
  const pageMetadata = createPageMetadata({
    title: metadata.title,
    description: metadata.description,
    path: `/blogs/${slug}`,
    image: metadata.image,
    imageAlt: metadata.title,
    type: "article",
  });

  return {
    ...pageMetadata,
    openGraph: {
      ...pageMetadata.openGraph,
      type: "article",
      publishedTime: article?.publishedAt,
      authors: [`${SITE_URL}/about`],
      section: metadata.section,
    },
  };
}

export default async function Page({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = findBlogArticleBySlug(slug);
  const metadata = metadataBySlug[slug];

  if (!article || !metadata) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/blogs/${slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    image: absoluteUrl(metadata.image),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-CH",
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: `Équipe éditoriale ${SITE_NAME}`,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/logo.png"),
      },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blogs"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <BlogDetailPage article={article} shareUrl={articleUrl} />
    </>
  );
}
