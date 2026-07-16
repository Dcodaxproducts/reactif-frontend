import { ArrowRight } from "lucide-react";

import { useAppTranslation } from "@/hooks/useAppTranslation";
import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

const partnerLogos = [
  {
    id: "living-racing",
    label: "Living Racing",
    className: "font-black italic tracking-[-0.08em] text-white",
    content: (
      <>
        LIVING <span className="tracking-[-0.12em]">RACING</span>
      </>
    ),
  },
  {
    id: "swissroc",
    label: "Swissroc",
    className: "font-bold tracking-[-0.02em] text-white",
    content: (
      <span className="inline-flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-[2px] bg-[#e11d2e] text-[12px] font-black leading-none text-white">
          +
        </span>
        SWISSROC
      </span>
    ),
  },
  {
    id: "pneus-online",
    label: "Pneus-Online.ch",
    className: "font-serif text-[17px] font-bold italic tracking-[-0.04em] text-white",
    content: "Pneus-Online.ch",
  },
  {
    id: "scuderia-ferrari-club",
    label: "Scuderia Ferrari Club Switzerland",
    className: "text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] text-white",
    content: (
      <span className="inline-flex items-center gap-2 rounded-[2px] border border-white/60 px-2 py-1">
        <span>Scuderia Ferrari Club Switzerland</span>
        <span className="h-4 w-3 rounded-[1px] bg-[#f6d34a]" />
      </span>
    ),
  },
] as const;

export function TrustedByCard() {
  const { t } = useAppTranslation();

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl border border-white/15 bg-black/60 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.3)] md:mt-10 md:p-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-70 blur-[28px]"
        style={{
          background:
            "conic-gradient(from 146deg at 50% 98%, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.14) 193deg, rgba(128,84,255,0.16) 236deg, rgba(119,157,255,0.12) 260deg, rgba(159,115,241,0) 311deg)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <span className={CONTACT_LABEL_CLASS}>{t("contact.trustedBy")}</span>

        <div className="flex items-center gap-5 overflow-x-auto pb-1 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {partnerLogos.map((partner) => (
            <div
              key={partner.id}
              aria-label={partner.label}
              className={`flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap opacity-95 transition hover:opacity-100 ${partner.className}`}
            >
              {partner.content}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 md:flex">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
