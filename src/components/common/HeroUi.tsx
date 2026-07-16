"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-mulish text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
        className,
      )}
      style={{
        background:
          "linear-gradient(92deg, #FFFFFF 0%, #FFFFFF 34%, #F262B5 56%, #9F73F1 76%, #5FC5FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </h1>
  );
}

export function HeroText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[#F5F5F5] text-sm sm:text-base md:text-lg leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PrimaryButton({
  children,
  href,
  className,
  showIcon = true,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Button asChild variant="brandGlow" className={cn("font-sans", className)}>
      <Link href={href}>
        {children}
        {showIcon && <ArrowRight size={18} />}
      </Link>
    </Button>
  );
}
