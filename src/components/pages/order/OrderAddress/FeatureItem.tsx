import { FiCheckCircle } from "react-icons/fi";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { ProtectionFeatureData } from "@/types/component-props";

export function FeatureItem({
  title,
  titleKey,
  description,
  descriptionKey,
}: ProtectionFeatureData) {
  const { t } = useAppTranslation();

  return (
    <div className="flex items-center gap-3 min-h-14 py-2.5 rounded-lg outline-1 outline-offset-[-1px] outline-neutral-50/10 px-3">
      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      <div className="min-w-0 flex flex-col justify-center">
        <span className="text-stone-300 text-sm font-bold font-['HK_Grotesk']">
          {titleKey ? t(titleKey) : title}
        </span>
        <span className="break-words text-stone-500 text-xs font-medium font-['HK_Grotesk']">
          {descriptionKey ? t(descriptionKey) : description}
        </span>
      </div>
    </div>
  );
}
