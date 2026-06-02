import { useAppTranslation } from "@/hooks/useAppTranslation";

export function FAQHeader() {
  const { t } = useAppTranslation();

  return (
    <div className="text-center mb-10">
      <h2 className="text-white text-3xl md:text-4xl font-semibold mb-2">
        {t("helpCenter.faq.title")}
      </h2>
      <p className="text-gray-400 text-sm">
        {t("helpCenter.faq.description")}
      </p>
    </div>
  );
}
