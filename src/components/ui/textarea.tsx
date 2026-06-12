import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[border-color,box-shadow,color] outline-none focus-visible:border-cyan-200/70 focus-visible:ring-2 focus-visible:ring-cyan-200/20 aria-invalid:border-rose-300/70 aria-invalid:focus-visible:border-rose-300/80 aria-invalid:focus-visible:ring-rose-300/15 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
