import { Card, CardContent } from "@/components/ui/card";
import type { WhyCardProps } from "@/types/component-props";

export function WhyCard({
  title,
  description,
  icon: Icon,
  index,
}: WhyCardProps) {
  const isPink = index === 0 || index === 3;
  const accentColor = isPink ? "#F262B5" : "#5FC5FF";

  return (
    <Card className="rounded-[12px] border border-[#F5F5F580] bg-[#14161C] p-0 transition hover:border-white/40 shadow-none">
      <CardContent className="p-6 md:p-8">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-lg md:text-xl mb-4 md:mb-6"
          style={{
            background: `
              linear-gradient(${accentColor}, ${accentColor}) padding-box,
              linear-gradient(258.29deg, rgba(255,255,255,0.05) -1.28%, #FFFFFF 44.49%, rgba(255,255,255,0.05) 100%) border-box
            `,
            border: "0.5px solid transparent",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: `
              inset 0px 2px 4px 0px #FFFFFF66,
              inset 0px -2px 4px 0px #00000033
            `,
          }}
        >
          <Icon size={20} />
        </div>

        <h3 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-3 font-hk">
          {title}
        </h3>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <span
            className="w-8 md:w-10 h-[2px]"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-white/70 text-[24px] md:text-[30px]">›</span>
        </div>
      </CardContent>
    </Card>
  );
}
