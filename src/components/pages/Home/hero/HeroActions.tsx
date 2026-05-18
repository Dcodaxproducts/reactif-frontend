import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/hero/hero-ui";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6 justify-center md:justify-start">
      <PrimaryButton href="/all-vendor-services">Free Quote</PrimaryButton>

      <Button
        asChild
        className="font-sans px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 text-white relative hover:bg-transparent"
        style={{
          background:
            "linear-gradient(#000, #000) padding-box, linear-gradient(91.06deg, #4D43ED 0.9%, #9C3CD3 49.1%, #D22877 99.19%) border-box",
          border: "1px solid transparent",
          boxShadow: "inset 0px 4px 24.9px 0px #FFFFFF40",
        }}
      >
        <Link href="/all-vendor-services">Our Projects</Link>
      </Button>
    </div>
  );
}
