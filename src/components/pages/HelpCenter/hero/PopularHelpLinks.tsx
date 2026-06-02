import { popularHelpLinks } from "@/data/help-center";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { PopularHelpLink } from "./PopularHelpLink";

export function PopularHelpLinks() {
  const { t } = useAppTranslation();

  return (
    <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap justify-center">
      <span className="text-slate-500">{t("helpCenter.popularLabel")}</span>
      {popularHelpLinks.map((item) => (
        <PopularHelpLink
          key={item.labelKey}
          label={item.label}
          labelKey={item.labelKey}
        />
      ))}
    </div>
  );
}
