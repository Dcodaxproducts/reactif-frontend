import type { SpecialistListStatusProps } from "@/types/component-props";

export default function SpecialistListStatus({
  loading,
  error,
  hasDesigners,
}: SpecialistListStatusProps) {
  if (loading && !hasDesigners) {
    return (
      <div className="text-center text-neutral-400 mt-10">
        Loading specialists...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 mt-10">{error}</div>;
  }

  if (!loading && !hasDesigners) {
    return (
      <div className="text-center text-neutral-400 mt-10">
        No designers available at the moment.
      </div>
    );
  }

  return null;
}
