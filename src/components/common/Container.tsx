import type { ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("w-full mx-auto", {
  variants: {
    width: {
      none: "",
      sm: "max-w-md",
      xl: "max-w-xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
    gutter: {
      none: "",
      page: "px-4 sm:px-6 md:px-30",
      content: "px-4 sm:px-6 lg:px-8",
      wide: "px-4 md:px-8 lg:px-20",
      hero: "px-4 sm:px-6 md:pl-20 md:pr-12",
      narrow: "px-4 sm:px-6 md:px-40",
      xl: "px-4 sm:px-6 md:px-35",
      compact: "px-8",
      management: "px-4 sm:px-6 lg:px-12",
      topbar: "px-4 sm:px-6 md:px-20",
    },
  },
  defaultVariants: {
    width: "none",
    gutter: "none",
  },
});

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & VariantProps<typeof containerVariants>;

export function Container({
  children,
  className,
  as: Component = "div",
  width,
  gutter,
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants({ width, gutter }), className)}>
      {children}
    </Component>
  );
}
