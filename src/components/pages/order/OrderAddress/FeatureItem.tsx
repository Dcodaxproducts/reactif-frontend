import { FiCheckCircle } from "react-icons/fi";
import type { ProtectionFeatureData } from "@/types/component-props";

export function FeatureItem({ title, description }: ProtectionFeatureData) {
  return (
    <div className="flex items-center gap-3 h-14 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-50/10 px-3">
      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      <div className="flex flex-col justify-center">
        <span className="text-stone-300 text-sm font-bold font-['HK_Grotesk']">
          {title}
        </span>
        <span className="text-stone-500 text-xs font-medium font-['HK_Grotesk']">
          {description}
        </span>
      </div>
    </div>
  );
}
