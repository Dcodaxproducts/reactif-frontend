import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  return (
    <div className="space-y-5 text-center md:text-left md:max-w-[700px] xl:max-w-[760px]">
      <HeroBadge />

      <HeroTitle className="text-[clamp(3.2rem,7vw,6.25rem)] leading-[0.95] tracking-[-0.04em]">
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
