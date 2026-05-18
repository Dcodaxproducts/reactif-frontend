"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        className
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
        className
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
    <Link
      href={href}
      className={cn(
        "font-sans px-6 md:px-8 py-3 rounded-full text-white font-medium flex items-center gap-2 relative",
        className
      )}
      style={{
        background:
          "conic-gradient(from 98deg at 62.65% 113.44%, #5FC5FF 0deg, #FFAC89 135deg, #8155FF 213deg, #789DFF 286deg, #9F73F1 357deg)",
        boxShadow: "0px 0px 80px #D43077",
      }}
    >
      {children}
      {showIcon && <ArrowRight size={18} />}
    </Link>
  );
}