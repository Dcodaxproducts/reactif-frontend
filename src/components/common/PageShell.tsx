import type { CSSProperties, ReactNode } from "react";

import GlobalBackground from "@/hooks/GlobalBackground";

type PageShellProps = {
  children: ReactNode;
  backgroundStyle?: CSSProperties;
  background?: ReactNode;
};

export function PageShell({
  children,
  backgroundStyle,
  background,
}: PageShellProps) {
  return (
    <section className="relative overflow-hidden">
      {background ?? <GlobalBackground style={backgroundStyle} />}
      {children}
    </section>
  );
}
