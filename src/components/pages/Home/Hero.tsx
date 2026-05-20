"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center flex-col overflow-hidden">
      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      <Container
        gutter="hero"
        className="pt-10 md:pt-15 pb-10 md:pb-15 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center md:items-start"
      >
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
