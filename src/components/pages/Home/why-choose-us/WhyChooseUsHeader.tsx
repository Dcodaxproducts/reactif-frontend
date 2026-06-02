import { SectionHeader } from "@/components/common/SectionHeader";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function WhyChooseUsHeader() {
  const { t } = useAppTranslation();

  return (
    <SectionHeader
      badgeText={t("home.why.badge")}
      title={
        <>
          {t("home.why.titlePrefix")}{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("home.why.titleAccent")}
          </span>
        </>
      }
      description={t("home.why.description")}
    />
  );
}
