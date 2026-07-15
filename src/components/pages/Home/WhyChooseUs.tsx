"use client";

import { Container } from "@/components/common/Container";
import { WhyCardsGrid } from "./why-choose-us/WhyCardsGrid";
import { WhyChooseUsHeader } from "./why-choose-us/WhyChooseUsHeader";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-28">
      <Container gutter="page">
        <WhyChooseUsHeader />
        <WhyCardsGrid />
      </Container>
    </section>
  );
}
