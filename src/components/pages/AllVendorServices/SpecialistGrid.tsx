import SpecialistCard from "@/components/cards/SpecialistCard";
import { specialistAvatarColors } from "@/data/all-vendor-services";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import {
  buildDesignerPortfolioHref,
  buildDesignerSelectHref,
  getDesignerSelectionFallbackHref,
} from "@/lib/designer-routes";
import type { Designer } from "@/types/designers";

type SpecialistGridProps = {
  designers: Designer[];
  queryString: string;
};

export default function SpecialistGrid({
  designers,
  queryString,
}: SpecialistGridProps) {
  const { t } = useAppTranslation();

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
          const specialistName = name?.trim() ? name : t("designers.unnamed");
          const specialistAddress = address?.trim()
            ? address
            : t("designers.locationFallback");
          const portfolioLink = buildDesignerPortfolioHref({
            designerId: id,
            queryString,
          });
          const selectLink = buildDesignerSelectHref({
            designerId: id,
            queryString,
          });

          return (
            <SpecialistCard
              key={id}
              name={specialistName}
              role={
                is_available
                  ? t("designers.availableDesigner")
                  : t("designers.currentlyUnavailable")
              }
              rating={rating ?? 0}
              reviews={0}
              location={specialistAddress}
              tags={[
                is_online ? t("designers.online") : t("designers.offline"),
                t("designers.professionalDesigner"),
              ]}
              experience={t("designers.professional")}
              price={t("designers.contactForPrice")}
              avatarColor={avatarColor}
              avatarImage={profile_image}
              portfolioLink={portfolioLink}
              selectLink={selectLink ?? undefined}
              selectFallbackLink={
                selectLink ? undefined : getDesignerSelectionFallbackHref(queryString)
              }
            />
          );
        },
      )}
    </div>
  );
}
