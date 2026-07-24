import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

type PaintProtectionLayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PaintProtectionLayoutProps) {
  const { id } = await params;

  return createPageMetadata({
    title: "Protection et finition automobile",
    description:
      "Configurez votre projet de protection, finition ou personnalisation automobile avec les services et spécialistes RéactifPub.",
    path: `/paint-protection/${id}`,
  });
}

export default function PaintProtectionLayout({
  children,
}: PaintProtectionLayoutProps) {
  return children;
}
