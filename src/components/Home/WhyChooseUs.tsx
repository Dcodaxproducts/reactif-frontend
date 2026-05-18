"use client";

import Image from "next/image";
import { WhyCardsGrid } from "./why-choose-us/WhyCardsGrid";
import { WhyChooseUsHeader } from "./why-choose-us/WhyChooseUsHeader";

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        className="object-cover -z-10"
      />

      <div className="mx-auto px-4 sm:px-6 md:px-30">
        <WhyChooseUsHeader />
        <WhyCardsGrid />
      </div>
    </section>
  );
}
