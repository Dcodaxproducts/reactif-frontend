"use client";

import { HeroTitle, HeroText } from "@/components/hero/hero-ui";

export default function Hero() {
  return (
    <section className="w-full flex justify-center px-4 py-16 md:py-24">
      
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-6">

        {/* TITLE */}
        <HeroTitle className="uppercase max-w-[100%]">
           High-Impact Visual Design
        </HeroTitle>

        {/* DESCRIPTION */}
        <HeroText className="max-w-2xl text-neutral-100 text-base md:text-lg font-medium capitalize">
         Elevate your brand with our professional automotive wraps,
custom signage, and premium apparel solutions.
        </HeroText>

     

      </div>

    </section>
  );
}