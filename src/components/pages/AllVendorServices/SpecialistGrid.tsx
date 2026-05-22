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
      {designers.map(
        (
          {
            id,
            name,
            is_available,
            rating,
            address,
            is_online,
            profile_image,
          },
          index,
        ) => {
          const avatarColor =
            specialistAvatarColors[index % specialistAvatarColors.length];
          const specialistName = name?.trim() ? name : "Unnamed Specialist";
          const specialistAddress = address?.trim()
            ? address
            : "Location not specified";

          return (
            <SpecialistCard
              key={id}
              name={specialistName}
              role={
                is_available ? "Available Designer" : "Currently Unavailable"
              }
              rating={rating ?? 0}
              reviews={0}
              location={specialistAddress}
              tags={[is_online ? "Online" : "Offline", "Professional Designer"]}
              experience="Professional"
              price="Contact for price"
              avatarColor={avatarColor}
              avatarImage={profile_image}
              portfolioLink={`/designer/${id}`}
              selectLink={`/paint-protection/${categoryId}?${queryString}&designerId=${id}`}
            />
          );
        },
      )}
    </div>
  );
}
