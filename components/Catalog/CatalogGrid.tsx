import { catalogData } from "@/constants/catalog";
import CatalogCard from "../cards/CatalogCard";
export default function CatalogGrid() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h2 className="text-white text-2xl md:text-3xl font-bold">
          Our Services
        </h2>

        <div
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory
                   [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]
                   [&::-webkit-scrollbar]:h-1
                   [&::-webkit-scrollbar-track]:bg-transparent
                   [&::-webkit-scrollbar-thumb]:bg-white/10
                   [&::-webkit-scrollbar-thumb]:rounded-full
                   hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
        >
          {catalogData.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[280px] sm:w-[300px] snap-start"
            >
              <CatalogCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-white text-2xl md:text-3xl font-bold">
          Popular Services
        </h2>

        <div
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory
                   [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]
                   [&::-webkit-scrollbar]:h-1
                   [&::-webkit-scrollbar-track]:bg-transparent
                   [&::-webkit-scrollbar-thumb]:bg-white/10
                   [&::-webkit-scrollbar-thumb]:rounded-full
                   hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
        >
          {catalogData.slice(2).map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[280px] sm:w-[300px] snap-start"
            >
              <CatalogCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import { catalogData } from "@/constants/catalog";
// import CatalogCard from "../cards/CatalogCard";
// export default function CatalogGrid() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {catalogData.map((item, i) => (
//         <CatalogCard key={i} item={item} />
//       ))}
//     </div>
//   );
// }