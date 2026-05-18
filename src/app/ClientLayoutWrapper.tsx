"use client";

import { ReactNode } from "react";
import Footer from "@/components/layout/footer/Footer";
import TopInfoBar from "@/components/layout/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { useAuth } from "@/hooks/useAuth";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  useAuth();

  return (
    <>
      <TopInfoBar />
      <Toaster position="top-right" richColors />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </QueryProvider>
  );
}
