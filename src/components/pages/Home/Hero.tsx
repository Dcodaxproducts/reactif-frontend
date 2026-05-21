"use client";

import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative flex w-full min-h-[calc(100svh-110px)] flex-col overflow-hidden xl:min-h-[720px] 2xl:min-h-[780px]">
      <Container
        className="grid w-[95%] max-w-none grid-cols-1 items-start gap-6 px-4 pt-1 pb-8 md:px-6 md:pt-2 md:pb-10 lg:min-h-[calc(100svh-145px)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)] lg:gap-5 lg:pt-0 lg:pb-6 xl:min-h-[700px] xl:gap-8 2xl:min-h-[760px]"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
