import type { DetailPair } from "@/types/component-props";

export function DetailRow({ left, right }: DetailPair) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
      <div>
        <p className="text-neutral-50/60 text-xs font-medium font-hk">
          {left.label}
        </p>
        <p className="text-neutral-50 text-sm font-semibold font-hk">
          {left.value}
        </p>
      </div>
      <div>
        <p className="text-neutral-50/60 text-xs font-medium font-hk">
          {right.label}
        </p>
        <p className="text-neutral-50 text-sm font-semibold font-hk">
          {right.value}
        </p>
      </div>
    </div>
  );
}
