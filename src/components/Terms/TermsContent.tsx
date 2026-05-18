"use client";

import { HeroTitle, HeroText } from "@/components/hero/hero-ui";
import TermsBlock from "./TermsBlock";
import LegalCTA from "./LegalCTA";

/* ================= DATA ================= */
const termsSections = [
  {
    id: 1,
    title: "Introduction",
    content: [
      "Welcome to Reactif Printing & Design. These Terms of Service (“Terms”) govern your access and use of our website, products, and services.",
      "Reactif provides high-quality digital and physical printing solutions, graphic design services, and branding consultations.",
    ],
  },
  {
    id: 2,
    title: "User Responsibilities",
    list: [
      "You are responsible for ensuring all uploaded files meet technical specifications.",
      "You must own or have rights to all submitted content.",
      "You agree not to use services for unlawful or offensive materials.",
    ],
  },
  {
    id: 3,
    title: "Intellectual Property",
    content: [
      "All content created during the design phase remains the property of Reactif until final payment.",
    ],
    highlight:
      "Upon final payment, ownership transfers to the client, while Reactif retains the right to showcase work in portfolio and marketing materials.",
  },
  {
    id: 4,
    title: "Limitation of Liability",
    content: [
      "Reactif shall not be liable for indirect or incidental damages.",
      "We do not guarantee exact color matching between digital and physical prints.",
      "Maximum liability is limited to the amount paid for the service.",
    ],
  },
  {
    id: 5,
    title: "Governing Law",
    content: [
      "These Terms are governed by and construed in accordance with the laws of the jurisdiction in which ReactIf Printing & Design is registered, without regard to its conflict of law principles.",
    ],
  },
];

/* ================= COMPONENT ================= */
export default function TermsOfService() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <HeroTitle className="uppercase text-3xl md:text-4xl">
            TERMS OF SERVICE
          </HeroTitle>

          <HeroText className="text-slate-400">
            Last Updated: October 24, 2023
          </HeroText>
        </div>

        {/* SECTIONS */}
        <div className="space-y-12">
          {termsSections.map((section) => (
            <TermsBlock key={section.id} {...section} />
          ))}
        </div>

        {/* CTA */}
        <LegalCTA />
      </div>
    </section>
  );
}


