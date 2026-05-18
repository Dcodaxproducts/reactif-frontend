"use client";

import { HeroTitle, HeroText } from "@/components/hero/hero-ui";
import TermsBlock from "./TermsBlock";
import LegalCTA from "./LegalCTA";

/* ================= DEFAULT PRIVACY POLICY ================= */
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
      "You may opt out of marketing communications at any time.",
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
];

/* ================= COMPONENT ================= */
interface PrivacyPolicyProps {
  sections?: any[];
  lastUpdated?: string;
}

export default function PrivacyPolicy({
  sections = defaultPrivacySections,
  lastUpdated = "March 2026",
}: PrivacyPolicyProps) {
  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <HeroTitle className="uppercase text-3xl md:text-4xl">
            PRIVACY POLICY
          </HeroTitle>

          <HeroText className="text-slate-400">
            Last Updated: {lastUpdated}
          </HeroText>
        </div>

        {/* SECTIONS */}
        <div className="space-y-12">
          {sections.map((section) => (
            <TermsBlock key={section.id} {...section} />
          ))}
        </div>

        {/* CTA */}
       <LegalCTA
  title="Have questions about your privacy?"
  description="Our team is here to help you understand how your data is collected, used, and protected."
  buttonText="Contact Us"
/>
      </div>
    </section>
  );
}