import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FiltersButton() {
  return (
    <Button variant="darkPill" className="flex items-center gap-2 px-4 py-2 transition text-sm h-auto">
      <SlidersHorizontal size={16} />
      Filters
    </Button>
  );
}
