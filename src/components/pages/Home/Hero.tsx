"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-96px)] xl:min-h-[760px] 2xl:min-h-[820px] flex items-center flex-col overflow-hidden">
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
        className="pt-10 md:pt-15 xl:pt-20 pb-10 md:pb-15 xl:pb-20 grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] gap-10 md:gap-12 xl:gap-16 2xl:gap-20 items-center"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
