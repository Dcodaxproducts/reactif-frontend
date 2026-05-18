import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CatalogCardProps } from "@/types/component-props";

function CatalogCard({ item }: CatalogCardProps) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden hover:scale-[1.02] transition">
      <div className="h-52 bg-slate-950 flex items-center justify-center p-4">
        <div className="relative h-[160px] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="300px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 bg-[#010304]">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wide text-pink-500">
            {item.category}
          </span>
          <span className="text-white font-bold text-sm">{item.price}</span>
        </div>

        <h3 className="text-white font-bold text-lg leading-6">{item.title}</h3>

        <p className="text-slate-400 text-sm leading-6 line-clamp-3">
          {item.desc}
        </p>

        <div className="flex justify-between items-center pt-4">
          <Button className="flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition">
            View Details
            <ArrowRight size={16} />
          </Button>

          <Button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <ShoppingCart size={16} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CatalogCard;
