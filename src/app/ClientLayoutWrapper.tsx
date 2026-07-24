"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/navbar";
import { TopInfoBar } from "@/components/layout/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { FloatingWhatsAppButton } from "@/components/common/FloatingWhatsAppButton";
import { useAppTranslation } from "@/hooks/useAppTranslation";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  const { t } = useAppTranslation();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[1000] -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-black shadow-xl transition-transform focus:translate-y-0"
      >
        {t("accessibility.skipToContent")}
      </a>
      <div data-print-hidden="true">
        <TopInfoBar />
        <Navbar />
      </div>
      <Toaster position="top-right" richColors />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <div data-print-hidden="true">
        <Footer />
      </div>
      <FloatingWhatsAppButton />
    </div>
  );
}

export function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ClientLayoutContent>{children}</ClientLayoutContent>
        </LanguageProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
