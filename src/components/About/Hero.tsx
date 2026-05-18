"use client";

import { HeroTitle, HeroText, PrimaryButton } from "@/components/hero/hero-ui";

export default function Hero() {
  return (
    <section className="w-full flex justify-center px-4 py-16 md:py-24">
      
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-6">

        {/* TITLE */}
        <HeroTitle className="uppercase max-w-[100%]">
          DRIVING EXCELLENCE IN VISUAL <br />
          COMMUNICATION
        </HeroTitle>

        {/* DESCRIPTION */}
        <HeroText className="max-w-2xl text-neutral-100 text-base md:text-lg font-medium capitalize">
          Revolutionizing automotive aesthetics with high-impact
          precision and neon-infused creativity.
        </HeroText>

        {/* BUTTON */}
        <div className="pt-4">
          <PrimaryButton
            href="/portfolio"
            className="px-8 py-3 text-sm md:text-base font-bold tracking-wide"
            showIcon={false}
          >
            EXPLORE OUR WORK
          </PrimaryButton>
        </div>

      </div>

    </section>
  );
}