"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ArrowRight } from "lucide-react";  // Import the right arrow icon

export default function Configuration({
  buttonText = "Process To Pay", // Default button text
  backgroundColor = "bg-pink-400", // Default background color
  textColor = "text-white", // Default text color
  basePrice = 123.00,  // Base Price (Dynamic)
  finalPrice = 150.00,  // Final Price (Dynamic)
  basePriceText = "Gtechhalo",  // Dynamic base price text
  finalPriceText = "Gtechhalo",  // Dynamic final price text
  basePriceColor = "text-pink-400",  // Base Price Text Color
  finalPriceColor = "text-pink-400",  // Final Price Text Color
  route, // Optional route for navigation
}: {
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  basePrice?: number;
  finalPrice?: number;
  basePriceText?: string;
  finalPriceText?: string;
  basePriceColor?: string; // Optional color for the base price text
  finalPriceColor?: string; // Optional color for the final price text
  route?: string; // Optional route for button navigation
}) {
  const router = useRouter(); // Initialize the router

  const handleButtonClick = () => {
    if (route) {
      router.push(route); // Navigate to the provided route if it's passed
    }
  };

  return (
    <Card className="w-full max-w-6xl bg-neutral-800/80 border border-neutral-50/30 rounded-3xl backdrop-blur-sm py-0">
      <CardContent className="p-6 md:p-10 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold font-hk">Configuration</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-base font-semibold font-hk">4.9</span>
            <span className="text-stone-300 text-xs font-medium font-hk">(128)</span>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col md:flex-row gap-6">
          <OptionGroup title="FILM FINISH" options={["Gloss (Standard)", "Matte / Steel"]} />
          <OptionGroup title="CERAMIC COATING" options={["None", "Gtechhalo (2 layers)"]} />
        </div>

        <Divider />

        {/* Base Price Section with Dynamic Data */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-stone-300 text-xs font-medium font-hk">Base Price</span>
            <span className={`${basePriceColor} text-base font-medium font-hk`}>{basePriceText}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-stone-300 text-xs font-medium font-hk">${basePrice.toFixed(2)}</span>
            <span className={`${finalPriceColor} text-base font-semibold font-hk`}>
              ${finalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <Divider />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">Total Estimated</span>
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">
            ${(basePrice + finalPrice).toFixed(2)}
          </span>
        </div>

        {/* Button with Right Arrow */}
        <Button
          className={`w-full h-10 ${backgroundColor} hover:bg-white hover:text-black font-semibold font-hk py-3 rounded-lg text-base md:text-lg shadow-[0px_4px_10px_rgba(210,40,119,0.25)] flex items-center justify-center gap-2`}
          onClick={handleButtonClick} // Call handleButtonClick when button is clicked
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Footer */}
        <p className="text-stone-500 text-xs font-bold font-hk text-center">
          No payment required now. The vendor will contact you to confirm details.
        </p>
      </CardContent>
    </Card>
  );
}

function OptionGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-stone-300 text-xs font-medium font-hk uppercase">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <div
            key={opt}
            className="px-5 py-2 rounded border border-stone-500 text-stone-300 text-base font-medium font-hk hover:bg-neutral-700 cursor-pointer transition"
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-stone-500" />;
}