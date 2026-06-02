// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { onest } from "@/lib/fonts";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Reactif | Automotive Visual Communication Expert",
  description:
    "Reactif is a leader in automotive visual communication. Vehicle wrapping, marking, and advertising with professional quality. Get a free quote today!",
  metadataBase: new URL("https://reactif-mocha.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reactif | Automotive Visual Communication Expert",
    description:
      "Transform your vehicles into advertising tools with Reactif. Complete visual communication solutions for the automotive sector.",
    url: "https://reactif-mocha.vercel.app",
    siteName: "Reactif",
    type: "website",
    images: [
      {
        url: "https://reactif-mocha.vercel.app/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Reactif Automotive Visual Communication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reactif | Automotive Visual Communication Expert",
    description:
      "Transform your vehicles into advertising tools with Reactif. Vehicle wrapping, marking, and advertising with professional quality.",
    images: ["https://reactif-mocha.vercel.app/og/og-home.png"],
    creator: "@reactif",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${onest.className}`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
