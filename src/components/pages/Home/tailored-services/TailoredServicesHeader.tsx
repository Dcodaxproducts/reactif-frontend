import { useAppTranslation } from "@/hooks/useAppTranslation";

export function TailoredServicesHeader() {
  const { t } = useAppTranslation();

  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-semibold text-white">
        {t("home.tailored.titlePrefix")}{" "}
        <span className="bg-gradient-to-r from-[#5FC5FF] to-[#9F73F1] bg-clip-text text-transparent">
          {t("home.tailored.titleAccent")}
        </span>
      </h2>
      <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
        {t("home.tailored.description")}
      </p>
    </div>
  );
}
