import type { ReactNode } from "react";
import { createNoIndexMetadata } from "@/lib/seo";

type PaintProtectionLayoutProps = {
  children: ReactNode;
};

export const metadata = createNoIndexMetadata({
  title: "Configuration d’un service automobile",
  description:
    "Parcours de configuration et de réservation d’un service automobile RéactifPub.",
});

export default function PaintProtectionLayout({
  children,
}: PaintProtectionLayoutProps) {
  return children;
}
