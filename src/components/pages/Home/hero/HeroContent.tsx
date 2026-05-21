import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  return (
    <div className="space-y-3 pt-0 text-center md:max-w-[680px] md:text-left xl:max-w-[740px] lg:self-start">
      <HeroBadge />

      <HeroTitle className="text-[clamp(2.65rem,6vw,5.75rem)] leading-[0.98] tracking-[-0.04em]">
        <span className="block whitespace-nowrap">TRANSFORM YOUR</span>
        <span className="block whitespace-nowrap">VEHICLES INTO</span>
        <span className="block whitespace-nowrap">ADVERTISING TOOLS</span>
      </HeroTitle>

      <HeroText className="mx-auto max-w-xl text-balance md:mx-0 xl:max-w-2xl xl:text-[18px]">
        Leader In Visual Communication For The Automotive Sector. Vehicle
        Wrapping, Marking, And Advertising With Uncompromising Professional
        Quality.
      </HeroText>

      <HeroActions />
    </div>
  );
}
