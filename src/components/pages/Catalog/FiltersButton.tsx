import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FiltersButton() {
  return (
    <Button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 transition text-sm h-auto">
      <SlidersHorizontal size={16} />
      Filters
    </Button>
  );
}
