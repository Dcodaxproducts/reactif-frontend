import { HeroText, HeroTitle } from "@/components/hero/hero-ui";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  return (
    <div className="space-y-4 md:space-y-3 text-center md:text-left">
      <HeroBadge />

      <HeroTitle>
        TRANSFORM YOUR
        <br />
        VEHICLES INTO
        <br />
        ADVERTISING TOOLS
      </HeroTitle>

      <HeroText className="max-w-xl mx-auto md:mx-0">
        Leader In Visual Communication For The Automotive Sector. Vehicle
        Wrapping, Marking, And Advertising With Uncompromising Professional
        Quality.
      </HeroText>

      <HeroActions />
    </div>
  );
}
