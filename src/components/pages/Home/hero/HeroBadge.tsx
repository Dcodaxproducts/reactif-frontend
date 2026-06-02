import { Car } from "lucide-react";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function HeroBadge() {
  const { t } = useAppTranslation();

  return (
    <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full border border-[#515151] text-xs md:text-sm text-[#F5F5F5] backdrop-blur-sm">
      <Car size={20} className="md:w-[23px] md:h-[23px]" color="#F262B5" />
      {t("home.hero.badge")}
    </div>
  );
}
