import type { Metadata } from "next";
import type { SupportFaq } from "@/types/support";

export const SITE_NAME = "RéactifPub";
export const SITE_URL = "https://react-if.vercel.app";
export const DEFAULT_OG_IMAGE = "/og/og-home.png";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

type NoIndexMetadataOptions = {
  title: string;
  description: string;
};

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export function createDescriptionSnippet(
  description: string,
  maxLength = 160,
) {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const cutAt = lastSpace > 80 ? lastSpace : shortened.length;

  return `${shortened.slice(0, cutAt)}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} — communication visuelle à Genève`,
  type = "website",
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const normalizedDescription = createDescriptionSnippet(description);

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description: normalizedDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "fr_CH",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: normalizedDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const privatePageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export function createNoIndexMetadata({
  title,
  description,
}: NoIndexMetadataOptions): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
        noimageindex: true,
      },
    },
  };
}

export const createFaqPageJsonLd = (
  faqs: SupportFaq[],
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  url: absoluteUrl(path),
  inLanguage: "fr-CH",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
});

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/assets/logo.png"),
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      email: "info@reactifpub.ch",
      telephone: "+41 78 325 18 88",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ch. de Morglas 7",
        postalCode: "1214",
        addressLocality: "Vernier",
        addressRegion: "Genève",
        addressCountry: "CH",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Genève",
      },
      sameAs: [
        "https://www.tiktok.com/@reactifpub",
        "https://www.facebook.com/reactifpub",
        "https://www.instagram.com/reactifpub",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-CH",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};
