import { Button } from "@/components/ui/button";
import type { CatalogCategoryButtonProps } from "@/types/component-props";
import { cn } from "@/lib/utils";

export default function CatalogCategoryButton({
  category,
  label,
  active,
  onSelect,
}: CatalogCategoryButtonProps) {
  return (
    <Button
      onClick={() => onSelect(category)}
      className={cn(
        "px-4 py-2 rounded-full text-sm transition h-auto",
        active
          ? "text-white shadow-[0px_0px_40px_rgba(212,48,119,0.6)]"
          : "bg-white/5 text-slate-300 hover:bg-white/10",
      )}
      style={
        active
          ? {
              background:
                "conic-gradient(from 96deg at 62.65% 113.44%, #5FC5FF 0deg, #FFAC89 135deg, #8155FF 213deg, #789DFF 286deg, #9F73F1 357deg)",
            }
          : {}
      }
    >
      {label ?? category}
    </Button>
  );
}
