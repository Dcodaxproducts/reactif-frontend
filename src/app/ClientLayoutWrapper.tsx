"use client";

import { ReactNode } from "react";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/navbar";
import TopInfoBar from "@/components/layout/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { useAuth } from "@/hooks/useAuth";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  useAuth();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <TopInfoBar />
      <Navbar />
      <Toaster position="top-right" richColors />
      <div>{children}</div>
      <Footer />
    </div>
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
