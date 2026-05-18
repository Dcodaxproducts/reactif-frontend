import { vehicleDetails } from "@/data/order";
import { DetailRow } from "./DetailRow";
import { InstallationNote } from "./InstallationNote";

export function VehicleDetailsSection() {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-bold font-hk">
        Vehicle Details
      </p>
      <div className="flex flex-col gap-3">
        {vehicleDetails.map((detail) => (
          <DetailRow
            key={`${detail.left.label}-${detail.right.label}`}
            {...detail}
          />
        ))}
        <InstallationNote />
      </div>
    </div>
  );
}
