import type { ReactNode } from "react";

import Navbar from "@/components/layout/navbar/navbar";
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
      <Navbar />
      <GlobalBackground style={backgroundStyle} />
      {children}
    </section>
  );
}
