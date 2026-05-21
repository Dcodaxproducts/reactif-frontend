import { SkeletonCard } from "./SkeletonCard";

const skeletonCardKeys = [
  "tailored-service-skeleton-1",
  "tailored-service-skeleton-2",
  "tailored-service-skeleton-3",
  "tailored-service-skeleton-4",
];

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {skeletonCardKeys.map((key) => (
        <SkeletonCard key={key} />
      ))}
    </div>
  );
}
