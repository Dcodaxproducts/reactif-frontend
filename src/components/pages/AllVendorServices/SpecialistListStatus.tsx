import { StatusCard } from "@/components/common/StatusCard";
import type { SpecialistListStatusProps } from "@/types/component-props";

export default function SpecialistListStatus({
  loading,
  error,
  hasDesigners,
}: SpecialistListStatusProps) {
  if (loading && !hasDesigners) {
    return (
      <StatusCard
        tone="loading"
        title="Loading specialists..."
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  if (error) {
    return (
      <StatusCard
        tone="error"
        label="Backend error"
        title={error}
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  if (!loading && !hasDesigners) {
    return (
      <StatusCard
        tone="empty"
        label="No data found"
        title="No designers available at the moment."
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  return null;
}
