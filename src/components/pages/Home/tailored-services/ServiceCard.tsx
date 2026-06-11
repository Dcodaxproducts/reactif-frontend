import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { keyServices } from "@/data/home";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { buildCategoryRouteFromCategory } from "@/lib/category-routes";
import type { ServiceCardProps } from "@/types/component-props";

export function ServiceCard({
  id,
  title,
  description,
  icon: Icon,
  index,
}: ServiceCardProps) {
  const { t } = useAppTranslation();

  return (
    <Card
      className="relative rounded-[24px] overflow-hidden opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease_forwards] border-0 bg-transparent p-0 shadow-none"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="absolute inset-0 blur-[20px] opacity-100"
        style={{
          background:
            "conic-gradient(from 132deg at 40.63% 50.41%, rgba(242, 98, 181, 0.00) 125.179deg, rgba(95, 197, 255, 0.20) 193.412deg, rgba(255, 172, 137, 0.20) 216.021deg, rgba(129, 85, 255, 0.20) 236.071deg, rgba(120, 157, 255, 0.20) 259.953deg, rgba(159, 115, 241, 0.00) 311.078deg)",
        }}
      />

      <CardContent className="relative z-10 rounded-[24px] border border-[#F5F5F580] bg-black/40 backdrop-blur-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="w-14 h-14 p-2.5 rounded-xl bg-pink-400/20 flex justify-center items-center">
          <div className="w-10 h-10 p-2 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-bold">
              {title}
            </h3>
            <p className="text-white/70 text-sm md:text-base font-bold">
              {t("home.tailored.cardSubtitle")}
            </p>
          </div>

          <p className="text-white/70 text-sm md:text-base">{description}</p>

          <div>
            <p className="text-white text-sm md:text-base font-medium mb-4">
              {t("home.tailored.keyServices")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyServices.map((service) => (
                <div key={service.labelKey} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400" />
                  <span className="text-white text-sm">
                    {t(service.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          asChild
          className="h-11 bg-white rounded-full flex justify-center items-center font-semibold text-zinc-800 hover:bg-white/90"
        >
          <Link
            href={buildCategoryRouteFromCategory({
              id,
              name: title,
            })}
          >
            {t("home.tailored.learnMore")}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
