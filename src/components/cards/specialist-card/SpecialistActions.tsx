"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { useAppTranslation } from "@/hooks/useAppTranslation";

type SpecialistActionsProps = {
  available: boolean;
  portfolioLink?: string;
  selectLink?: string;
  selectFallbackLink?: string;
};

const PortfolioLink = ({ link }: { link?: string }) => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const { t } = useAppTranslation();

  return (
    <Link
      href={link || `/vendor-portfolio${queryString ? `?${queryString}` : ""}`}
      className="flex items-center gap-2 text-stone-300 hover:text-white cursor-pointer transition"
    >
      {t("designers.viewPortfolio")}
      <FaArrowRight size={12} />
    </Link>
  );
};

export const SpecialistActions = ({
  available,
  portfolioLink,
  selectLink,
  selectFallbackLink,
}: SpecialistActionsProps) => {
  const { t } = useAppTranslation();

  return (
    <div className="absolute bottom-0 left-0 w-full h-10 border-t border-stone-500/40 bg-[#0F172A] rounded-b-xl flex items-center justify-between px-4 md:px-6 text-xs">
      <div
        className={`flex items-center gap-2 ${
          available ? "text-emerald-500" : "text-red-400"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            available ? "bg-emerald-500" : "bg-red-400"
          }`}
        />

        {available ? t("designers.available") : t("designers.unavailable")}
      </div>

      <div className="flex items-center gap-4">
        {portfolioLink && (
          <Link
            href={portfolioLink}
            className="text-stone-300 hover:text-white transition"
          >
            {t("designers.portfolio")}
          </Link>
        )}

        {selectLink ? (
          <Link
            href={selectLink}
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            {t("designers.select")}
          </Link>
        ) : selectFallbackLink ? (
          <Link
            href={selectFallbackLink}
            className="text-amber-300 hover:text-amber-200 transition"
          >
            {t("designers.chooseServiceFirst")}
          </Link>
        ) : null}

        {!portfolioLink && <PortfolioLink />}
      </div>
    </div>
  );
};
