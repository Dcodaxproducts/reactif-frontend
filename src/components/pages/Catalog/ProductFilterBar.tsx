"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [
  "All Products",
  "Vehicle Wraps",
  "Signage",
  "Apparel",
  "Accessories",
];

export default function ProductFilterBar() {
  const [active, setActive] = useState("All Products");

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4 rounded-xl border border-white/10 bg-stone-950/90 backdrop-blur-md">
        <div className="flex-1 w-full relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            type="text"
            placeholder="Search products, wraps, or apparel..."
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white/5 text-white text-sm placeholder:text-slate-500 focus:outline-none border-0 h-auto"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end">
          {categories.map((item) => (
            <Button
              key={item}
              onClick={() => setActive(item)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition h-auto",
                active === item
                  ? "text-white shadow-[0px_0px_40px_rgba(212,48,119,0.6)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10",
              )}
              style={
                active === item
                  ? {
                      background:
                        "conic-gradient(from 96deg at 62.65% 113.44%, #5FC5FF 0deg, #FFAC89 135deg, #8155FF 213deg, #789DFF 286deg, #9F73F1 357deg)",
                    }
                  : {}
              }
            >
              {item}
            </Button>
          ))}

          <Button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 transition text-sm h-auto">
            <SlidersHorizontal size={16} />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
