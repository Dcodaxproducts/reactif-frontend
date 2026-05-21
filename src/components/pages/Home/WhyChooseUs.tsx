"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { WhyCardsGrid } from "./why-choose-us/WhyCardsGrid";
import { WhyChooseUsHeader } from "./why-choose-us/WhyChooseUsHeader";

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      <Image
        src="/assets/hero/gradient.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />

      <Container gutter="page">
        <WhyChooseUsHeader />
        <WhyCardsGrid />
      </Container>
    </section>
  );
}
