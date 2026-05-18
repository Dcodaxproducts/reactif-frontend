import { Button } from "@/components/ui/button";
import type { LoadMoreButtonProps } from "@/types/component-props";

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-14">
      <Button
        onClick={onClick}
        className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition-transform duration-300 hover:opacity-100"
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
