import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductSearchInput() {
  return (
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
  );
}
