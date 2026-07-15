import { useAppTranslation } from "@/hooks/useAppTranslation";

const trustedBrands = ["LIVING RACING", "SWISSROC", "Pneus-Online.ch", "Scuderia Ferrari Club"];

export function TrustedByCard() {
  const { t } = useAppTranslation();

  return (
    <div className="mt-auto rounded-2xl border border-white/15 bg-black/45 px-5 py-4">
      <p className="mb-3 text-[11px] font-semibold text-white/45">
        {t("contact.trustedBy")}
      </p>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        {trustedBrands.map((brand, index) => (
          <span
            key={brand}
            className="text-sm font-black italic tracking-[-0.04em] text-white md:text-base"
          >
            {brand}
            {index === trustedBrands.length - 1 ? null : ""}
          </span>
        ))}
        <span className="ml-auto text-2xl leading-none text-white" aria-hidden="true">
          →
        </span>
      </div>
    </div>
  );
}
