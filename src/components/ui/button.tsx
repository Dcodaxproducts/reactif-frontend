import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        authGradient:
          "w-full bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 text-white text-base sm:text-lg font-semibold hover:opacity-90 py-3",
        brandGlow:
          "rounded-full px-6 md:px-8 py-3 text-white font-medium bg-[conic-gradient(from_98deg_at_62.65%_113.44%,#5FC5FF_0deg,#FFAC89_135deg,#8155FF_213deg,#789DFF_286deg,#9F73F1_357deg)] shadow-[0px_0px_80px_#D43077]",
        whitePill:
          "rounded-full bg-white text-black font-medium hover:bg-white/90",
        whiteGlow:
          "rounded-full bg-white text-black font-bold hover:bg-white/90 shadow-[0px_0px_85px_0px_#FFFFFF]",
        darkPill:
          "rounded-full bg-white/5 text-slate-300 hover:bg-white/10",
        brandSolid:
          "rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700",
        neutralOutline:
          "rounded-lg border border-neutral-50/30 bg-transparent text-neutral-50 font-semibold hover:bg-neutral-50/10",
        navDark:
          "rounded-full bg-neutral-800 text-[#E2E2E2] hover:bg-neutral-700",
        navOutline:
          "rounded-full border border-white bg-transparent text-white hover:bg-white/10",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#E6E7EC] h-[44px] px-[20px] rounded-xl text-[#767676] bg-white text-base font-semibold hover:bg-gray-50",
        primary:
          "px-[24px] bg-primary hover:bg-primary/90 text-white h-[44px] rounded-[12px] text-base font-semibold",
        ghost:
          "text-[24px] w-[168px] h-[62px] font-semibold text-dark hover:bg-transparent",
        link: "text-primary underline underline-offset-4",
      },
      size: {
        default: "",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
