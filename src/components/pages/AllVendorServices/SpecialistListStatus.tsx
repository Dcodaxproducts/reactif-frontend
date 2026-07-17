import { StatusCard } from "@/components/common/StatusCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { SpecialistListStatusProps } from "@/types/component-props";

export function SpecialistListStatus({
  loading,
  error,
  hasDesigners,
}: SpecialistListStatusProps) {
  const { t } = useAppTranslation();

  if (loading && !hasDesigners) {
    return (
      <StatusCard
        tone="loading"
        title={t("designers.loadingSpecialists")}
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  if (error) {
    return (
      <StatusCard
        tone="error"
        label={t("common.backendError")}
        title={error}
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  if (!loading && !hasDesigners) {
    return (
      <StatusCard
        tone="empty"
        label={t("common.noDataFound")}
        title={t("designers.noDesigners")}
        className="mx-auto mt-10 max-w-3xl p-6"
      />
    );
  }

  return null;
}
