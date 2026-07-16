// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { onest } from "@/lib/fonts";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "RéactifPub | Communication visuelle automobile",
  description:
    "RéactifPub transforme vos véhicules, vitrines, enseignes et supports imprimés en outils publicitaires professionnels.",
  metadataBase: new URL("https://reactifpub.ch"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "RéactifPub | Communication visuelle automobile",
    description:
      "Transformez votre visibilité avec RéactifPub : covering, signalétique, papeterie, enseignes et publicité visuelle.",
    url: "https://reactifpub.ch",
    siteName: "RéactifPub",
    type: "website",
    images: [
      {
        url: "https://reactifpub.ch/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "RéactifPub communication visuelle automobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RéactifPub | Communication visuelle automobile",
    description:
      "Covering, signalétique, papeterie, enseignes et publicité visuelle par RéactifPub.",
    images: ["https://reactifpub.ch/og/og-home.png"],
    creator: "@reactifpub",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${onest.className}`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
