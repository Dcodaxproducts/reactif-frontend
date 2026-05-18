"use client";

import Image from "next/image";
import Navbar from "@/components/layout/navbar/navbar";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center flex-col overflow-hidden">
      <Navbar />

      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="mx-auto w-full px-4 sm:px-6 md:pl-20 md:pr-12 pt-10 md:pt-15 pb-10 md:pb-15 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center md:items-start">
        <HeroContent />
        <HeroCarImage />
      </div>
    </section>
  );
}
