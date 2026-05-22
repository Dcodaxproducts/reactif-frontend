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
  imageUrl = "/assets/AllVendorServices/background.png",
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
        backgroundImage: `url('${imageUrl}')`,
        backgroundColor: overlayColor,
        ...style,
      }}
    />
  );
}
