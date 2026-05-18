"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { SpecialistActions } from "./specialist-card/SpecialistActions";
import { SpecialistHeader } from "./specialist-card/SpecialistHeader";
import { SpecialistStats } from "./specialist-card/SpecialistStats";
import { SpecialistTags } from "./specialist-card/SpecialistTags";
import type { SpecialistCardProps } from "@/types/component-props";

export default function SpecialistCard({
  name,
  role,
  rating,
  reviews,
  location,
  tags,
  experience,
  price,
  avatarColor = "#F472B6",
  avatarImage,
  portfolioLink,
  selectLink,
  available = true,
}: SpecialistCardProps) {
  return (
    <div className="w-full bg-[#0F172A] rounded-xl border border-white/20 p-4 sm:p-5 md:p-6 font-hk flex flex-col gap-5 md:gap-6 relative">
      <SpecialistHeader
        name={name}
        role={role}
        rating={rating}
        reviews={reviews}
        avatarColor={avatarColor}
        avatarImage={avatarImage}
      />

      <div className="flex items-center gap-2 text-stone-300 text-xs">
        <FaMapMarkerAlt size={12} />
        {location || "Location not specified"}
      </div>

      <SpecialistTags tags={tags} />

      <div className="border-t border-stone-500/40" />

      <SpecialistStats experience={experience} price={price} />

      <SpecialistActions
        available={available}
        portfolioLink={portfolioLink}
        selectLink={selectLink}
      />

      <div className="h-10" />
    </div>
  );
}
