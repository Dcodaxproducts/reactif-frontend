import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { LoadMoreSpecialistsButtonProps } from "@/types/component-props";

export function LoadMoreSpecialistsButton({
  loading,
  onLoadMore,
}: LoadMoreSpecialistsButtonProps) {
  const { t } = useAppTranslation();

  return (
    <div className="flex justify-center mt-12">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        variant="brandSolid"
        className="px-6 py-3 transition disabled:opacity-50"
      >
        {loading ? t("common.loading") : t("designers.loadMore")}
      </Button>
    </div>
  );
}
