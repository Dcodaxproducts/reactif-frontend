"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildLoginRoute, useAuth } from "@/hooks/useAuth";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { cn } from "@/lib/utils";

type ServiceBookNowButtonProps = {
  href: string;
  serviceName: string;
  className?: string;
  label?: string;
  showIcon?: boolean;
};

export function ServiceBookNowButton({
  href,
  serviceName,
  className,
  label,
  showIcon = true,
}: ServiceBookNowButtonProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t } = useAppTranslation();

  const handleClick = () => {
    if (!user) {
      router.push(buildLoginRoute(href));
      return;
    }

    router.push(href);
  };

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={handleClick}
      aria-label={t("serviceActions.bookNowFor", { title: serviceName })}
      className={cn(
        "h-11 rounded-full bg-white px-4 text-zinc-900 hover:bg-white/90",
        className,
      )}
    >
      {label ?? t("serviceActions.bookNow")}
      {showIcon ? <ArrowRight className="h-4 w-4" /> : null}
    </Button>
  );
}
