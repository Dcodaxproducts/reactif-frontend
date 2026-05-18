import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormField({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Label className="text-[#F5F5F580] text-xs md:text-sm font-medium">
        {label}
      </Label>
      <Input
        type={type}
        className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-white/10 px-4 text-white outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}
