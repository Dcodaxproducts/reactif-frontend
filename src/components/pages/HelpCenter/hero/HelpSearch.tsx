import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function HelpSearch() {
  const { t } = useAppTranslation();

  return (
    <div className="w-full relative">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        style={{ zIndex: "999" }}
      />

      <Input
        type="text"
        placeholder={t("helpCenter.searchPlaceholder")}
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 backdrop-blur-md h-auto"
      />
    </div>
  );
}
