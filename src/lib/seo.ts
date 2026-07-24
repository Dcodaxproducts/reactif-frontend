import type { Metadata } from "next";

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

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} — communication visuelle à Genève`,
  type = "website",
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
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
      description,
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
