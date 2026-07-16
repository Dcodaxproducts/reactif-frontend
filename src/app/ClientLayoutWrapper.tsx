"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/navbar";
import { TopInfoBar } from "@/components/layout/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { FloatingWhatsAppButton } from "@/components/common/FloatingWhatsAppButton";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  useAuth();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div data-print-hidden="true">
        <TopInfoBar />
        <Navbar />
      </div>
      <Toaster position="top-right" richColors />
      <div>{children}</div>
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
