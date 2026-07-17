import { FaTrophy } from "react-icons/fa";
import { useAppTranslation } from "@/hooks/useAppTranslation";

type SpecialistStatsProps = {
  experience: string;
  price: string;
};

export const SpecialistStats = ({
  experience,
  price,
}: SpecialistStatsProps) => {
  const { t } = useAppTranslation();

  return (
    <div className="flex justify-between items-start gap-4">
    <div>
      <p className="text-stone-300 text-xs mb-1">{t("designers.experience")}</p>

      <div className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
        <FaTrophy className="text-amber-500" size={14} />
        {experience || "Professional"}
      </div>
    </div>

    <div>
      <p className="text-stone-300 text-xs mb-1">{t("designers.startingFrom")}</p>

      <div className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
        <span className="text-emerald-500">$</span>
        {price || "Contact"}
      </div>
    </div>
    </div>
  );
};
