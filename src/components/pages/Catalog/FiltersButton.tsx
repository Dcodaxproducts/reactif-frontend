import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function FiltersButton() {
  const { t } = useAppTranslation();

  return (
    <Button variant="darkPill" className="flex items-center gap-2 px-4 py-2 transition text-sm h-auto">
      <SlidersHorizontal size={16} />
      {t("catalog.filters.button")}
    </Button>
  );
}
