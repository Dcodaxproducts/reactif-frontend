import { HeroTitle } from "@/components/common/HeroUi";

export function HelpHeroTitle() {
  return (
    <HeroTitle className="uppercase leading-tight">
      <span className="text-white">How can we </span>
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        help you?
      </span>
    </HeroTitle>
  );
}
