import { Button } from "@/components/ui/button";
import type { PopularHelpLinkProps } from "@/types/component-props";

export function PopularHelpLink({ label }: PopularHelpLinkProps) {
  return (
    <Button
      variant="ghost"
      className="text-white/80 hover:text-white transition h-auto w-auto p-0 bg-transparent hover:bg-transparent text-sm font-normal"
    >
      {label}
    </Button>
  );
}
