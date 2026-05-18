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
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
