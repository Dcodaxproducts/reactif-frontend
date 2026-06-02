"use client";

import type { LucideIcon } from "lucide-react";
import { Car, PenTool, Factory } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export type ExpertiseItem = {
  icon: LucideIcon;
  title: string;
  titleKey: string;
  desc: string;
  descriptionKey: string;
};
const expertiseData: ExpertiseItem[] = [
  {
    icon: Car,
    title: "Premium Vehicle Wraps",
    titleKey: "about.expertise.items.premiumWraps.title",
    desc: "Utilizing industry-leading vinyl and precision installation techniques for a flawless finish that protects and performs.",
    descriptionKey: "about.expertise.items.premiumWraps.description",
  },
  {
    icon: PenTool,
    title: "High-Impact Design",
    titleKey: "about.expertise.items.highImpactDesign.title",
    desc: "Custom livery and graphics designed to capture the essence of your brand or personal style with striking visual clarity.",
    descriptionKey: "about.expertise.items.highImpactDesign.description",
  },
  {
    icon: Factory,
    title: "Industrial Precision",
    titleKey: "about.expertise.items.industrialPrecision.title",
    desc: "State-of-the-art printing technology ensuring color accuracy and durability that stands up to the rigors of the road.",
    descriptionKey: "about.expertise.items.industrialPrecision.description",
  },
];

export default function OurExpertise() {
  const { t } = useAppTranslation();

  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">
      <Container width="7xl" className="space-y-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {t("about.expertise.title")}
          </h2>

          <div
            className="w-16 h-[3px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #9F73F1 0%, #5FC5FF 100%)",
            }}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {expertiseData.map((item) => (
            <ExpertiseCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
function ExpertiseCard({
  icon: Icon,
  titleKey,
  descriptionKey,
}: ExpertiseItem) {
  const { t } = useAppTranslation();

  return (
    <div className="rounded-2xl border border-white/20 p-6 space-y-4 bg-[#010304] hover:border-white/40 transition">
      <div className="text-purple-400">
        <Icon size={28} />
      </div>
      <h3 className="text-white text-lg font-semibold">{t(titleKey)}</h3>
      <p className="text-slate-400 text-[15.5px] leading-relaxed">
        {t(descriptionKey)}
      </p>
    </div>
  );
}
