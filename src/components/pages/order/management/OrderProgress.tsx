import type { OrderProgressProps } from "@/types/component-props";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function OrderProgress({ progress }: OrderProgressProps) {
  const { t } = useAppTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-neutral-50/60 text-sm font-semibold font-hk">
        <span>{t("order.progress")}</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-3 bg-indigo-600/10 rounded-full">
        <div
          className="h-3 bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
