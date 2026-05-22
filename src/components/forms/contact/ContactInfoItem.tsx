import type { IconType } from "react-icons";

import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

export function ContactInfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-800/60 border border-pink-600 flex items-center justify-center">
        <Icon className="text-pink-500 text-sm md:text-lg" />
      </div>

      <div className="flex flex-col gap-1">
        <span className={CONTACT_LABEL_CLASS}>{label}</span>
        <span className="text-white text-sm md:text-md font-semibold">
          {value}
        </span>
      </div>
    </div>
  );
}
