import { FaStar } from "react-icons/fa";
import { SpecialistAvatar } from "./SpecialistAvatar";

type SpecialistHeaderProps = {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  avatarColor: string;
  avatarImage?: string | null;
};

export const SpecialistHeader = ({
  name,
  role,
  rating,
  reviews,
  avatarColor,
  avatarImage,
}: SpecialistHeaderProps) => (
  <div className="flex justify-between items-start gap-3">
    <div className="flex items-center gap-3 md:gap-4 min-w-0">
      <SpecialistAvatar
        name={name}
        avatarColor={avatarColor}
        avatarImage={avatarImage}
      />

      <div className="min-w-0">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold capitalize truncate">
          {name || "Unnamed Designer"}
        </h3>

        <p className="text-stone-300 text-xs font-medium capitalize">
          {role || "Professional Designer"}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1 flex-shrink-0">
      <FaStar className="text-yellow-400" size={14} />

      <span className="text-white font-semibold text-sm md:text-base">
        {rating ?? 0}
      </span>

      <span className="text-stone-300 text-xs">({reviews ?? 0})</span>
    </div>
  </div>
);
