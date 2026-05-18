"use client";

import { ReactNode } from "react";
import Footer from "@/components/footer/Footer";
import TopInfoBar from "@/components/navbar/TopInfoBar";
import { Toaster } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { onest } from "@/lib/fonts";

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {

  useAuth();

  return (
    <body className={`${onest.className}`}>
      <TopInfoBar />
      <Toaster position="top-right" richColors />
      <div>{children}</div>
      <Footer />
    </body>
  );
}