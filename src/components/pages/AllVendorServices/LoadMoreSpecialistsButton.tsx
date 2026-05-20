import { Button } from "@/components/ui/button";
import type { LoadMoreSpecialistsButtonProps } from "@/types/component-props";

export default function LoadMoreSpecialistsButton({
  loading,
  onLoadMore,
}: LoadMoreSpecialistsButtonProps) {
  return (
    <div className="flex justify-center mt-12">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        variant="brandSolid"
        className="px-6 py-3 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
