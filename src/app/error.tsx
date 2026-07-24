"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#010101] px-6 py-20 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f21b6d]">
          Erreur inattendue
        </p>
        <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] md:text-5xl">
          Un problème est survenu
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/60 md:text-base">
          Réessayez maintenant ou revenez à l’accueil. Aucun changement n’a été
          enregistré sur cette page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            className="rounded-full bg-[#f21b6d] px-7 font-semibold text-black hover:bg-[#ff2d7d]"
          >
            Réessayer
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/">Retour à l’accueil</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
