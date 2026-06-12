import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 h-[52px] text-base shadow-xs transition-[border-color,box-shadow,color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-cyan-200/70 focus-visible:ring-2 focus-visible:ring-cyan-200/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-rose-300/70 aria-invalid:focus-visible:border-rose-300/80 aria-invalid:focus-visible:ring-rose-300/15",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
