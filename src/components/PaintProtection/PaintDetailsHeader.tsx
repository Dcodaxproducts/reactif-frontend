"use client";

import { MapPin, Star, Circle } from "lucide-react";
import { RxStarFilled } from "react-icons/rx";

interface Props {
  name: string;
  status: number;
}


export default function PaintDetailsHeader({ name, status }: Props) {
  return (
    <div className="flex flex-col gap-14 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1 w-80">
          {/* Title */}
          <h2 className="text-3xl font-bold text-neutral-50 font-['Inter'] capitalize">
            {name}
          </h2>

          {/* Details */}
          <div className="flex items-center gap-3">
            {/* Location */}
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-300" />
              <span className="text-stone-300 text-xs font-medium capitalize">
                Geneva, CH
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <RxStarFilled className="w-3 h-3 text-yellow-400" />
              <span className="text-neutral-50 text-xs font-medium">4.9</span>
              <span className="text-stone-300 text-xs font-medium">
                (127 Reviews)
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-1">
              <Circle className="w-3 h-3 text-stone-400" />
              <span className="text-emerald-500 text-xs font-medium capitalize">
                {status === 1 ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
