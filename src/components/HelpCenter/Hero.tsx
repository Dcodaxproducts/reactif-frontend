"use client";

import { Search } from "lucide-react";
import { HeroTitle } from "@/components/hero/hero-ui";

export default function Hero() {
  return (
    <section className="relative w-full flex justify-center px-4 pt-20 md:pt-28 overflow-hidden pb-10">

     
      {/* CONTENT */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 z-10">

        {/* SUPPORT BADGE */}
        <div className="px-4 py-1 rounded-full border border-purple-500/30 text-purple-400 text-xs tracking-widest uppercase">
          Support Center
        </div>

        {/* TITLE */}
        <HeroTitle className="uppercase leading-tight">
          <span className="text-white">How can we </span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            help you?
          </span>
        </HeroTitle>

        {/* SEARCH BAR */}
        <div className="w-full relative">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" style={{zIndex:'999'}}
          />

          <input
            type="text"
            placeholder="Search for answers (e.g., 'How to track my order?')"
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 backdrop-blur-md"
          />

        </div>

        {/* POPULAR LINKS */}
        <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap justify-center">

          <span className="text-slate-500">Popular:</span>

          {["Shipping rates", "Vinyl care", "Bulk discounts"].map((item) => (
            <button
              key={item}
              className="text-white/80 hover:text-white transition"
            >
              {item}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}