import type { ReactNode } from "react";

import GlobalBackground from "@/hooks/GlobalBackground";

type OrderPageShellProps = {
  children: ReactNode;
  backgroundStyle?: React.CSSProperties;
};

export default function OrderPageShell({
  children,
  backgroundStyle,
}: OrderPageShellProps) {
  return (
    <section className="relative overflow-hidden">
      <GlobalBackground style={backgroundStyle} />
      {children}
    </section>
  );
}
