import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  return (
    <div className="space-y-4 md:space-y-4 xl:space-y-5 text-center md:text-left md:max-w-[620px] xl:max-w-[680px]">
      <HeroBadge />

      <HeroTitle className="xl:text-[68px] 2xl:text-[76px]">
        TRANSFORM YOUR
        <br />
        VEHICLES INTO
        <br />
        ADVERTISING TOOLS
      </HeroTitle>

      <HeroText className="max-w-xl xl:max-w-2xl mx-auto md:mx-0 xl:text-xl">
        Leader In Visual Communication For The Automotive Sector. Vehicle
        Wrapping, Marking, And Advertising With Uncompromising Professional
        Quality.
      </HeroText>

      <HeroActions />
    </div>
  );
}
