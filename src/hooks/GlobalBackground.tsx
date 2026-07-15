"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type GlobalBackgroundProps = {
  imageUrl?: string;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
};

export default function GlobalBackground({
  imageUrl,
  overlayColor = "#010304",
  className,
  style,
}: GlobalBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat",
        className,
      )}
      style={{
        backgroundImage: imageUrl ? `url('${imageUrl}')` : undefined,
        backgroundColor: overlayColor,
        ...style,
      }}
    />
  );
}
