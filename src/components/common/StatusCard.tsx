import type { ReactNode } from "react";
import {
  AlertTriangle,
  Inbox,
  Loader2,
  SearchX,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type StatusCardTone = "error" | "empty" | "loading" | "neutral";

type StatusCardProps = {
  tone?: StatusCardTone;
  label?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

const toneStyles: Record<
  StatusCardTone,
  {
    card: string;
    icon: string;
    label: string;
  }
> = {
  error: {
    card: "border-amber-200/15 bg-[linear-gradient(145deg,rgba(20,20,24,0.96),rgba(11,18,28,0.92))]",
    icon: "border-amber-200/20 bg-amber-200/10 text-amber-200",
    label: "text-amber-100/80",
  },
  empty: {
    card: "border-white/10 bg-[linear-gradient(145deg,rgba(20,20,24,0.96),rgba(10,15,24,0.92))]",
    icon: "border-cyan-200/20 bg-cyan-200/10 text-cyan-200",
    label: "text-cyan-100/80",
  },
  loading: {
    card: "border-white/10 bg-[linear-gradient(145deg,rgba(20,20,24,0.96),rgba(10,15,24,0.92))]",
    icon: "border-white/15 bg-white/10 text-white",
    label: "text-white/65",
  },
  neutral: {
    card: "border-white/10 bg-[linear-gradient(145deg,rgba(20,20,24,0.96),rgba(10,15,24,0.92))]",
    icon: "border-pink-200/20 bg-pink-200/10 text-pink-200",
    label: "text-pink-100/80",
  },
};

const defaultIcons: Record<StatusCardTone, LucideIcon> = {
  error: AlertTriangle,
  empty: SearchX,
  loading: Loader2,
  neutral: Inbox,
};

export function StatusCard({
  tone = "neutral",
  label,
  title,
  description,
  action,
  icon,
  className,
}: StatusCardProps) {
  const Icon = icon ?? defaultIcons[tone];
  const styles = toneStyles[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8 md:p-10",
        styles.card,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div
        className={cn(
          "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border",
          styles.icon,
        )}
      >
        <Icon
          className={cn("h-6 w-6", tone === "loading" && "animate-spin")}
          aria-hidden="true"
        />
      </div>
      {label ? (
        <p
          className={cn(
            "mt-5 text-xs font-semibold uppercase tracking-[0.22em]",
            styles.label,
          )}
        >
          {label}
        </p>
      ) : null}
      <h2 className="mt-3 text-xl font-semibold text-white md:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
