import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page demandée n’existe pas ou a été déplacée.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#010101] px-6 py-20 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f21b6d]">
          Erreur 404
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.08em] md:text-6xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/60 md:text-base">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>
        <Button
          asChild
          className="mt-8 rounded-full bg-[#f21b6d] px-8 font-semibold text-black hover:bg-[#ff2d7d]"
        >
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </main>
  );
}
