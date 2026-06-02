import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { PopularHelpLinkProps } from "@/types/component-props";

export function PopularHelpLink({ label, labelKey }: PopularHelpLinkProps) {
  const { t } = useAppTranslation();

  return (
    <Button
      variant="ghost"
      className="text-white/80 hover:text-white transition h-auto w-auto p-0 bg-transparent hover:bg-transparent text-sm font-normal"
    >
      {labelKey ? t(labelKey) : label}
    </Button>
  );
}
