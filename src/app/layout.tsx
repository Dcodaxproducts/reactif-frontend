// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { onest } from "@/lib/fonts";
import {
  organizationJsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Communication visuelle automobile à Genève | RéactifPub",
    template: "%s | RéactifPub",
  },
  description:
    "RéactifPub transforme vos véhicules, vitrines, enseignes et supports imprimés en outils publicitaires professionnels.",
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
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
        <JsonLd data={organizationJsonLd} />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
