import { popularHelpLinks } from "@/data/help-center";
import { PopularHelpLink } from "./PopularHelpLink";

export function PopularHelpLinks() {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap justify-center">
      <span className="text-slate-500">Popular:</span>
      {popularHelpLinks.map((item) => (
        <PopularHelpLink key={item} label={item} />
      ))}
    </div>
  );
}
