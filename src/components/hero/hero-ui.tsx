"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // if you have it (shadcn). If not, tell me.

// ================= TITLE =================
export function HeroTitle({
  children,
  className,
}: {
  children: React.ReactNode;
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
          "linear-gradient(90deg, #FAFAFA 0%, #5FC5FF 81.25%, #9F73F1 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: "1.2",
      }}
    >
      {children}
    </h1>
  );
}

// ================= TEXT =================
export function HeroText({
  children,
  className,
}: {
  children: React.ReactNode;
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

// ================= PRIMARY BUTTON =================
export function PrimaryButton({
  children,
  href,
  className,
  showIcon = true,
}: {
  children: React.ReactNode;
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
