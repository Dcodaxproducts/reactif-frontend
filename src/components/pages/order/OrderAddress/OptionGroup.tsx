import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { OptionGroupData } from "@/types/component-props";

export function OptionGroup({ title, titleKey, options, optionKeys }: OptionGroupData) {
  const { t } = useAppTranslation();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-stone-300 text-xs font-medium font-hk uppercase">
        {titleKey ? t(titleKey) : title}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <div
            key={option}
            className="px-5 py-2 rounded border border-stone-500 text-stone-300 text-base font-medium font-hk hover:bg-neutral-700 cursor-pointer transition"
          >
            {optionKeys?.[index] ? t(optionKeys[index]) : option}
          </div>
        ))}
      </div>
    </div>
  );
}
