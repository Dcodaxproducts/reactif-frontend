import { FaTrophy } from "react-icons/fa";

type SpecialistStatsProps = {
  experience: string;
  price: string;
};

export const SpecialistStats = ({
  experience,
  price,
}: SpecialistStatsProps) => (
  <div className="flex justify-between items-start gap-4">
    <div>
      <p className="text-stone-300 text-xs mb-1">Experience</p>

      <div className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
        <FaTrophy className="text-amber-500" size={14} />
        {experience || "Professional"}
      </div>
    </div>

    <div>
      <p className="text-stone-300 text-xs mb-1">Start From</p>

      <div className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
        <span className="text-emerald-500">$</span>
        {price || "Contact"}
      </div>
    </div>
  </div>
);
