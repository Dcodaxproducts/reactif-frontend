"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Subcategory } from "@/types/categories";

export default function ServicesRow({
  subcategories,
  totalCount,
  activeCategory,
  setActiveCategory,
}: {
  subcategories: Subcategory[];
  totalCount: number;
  activeCategory: string;
  setActiveCategory: (category: string, id: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const showNavButtons = totalCount >= 9;

  return (
    <div className="relative w-full pb-9 pt-8 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 whitespace-nowrap overflow-x-auto scroll-smooth px-4 md:px-1 no-scrollbar py-1"
      >
        {subcategories?.map(({ id, name }) => {
          const isActive = activeCategory === name;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(name, id)}
              className={`flex-shrink-0 inline-flex h-11 px-5 py-2.5 rounded-lg items-center gap-2 justify-center cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-[#f262b5] text-white"
                    : "outline-1 outline-stone-500 text-stone-500 hover:bg-stone-800"
                }`}
            >
              <div
                className={`text-base font-medium font-hk ${
                  isActive ? "text-white font-bold" : "text-stone-500"
                }`}
              >
                {name}
              </div>
            </button>
          );
        })}
      </div>

      {showNavButtons && (
        <div className="absolute right-0 top-0 px-3 py-1.5 rounded-full outline-1 outline-offset-[-1px] outline-stone-500 hidden md:inline-flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Scroll services left"
            onClick={() => scroll("left")}
            className="inline-flex"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-50 cursor-pointer" />
          </button>
          <button
            type="button"
            aria-label="Scroll services right"
            onClick={() => scroll("right")}
            className="inline-flex"
          >
            <ChevronRight className="w-4 h-4 text-neutral-50 cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
}
