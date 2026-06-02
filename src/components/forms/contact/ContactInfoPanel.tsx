import { contactItems } from "@/data/contact";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { ContactInfoItem } from "./ContactInfoItem";
import { TrustedByCard } from "./TrustedByCard";

export function ContactInfoPanel() {
  const { t } = useAppTranslation();

  return (
    <div className="relative p-6 sm:p-8 md:p-12 md:max-w-[51%] w-full flex flex-col gap-10 md:gap-14 bg-black/40 backdrop-blur-xl">
      <h2 className="text-white text-2xl md:text-3xl font-semibold uppercase font-hk">
        {t("contact.information")}
      </h2>

      <div className="flex flex-col gap-6 md:gap-8">
        {contactItems.map((item) => (
          <ContactInfoItem
            key={item.labelKey}
            {...item}
            label={t(item.labelKey)}
          />
        ))}
      </div>

      <TrustedByCard />
    </div>
  );
}
