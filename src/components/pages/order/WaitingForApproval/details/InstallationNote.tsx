import { Info } from "lucide-react";
import { installationNote } from "@/data/order";

export function InstallationNote() {
  return (
    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
      <div className="flex gap-2">
        <Info className="w-4 h-4 text-amber-800 mt-0.5" />
        <div>
          <p className="text-amber-800 text-xs font-semibold font-hk">
            {installationNote.title}
          </p>
          <p className="text-amber-800 text-xs font-medium font-hk">
            {installationNote.description}
          </p>
        </div>
      </div>
    </div>
  );
}
