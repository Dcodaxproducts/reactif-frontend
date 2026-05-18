"use client";

import { Car, PenTool, Factory } from "lucide-react";

/* ================= DATA ================= */
const expertiseData = [
  {
    icon: Car,
    title: "Premium Vehicle Wraps",
    desc: "Utilizing industry-leading vinyl and precision installation techniques for a flawless finish that protects and performs.",
  },
  {
    icon: PenTool,
    title: "High-Impact Design",
    desc: "Custom livery and graphics designed to capture the essence of your brand or personal style with striking visual clarity.",
  },
  {
    icon: Factory,
    title: "Industrial Precision",
    desc: "State-of-the-art printing technology ensuring color accuracy and durability that stands up to the rigors of the road.",
  },
];

export default function OurExpertise() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-16">

      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Our Expertise
          </h2>

          <div
            className="w-16 h-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #9F73F1 0%, #5FC5FF 100%)",
            }}
          />
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {expertiseData.map((item, i) => (
            <ExpertiseCard key={i} {...item} />
          ))}

        </div>

      </div>

    </section>
  );
}

/* ================= CARD ================= */
function ExpertiseCard({
  icon: Icon,
  title,
  desc,
}: any) {
  return (
    <div className="rounded-2xl border border-white/20 p-6 space-y-4 bg-[#010304] hover:border-white/40 transition">

      {/* ICON */}
      <div className="text-purple-400">
        <Icon size={28} />
      </div>

      {/* TITLE */}
      <h3 className="text-white text-lg font-semibold">
        {title}
      </h3>

      {/* DESC */}
      <p className="text-slate-400 text-[15.5px] leading-relaxed">
        {desc}
      </p>

    </div>
  );
}