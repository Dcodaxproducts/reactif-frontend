"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const commitments = [
  "Uncompromising quality in every square inch.",
  "Environmentally conscious printing processes.",
  "24/7 Support for corporate fleet accounts.",
  "Cutting-edge material sourcing.",
];

export default function OurCommitment() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-20 pb-24">

      <div className="max-w-7xl mx-auto border border-white/20 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-10 items-center bg-[#010304]">

        {/* LEFT */}
        <div className="space-y-6">

          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Our Commitment
          </h2>

          <div className="space-y-4">
            {commitments.map((item, i) => (
              <div key={i} className="flex items-start gap-3">

                <CheckCircle className="text-pink-500 mt-1" size={18} />

                <p className="text-slate-300 text-sm md:text-base">
                  {item}
                </p>

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full flex justify-center">

          <div className="relative w-full max-w-md md:max-w-lg">
            <Image
              src="/assets/about/carAbout.png" // <-- update path if needed
              alt="Car"
              width={600}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>

      </div>

    </section>
  );
}