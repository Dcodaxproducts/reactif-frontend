"use client";

import { FaWhatsapp } from "react-icons/fa";
import { reactifContact } from "@/data/contact";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function FloatingWhatsAppButton() {
  const { t } = useAppTranslation();
  const message = encodeURIComponent(t("whatsapp.defaultMessage"));
  const href = `https://wa.me/${reactifContact.whatsappPhone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.ariaLabel")}
      data-print-hidden="true"
      className="fixed bottom-4 right-4 z-[999] inline-flex items-center gap-2 rounded-full bg-[#62d84e] px-3.5 py-2.5 text-[13px] font-semibold leading-none text-black shadow-[0_12px_34px_rgba(98,216,78,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6ee35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#62d84e] sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 sm:text-sm"
    >
      <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      <span>{t("whatsapp.label")}</span>
    </a>
  );
}
