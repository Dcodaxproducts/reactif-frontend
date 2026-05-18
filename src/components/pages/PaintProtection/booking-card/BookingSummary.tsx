import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/component-props";

export function BookingSummary({
  activeCategory,
  currentService,
  isSubmitting,
  authLoading,
  onSubmit,
}: {
  activeCategory: string | null;
  currentService?: Service;
  isSubmitting: boolean;
  authLoading: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full p-4 rounded-lg outline outline-1 flex flex-col gap-2.5 bg-[#F262B5]/10 outline-[#F262B5]/10">
      <div className="text-xs font-bold font-hk text-[#F262B5]">
        Configuration Summary
      </div>

      <div className="text-neutral-50 text-xs font-bold font-hk">
        {activeCategory} — {currentService?.name || "No selection"}
      </div>

      <Button
        onClick={onSubmit}
        disabled={isSubmitting || authLoading}
        className="w-full px-4 py-3 rounded-lg flex justify-center items-center gap-2.5 cursor-pointer hover:opacity-90 transition bg-[#F262B5] hover:bg-[#F262B5]"
      >
        <div className="text-neutral-50 text-xs font-bold font-hk">
          {isSubmitting ? "Creating Booking..." : "Get Quote"}
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-50" />
      </Button>
    </div>
  );
}
