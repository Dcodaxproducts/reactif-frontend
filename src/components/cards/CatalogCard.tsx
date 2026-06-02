import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { CatalogCardProps } from "@/types/component-props";

function CatalogCard({ item }: CatalogCardProps) {
  const { image, title, titleKey, category, categoryKey, price, desc, descriptionKey } = item;
  const { t } = useAppTranslation();
  const displayTitle = titleKey ? t(titleKey) : title;

  return (
    <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden hover:scale-[1.02] transition">
      <div className="h-52 bg-slate-950 flex items-center justify-center p-4">
        <div className="relative h-[160px] w-full">
          <Image
            src={image}
            alt={displayTitle}
            fill
            sizes="300px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 bg-[#010304]">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wide text-pink-500">
            {categoryKey ? t(categoryKey) : category}
          </span>
          <span className="text-white font-bold text-sm">{price}</span>
        </div>

        <h3 className="text-white font-bold text-lg leading-6">
          {displayTitle}
        </h3>

        <p className="text-slate-400 text-sm leading-6 line-clamp-3">
          {descriptionKey ? t(descriptionKey) : desc}
        </p>

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            aria-label={t("catalog.viewDetailsFor", { title: displayTitle })}
            className="flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:gap-3"
          >
            {t("catalog.viewDetails")}
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            aria-label={t("catalog.addToCart", { title: displayTitle })}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
          >
            <ShoppingCart size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogCard;
