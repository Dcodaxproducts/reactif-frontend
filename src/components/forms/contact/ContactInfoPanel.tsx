import { contactItems } from "@/data/contact";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { TrustedByCard } from "./TrustedByCard";

export function ContactInfoPanel() {
  const { t } = useAppTranslation();

  return (
    <aside className="flex min-h-[420px] w-full flex-col gap-8 border-b border-white/10 bg-black/72 p-7 text-white md:w-[50%] md:border-r md:border-b-0 lg:p-10">
      <h3 className="text-2xl font-black uppercase tracking-[-0.03em] text-white/80">
        {t("contact.information")}
      </h3>

      <div className="space-y-5">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-pink-500/45 bg-pink-500/10 text-pink-400">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-white/40">
                  {t(item.labelKey)}
                </span>
                <span className="block break-words text-sm font-bold text-white">
                  {item.value}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <TrustedByCard />
    </aside>
  );
}
