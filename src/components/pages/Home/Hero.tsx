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
        className="grid w-[95%] max-w-none grid-cols-1 items-center gap-8 pt-8 pb-10 md:pt-10 md:pb-12 lg:min-h-[calc(100svh-140px)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)] lg:gap-6 lg:pt-6 lg:pb-8 xl:min-h-[700px] xl:gap-8 2xl:min-h-[760px]"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
