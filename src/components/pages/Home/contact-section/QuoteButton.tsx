import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuoteButtonProps } from "@/types/component-props";

export function QuoteButton({ loading, onRequestQuote }: QuoteButtonProps) {
  return (
    <Button
      asChild
      className="px-5 md:px-6 py-2.5 md:py-3 text-[14px] md:text-[15px] rounded-full font-medium bg-white text-black font-sans flex items-center gap-2 transition-all duration-300 hover:opacity-90 hover:bg-white"
      style={{ boxShadow: "0px 0px 85px 0px #FFFFFF" }}
    >
      <Link href="/all-vendor-services" onClick={onRequestQuote}>
        {loading ? (
          "Requesting..."
        ) : (
          <>
            Request a Free Quote
            <ArrowRight size={18} />
          </>
        )}
      </Link>
    </Button>
  );
}
