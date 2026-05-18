import { Shield } from "lucide-react";

export function BookingCardHeader({
  activeCategory,
}: {
  activeCategory: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <Shield className="w-5 h-5 text-neutral-50" />
      <div className="text-neutral-50 text-lg font-bold font-hk">
        {activeCategory || "Service Details"}
      </div>
    </div>
  );
}
