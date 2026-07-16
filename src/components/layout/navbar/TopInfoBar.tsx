"use client";

import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { reactifContact } from "@/data/contact";

export function TopInfoBar() {
  const { t } = useAppTranslation();

  return (
    <div
      className="relative w-full text-white text-xs md:text-sm overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #0f3142 0%, #060708 45%, #3b1025 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="absolute -left-40 -top-20 w-[620px] h-[220px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "#5FC5FF",
          filter: "blur(145px)",
        }}
      />

      <div
        className="absolute -right-40 -top-20 w-[620px] h-[220px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "#F262B5",
          filter: "blur(145px)",
        }}
      />

      <Container
        gutter="topbar"
        className="relative py-2 md:py-0 md:h-[40px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-0 text-center md:text-left"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[#F5F5F5]">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>{reactifContact.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>{reactifContact.email}</span>
          </div>
        </div>

        <p className="text-[#F5F5F5] whitespace-nowrap">
          {t("topInfoBar.tagline")}
        </p>
      </Container>
    </div>
  );
}
