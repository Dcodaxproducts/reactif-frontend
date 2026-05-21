"use client";

import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden px-4 pt-0 pb-8 md:px-10 lg:min-h-[calc(100svh-145px)] xl:min-h-[700px] 2xl:min-h-[760px]">
      <Container
        className="grid w-[95%] max-w-none content-start items-start gap-5 px-0 pt-0 pb-0 md:gap-6 lg:min-h-[calc(100svh-145px)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)] lg:gap-4 xl:min-h-[700px] xl:gap-6 2xl:min-h-[760px]"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
