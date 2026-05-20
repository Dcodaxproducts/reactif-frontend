import { Button } from "@/components/ui/button";
import type { LoadMoreButtonProps } from "@/types/component-props";

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-14">
      <Button
        onClick={onClick}
        variant="brandGlow"
        className="px-10 hover:scale-105 transition-transform duration-300 hover:opacity-100"
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
