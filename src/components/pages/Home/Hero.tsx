"use client";

import { type PointerEvent, useRef } from "react";
import { Container } from "@/components/common/Container";
import { HeroCarImage } from "./hero/HeroCarImage";
import { HeroContent } from "./hero/HeroContent";

const resetParallax = (element: HTMLElement | null) => {
  element?.style.setProperty("--hero-parallax-x", "0px");
  element?.style.setProperty("--hero-parallax-y", "0px");
};

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 32;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;

    section.style.setProperty("--hero-parallax-x", `${x.toFixed(2)}px`);
    section.style.setProperty("--hero-parallax-y", `${y.toFixed(2)}px`);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => resetParallax(sectionRef.current)}
      className="relative flex w-full flex-col overflow-hidden bg-[#010101]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-transform duration-300"
        style={{
          transform:
            "translate3d(calc(var(--hero-parallax-x, 0px) * -0.35), calc(var(--hero-parallax-y, 0px) * -0.28), 0)",
          background:
            "radial-gradient(circle at 11% 38%, rgba(242,27,109,0.26), transparent 24%), radial-gradient(circle at 70% 30%, rgba(0,211,255,0.18), transparent 31%), radial-gradient(circle at 88% 70%, rgba(242,27,109,0.15), transparent 32%), linear-gradient(180deg, #010101 0%, #020203 52%, #010101 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f21b6d]/40 to-transparent"
      />

      <Container className="relative z-10 grid w-[92%] max-w-none grid-cols-1 items-start gap-6 pt-6 pb-12 sm:w-[90%] md:pt-7 md:pb-14 lg:min-h-[590px] lg:grid-cols-[minmax(380px,0.86fr)_minmax(560px,1.24fr)] lg:gap-0 lg:pt-2 lg:pb-8 xl:w-[91%] xl:grid-cols-[minmax(430px,0.82fr)_minmax(680px,1.28fr)]">
        <HeroContent />
        <HeroCarImage />
      </Container>
    </section>
  );
}
