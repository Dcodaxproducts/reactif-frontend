"use client";

import { HeroTitle, HeroText } from "@/components/common/HeroUi";
import TermsBlock, { type TermsBlockData } from "./TermsBlock";
import LegalCTA from "./LegalCTA";
import { useAppTranslation } from "@/hooks/useAppTranslation";
const defaultPrivacySections = [
  {
    id: 1,
    title: "Introduction",
    content: [
      "We respect your privacy and are committed to protecting your personal information.",
      "This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform and services.",
    ],
  },
  {
    id: 2,
    title: "Information We Collect",
    list: [
      "Personal information such as name, email, phone number, and address",
      "Account and authentication data",
      "Payment and transaction details",
      "Usage data including interactions with our platform",
    ],
  },
  {
    id: 3,
    title: "How We Use Your Information",
    content: [
      "We use your information to provide and improve our services.",
      "This includes processing orders, managing accounts, and providing customer support.",
    ],
    highlight:
      "We may also use your data to personalize your experience and send important updates or promotional communications.",
  },
  {
    id: 4,
    title: "Data Sharing and Security",
    content: [
      "We do not sell your personal data to third parties.",
      "We may share data with trusted service providers for payment processing and service delivery.",
      "We implement industry-standard security measures to protect your data.",
    ],
  },
  {
    id: 5,
    title: "Your Rights",
    content: [
      "You have the right to access, update, or delete your personal information.",
      "You may opt out of marketing communications whenever needed.",
      "You can request a copy of your stored data.",
    ],
  },
  {
    id: 6,
    title: "Cookies and Tracking",
    content: [
      "We use cookies and similar technologies to enhance user experience.",
      "These help us understand user behavior and improve our platform.",
    ],
  },
  {
    id: 7,
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time.",
      "Any changes will be communicated through our platform or via email.",
    ],
  },
] satisfies TermsBlockData[];
interface PrivacyPolicyProps {
  sections?: TermsBlockData[];
  lastUpdated?: string;
}

export default function PrivacyPolicy({
  sections = defaultPrivacySections,
  lastUpdated = "March 2026",
}: PrivacyPolicyProps) {
  const { t } = useAppTranslation();
  const translatedDefaultSections: TermsBlockData[] = [
    {
      id: 1,
      title: t("legal.privacy.sections.introduction.title"),
      content: [
        t("legal.privacy.sections.introduction.content1"),
        t("legal.privacy.sections.introduction.content2"),
      ],
    },
    {
      id: 2,
      title: t("legal.privacy.sections.information.title"),
      list: [
        t("legal.privacy.sections.information.item1"),
        t("legal.privacy.sections.information.item2"),
        t("legal.privacy.sections.information.item3"),
        t("legal.privacy.sections.information.item4"),
      ],
    },
    {
      id: 3,
      title: t("legal.privacy.sections.use.title"),
      content: [
        t("legal.privacy.sections.use.content1"),
        t("legal.privacy.sections.use.content2"),
      ],
      highlight: t("legal.privacy.sections.use.highlight"),
    },
    {
      id: 4,
      title: t("legal.privacy.sections.sharing.title"),
      content: [
        t("legal.privacy.sections.sharing.content1"),
        t("legal.privacy.sections.sharing.content2"),
        t("legal.privacy.sections.sharing.content3"),
      ],
    },
    {
      id: 5,
      title: t("legal.privacy.sections.rights.title"),
      content: [
        t("legal.privacy.sections.rights.content1"),
        t("legal.privacy.sections.rights.content2"),
        t("legal.privacy.sections.rights.content3"),
      ],
    },
    {
      id: 6,
      title: t("legal.privacy.sections.cookies.title"),
      content: [
        t("legal.privacy.sections.cookies.content1"),
        t("legal.privacy.sections.cookies.content2"),
      ],
    },
    {
      id: 7,
      title: t("legal.privacy.sections.changes.title"),
      content: [
        t("legal.privacy.sections.changes.content1"),
        t("legal.privacy.sections.changes.content2"),
      ],
    },
  ];
  const displaySections =
    sections === defaultPrivacySections ? translatedDefaultSections : sections;

  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <HeroTitle className="uppercase text-3xl md:text-4xl">
            {t("legal.privacy.title")}
          </HeroTitle>

          <HeroText className="text-slate-400">
            {t("legal.lastUpdated", { date: lastUpdated })}
          </HeroText>
        </div>
        <div className="space-y-12">
          {displaySections.map((section) => (
            <TermsBlock key={section.id} {...section} />
          ))}
        </div>
        <LegalCTA
          title={t("legal.privacy.cta.title")}
          description={t("legal.privacy.cta.description")}
          buttonText={t("legal.privacy.cta.button")}
        />
      </div>
    </section>
  );
}
