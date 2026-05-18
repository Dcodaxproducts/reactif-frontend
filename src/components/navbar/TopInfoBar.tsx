"use client";

import { Phone, Mail } from "lucide-react";

export default function TopInfoBar() {
  return (
    <div
      className="relative w-full text-white text-xs md:text-sm overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, rgba(30,30,30,0.9) 0%, rgba(45,45,55,0.9) 50%, rgba(40,35,45,0.9) 100%)",
        borderBottom: "2px solid #515151",
      }}
    >
      {/* ===== Glow rectangles ===== */}

      {/* Blue glow */}
      <div
        className="absolute -left-40 -top-20 w-[620px] h-[220px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "#5FC5FF",
          filter: "blur(130px)",
        }}
      />

      {/* Pink glow */}
      <div
        className="absolute -right-40 -top-20 w-[620px] h-[220px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "#F262B5",
          filter: "blur(130px)",
        }}
      />

      {/* ===== Content ===== */}

      <div
        className="
          relative mx-auto
          px-4 sm:px-6 md:px-20
          py-2 md:py-0
          md:h-[40px]
          flex
          flex-col md:flex-row
          items-center
          justify-center md:justify-between
          gap-2 md:gap-0
          text-center md:text-left
        "
      >
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[#F5F5F5]">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+33 1 23 45 67 89</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>contact@company.fr</span>
          </div>
        </div>

        {/* RIGHT */}

        <p className="text-[#F5F5F5] whitespace-nowrap">
          Automotive Visual Communication Expert
        </p>
      </div>
    </div>
  );
}
