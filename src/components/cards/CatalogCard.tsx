import { ArrowRight, ShoppingCart } from "lucide-react";

function CatalogCard({ item }: { item: any }) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden hover:scale-[1.02] transition">

      {/* IMAGE */}
      <div className="h-52 bg-slate-950 flex items-center justify-center p-4">
        <img
          src={item.image}
          alt={item.title}
          className="h-[160px] object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3 bg-[#010304]">

        {/* CATEGORY + PRICE */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wide text-pink-500">
            {item.category}
          </span>
          <span className="text-white font-bold text-sm">
            {item.price}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-white font-bold text-lg leading-6">
          {item.title}
        </h3>

        {/* DESC */}
        <p className="text-slate-400 text-sm leading-6 line-clamp-3">
          {item.desc}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-4">

          <button className="flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition">
            View Details
            <ArrowRight size={16} />
          </button>

          <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <ShoppingCart size={16} className="text-white" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default CatalogCard