"use client";

import React from "react";
import { Shield } from "lucide-react";
import { FiCheckCircle } from "react-icons/fi";
import { usePathname } from "next/navigation";

const WhyProtection = () => {
  const pathname = usePathname();

  // Check if the current route is "/portfolio-details"
  const isPortfolioDetailsPage = pathname === "/portfolio-details";

  return (
    <div
      className={`w-full max-w-6xl flex flex-col md:flex-row gap-10 p-10 rounded-3xl outline outline-1 outline-offset-[-1px] ${
        !isPortfolioDetailsPage
          ? "bg-neutral-800/80 outline-neutral-50/30"
          : "border-none outline-none" // Don't show border and background if it's /portfolio-details
      }`}
    >
      {/* Car Image */}
      <img
        className="w-full md:w-96 h-72 object-contain md:object-cover rounded-xl"
        src="/assets/car.png"
        alt="Car Protection"
      />

      {/* Protection Details */}
      <div className="flex-1 p-6 rounded-3xl outline outline-1 outline-offset-[-1px] outline-slate-700 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <h2 className="text-neutral-50 text-base md:text-lg font-bold font-['HK_Grotesk']">
            Why this protection?
          </h2>
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-sm md:text-base font-medium font-['HK_Grotesk']">
          The &apos;Bloc Avant&apos; package offers essential protection for the most
          vulnerable areas of your vehicle. It covers the entire hood, front bumper,
          front fenders, and side mirrors with our premium Paint Protection Film.
        </p>

        {/* Features List */}
        <div className="flex flex-col gap-3">
          <FeatureItem
            title="Stone Chip Resistance"
            description="Absorbs impacts from gravel and road debris."
          />
          <FeatureItem
            title="UV Protection"
            description="Prevents discoloration and fading from sun exposure."
          />
          <FeatureItem
            title="Scratch Resistance"
            description="Protects your vehicle from light scratches and scuffs."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyProtection;

/* ================= Reusable Feature Item ================= */

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 h-14 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-50/10 px-3">
      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      <div className="flex flex-col justify-center">
        <span className="text-stone-300 text-sm font-bold font-['HK_Grotesk']">{title}</span>
        <span className="text-stone-500 text-xs font-medium font-['HK_Grotesk']">{description}</span>
      </div>
    </div>
  );
}