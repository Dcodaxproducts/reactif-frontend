"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative flex w-full min-h-[calc(100svh-110px)] flex-col overflow-hidden xl:min-h-[720px] 2xl:min-h-[780px]">
      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      <Container
        width="7xl"
        gutter="hero"
        className="grid grid-cols-1 items-center gap-10 pt-10 pb-12 md:pt-14 md:pb-16 lg:min-h-[calc(100svh-140px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:gap-8 lg:pt-10 lg:pb-10 xl:min-h-[720px] xl:gap-10 xl:pt-14 xl:pb-14 2xl:min-h-[780px]"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
