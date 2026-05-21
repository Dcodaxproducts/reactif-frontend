"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { getImageSource } from "@/lib/image-source";
import type { Subcategory } from "@/types/categories";
import DesignPathModal from "./DesignPathModal";

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

const benefits = [
  "Premium Quality Materials",
  "Expert Installation",
  "Long-term Durability",
];

type SubCategoriesProps = {
  subcategories: Subcategory[];
};

function SubCategories({ subcategories }: SubCategoriesProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subcategory | null>(null);
  const selectedSubcategoryId = selectedSub?.id;
  const selectedSubcategoryName = selectedSub?.name;

  return (
    <section className="w-full py-10 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {subcategories.map((subcategory, index) => {
          const { id, name, description, category_image } = subcategory;
          const imageSource = getImageSource(category_image, "");

          return (
            <div
              key={id}
              className="group rounded-3xl border border-neutral-700/60 backdrop-blur-sm bg-black/10 overflow-hidden hover:shadow-xl transition-all duration-500 opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                {imageSource ? (
                  <Image
                    src={imageSource}
                    alt={name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
              </div>

              <div className="p-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {name}
                  </h3>
                  <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>

                <div>
                  <p className="text-md font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Benefits
                  </p>
                  <div className="flex flex-col gap-2">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CircleCheck size={18} className="text-pink-500" />
                        <span className="text-[15px] text-neutral-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedSub(subcategory);
                    setOpenModal(true);
                  }}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition"
                >
                  Select Service
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {selectedSub && selectedSubcategoryId != null && selectedSubcategoryName && (
        <DesignPathModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          subcategoryId={selectedSubcategoryId}
          subcategoryName={selectedSubcategoryName}
          subcategorySlug={slugify(selectedSubcategoryName)}
        />
      )}
    </section>
  );
}

export default SubCategories;
