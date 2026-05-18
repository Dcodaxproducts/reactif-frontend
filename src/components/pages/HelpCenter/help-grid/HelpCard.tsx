import { Card, CardContent } from "@/components/ui/card";
import type { HelpCardProps } from "@/types/component-props";

export function HelpCard({ card }: HelpCardProps) {
  const Icon = card.icon;

  return (
    <Card className="group rounded-xl border border-white/10 bg-[#0c1220]/80 backdrop-blur-md p-0 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-lg mb-5 ${card.color}`}
        >
          <Icon size={20} />
        </div>

        <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {card.description}
        </p>
        <div className="mt-5 h-px w-full bg-white/10" />
      </CardContent>
    </Card>
  );
}
