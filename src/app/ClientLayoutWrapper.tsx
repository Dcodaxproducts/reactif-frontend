"use client";

import { ReactNode } from "react";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/navbar";
import TopInfoBar from "@/components/layout/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { useAuth } from "@/hooks/useAuth";
import GlobalBackground from "@/hooks/GlobalBackground";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  useAuth();

  return (
    <div className="relative isolate min-h-screen bg-transparent text-white">
      <GlobalBackground imageUrl="/assets/hero/gradient.png" overlayColor="#010304" />
      <div className="relative z-10">
        <TopInfoBar />
        <Navbar />
        <Toaster position="top-right" richColors />
        <div>{children}</div>
        <Footer />
      </div>
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
