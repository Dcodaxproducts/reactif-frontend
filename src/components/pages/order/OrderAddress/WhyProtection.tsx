"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

import { protectionFeatures } from "@/data/order";
import { FeatureItem } from "./FeatureItem";

const WhyProtection = () => {
  const pathname = usePathname();
  const isPortfolioDetailsPage = pathname === "/portfolio-details";

  return (
    <div
      className={`w-full max-w-6xl flex flex-col md:flex-row gap-10 p-10 rounded-3xl outline outline-1 outline-offset-[-1px] ${
        !isPortfolioDetailsPage
          ? "bg-neutral-800/80 outline-neutral-50/30"
          : "border-none outline-none"
      }`}
    >
      <div className="relative w-full md:w-96 h-72 rounded-xl overflow-hidden">
        <Image
          src="/assets/car.png"
          alt="Car Protection"
          fill
          sizes="(min-width: 768px) 384px, 100vw"
          className="object-contain md:object-cover"
        />
      </div>

      <div className="flex-1 p-6 rounded-3xl outline outline-1 outline-offset-[-1px] outline-slate-700 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <h2 className="text-neutral-50 text-base md:text-lg font-bold font-['HK_Grotesk']">
            Why this protection?
          </h2>
        </div>

        <p className="text-neutral-400 text-sm md:text-base font-medium font-['HK_Grotesk']">
          The &apos;Bloc Avant&apos; package offers essential protection for the
          most vulnerable areas of your vehicle. It covers the entire hood,
          front bumper, front fenders, and side mirrors with our premium Paint
          Protection Film.
        </p>

        <div className="flex flex-col gap-3">
          {protectionFeatures.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyProtection;
