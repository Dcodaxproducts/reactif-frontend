import SpecialistCard from "@/components/cards/SpecialistCard";
import { specialistAvatarColors } from "@/data/all-vendor-services";
import type { Designer } from "@/types/designers";

type SpecialistGridProps = {
  designers: Designer[];
  categoryId: string | null;
  queryString: string;
};

export default function SpecialistGrid({
  designers,
  categoryId,
  queryString,
}: SpecialistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-10 mt-10 md:mt-16">
      {designers.map((designer, index) => {
        const avatarColor =
          specialistAvatarColors[index % specialistAvatarColors.length];

        return (
          <SpecialistCard
            key={designer.id}
            name={designer.name || "Unnamed Specialist"}
            role={
              designer.is_available
                ? "Available Designer"
                : "Currently Unavailable"
            }
            rating={designer.rating ?? 0}
            reviews={0}
            location={designer.address || "Location not specified"}
            tags={[
              designer.is_online ? "Online" : "Offline",
              "Professional Designer",
            ]}
            experience="Professional"
            price="Contact for price"
            avatarColor={avatarColor}
            avatarImage={designer.profile_image}
            portfolioLink={`/designer/${designer.id}`}
            selectLink={`/paint-protection/${categoryId}?${queryString}&designerId=${designer.id}`}
          />
        );
      })}
    </div>
  );
}
