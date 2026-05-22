import type { ReactNode } from "react";

export function ServiceEmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-6 rounded-xl bg-neutral-900/40 border border-slate-800 text-center text-neutral-400 text-sm">
      {children}
    </div>
  );
}
