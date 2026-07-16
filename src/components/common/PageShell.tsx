import type { CSSProperties, ReactNode } from "react";

import { GlobalBackground } from "@/hooks/GlobalBackground";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  backgroundStyle?: CSSProperties;
  background?: ReactNode;
  className?: string;
};

export function PageShell({
  children,
  backgroundStyle,
  background,
  className,
}: PageShellProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {background ?? <GlobalBackground style={backgroundStyle} />}
      {children}
    </section>
  );
}
