"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden ">
      <Image
        src="/assets/hero/gradient.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />

      <Container
        className="grid w-[90%] max-w-none grid-cols-1 items-center gap-8 pt-6 pb-10 md:pt-6 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)] lg:gap-6 lg:pt-6 lg:pb-8 xl:gap-8 "
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
