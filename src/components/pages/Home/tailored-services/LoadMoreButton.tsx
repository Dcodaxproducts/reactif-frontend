import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { LoadMoreButtonProps } from "@/types/component-props";

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
  const { t } = useAppTranslation();

  return (
    <div className="flex justify-center mt-14">
      <Button
        onClick={onClick}
        variant="brandGlow"
        className="px-10 hover:scale-105 transition-transform duration-300 hover:opacity-100"
      >
        {loading ? t("common.loading") : t("home.tailored.loadMore")}
      </Button>
    </div>
  );
}
