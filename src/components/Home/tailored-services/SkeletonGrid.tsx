import { SkeletonCard } from "./SkeletonCard";

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {[...Array(4)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
