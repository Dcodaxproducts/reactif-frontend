import { FiCheckCircle } from "react-icons/fi";
import type { SpecItemData } from "@/types/component-props";

export function SpecItem({ label, value, iconColorClass }: SpecItemData) {
  return (
    <div className="p-3 bg-zinc-900 rounded-lg border border-neutral-50/10 flex gap-2">
      <FiCheckCircle size={16} className={iconColorClass} />
      <div>
        <p className="text-neutral-50/60 text-xs font-medium font-hk">
          {label}
        </p>
        <p className="text-neutral-50 text-sm font-semibold font-hk">{value}</p>
      </div>
    </div>
  );
}
