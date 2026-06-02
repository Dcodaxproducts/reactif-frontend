"use client";

import { HeroTitle, HeroText } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import TermsBlock from "./TermsBlock";
import LegalCTA from "./LegalCTA";
const termsSections = [
  {
    id: 1,
    titleKey: "legal.terms.sections.introduction.title",
    contentKeys: [
      "legal.terms.sections.introduction.content1",
      "legal.terms.sections.introduction.content2",
    ],
  },
  {
    id: 2,
    titleKey: "legal.terms.sections.userResponsibilities.title",
    listKeys: [
      "legal.terms.sections.userResponsibilities.item1",
      "legal.terms.sections.userResponsibilities.item2",
      "legal.terms.sections.userResponsibilities.item3",
    ],
  },
  {
    id: 3,
    titleKey: "legal.terms.sections.intellectualProperty.title",
    contentKeys: ["legal.terms.sections.intellectualProperty.content1"],
    highlightKey: "legal.terms.sections.intellectualProperty.highlight",
  },
  {
    id: 4,
    titleKey: "legal.terms.sections.liability.title",
    contentKeys: [
      "legal.terms.sections.liability.content1",
      "legal.terms.sections.liability.content2",
      "legal.terms.sections.liability.content3",
    ],
  },
  {
    id: 5,
    titleKey: "legal.terms.sections.governingLaw.title",
    contentKeys: ["legal.terms.sections.governingLaw.content1"],
  },
];
export default function TermsOfService() {
  const { t } = useAppTranslation();
  const translatedSections = termsSections.map((section) => ({
    id: section.id,
    title: t(section.titleKey),
    content: section.contentKeys?.map((key) => t(key)),
    list: section.listKeys?.map((key) => t(key)),
    highlight: section.highlightKey ? t(section.highlightKey) : undefined,
  }));

  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <HeroTitle className="uppercase text-3xl md:text-4xl">
            {t("legal.terms.title")}
          </HeroTitle>

          <HeroText className="text-slate-400">
            {t("legal.lastUpdated", { date: "October 24, 2023" })}
          </HeroText>
        </div>
        <div className="space-y-12">
          {translatedSections.map((section) => (
            <TermsBlock key={section.id} {...section} />
          ))}
        </div>
        <LegalCTA />
      </div>
    </section>
  );
}
