import type { CSSProperties, ReactNode } from "react";

import { PageShell } from "@/components/common/PageShell";

type OrderPageShellProps = {
  children: ReactNode;
  backgroundStyle?: CSSProperties;
};

export default function OrderPageShell({
  children,
  backgroundStyle,
}: OrderPageShellProps) {
  return <PageShell backgroundStyle={backgroundStyle}>{children}</PageShell>;
}
