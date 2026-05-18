"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-12 md:pb-16 flex items-center min-h-[70vh]">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center w-full">

        {/* LEFT CONTENT */}
        <div className="space-y-5 flex flex-col justify-center h-full">

          {/* SMALL LABEL */}
          <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">
            Our Origin
          </span>

          {/* TITLE */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase leading-tight"
            style={{
              background:
                "linear-gradient(90deg, #F262B5 24.52%, #789DFF 60.1%, #9F73F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Born from Passion, <br /> Defined by Precision
          </h2>

          {/* PARAGRAPH 1 */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            Founded at the intersection of automotive passion and cutting-edge
            design, ReactIf Printing & Design specializes in pushing the
            boundaries of visual communication. We started as a small workshop
            with a single vision: to treat every vehicle as a high-performance
            canvas.
          </p>

          {/* PARAGRAPH 2 */}
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            Our mission is to transform the ordinary into the extraordinary. By
            blending industrial-grade materials with futuristic design
            aesthetics, we help our clients demand attention on the road and
            beyond.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full flex justify-center items-center h-full">
          <div className="relative w-full">
            <Image
              src="/assets/about/about_content.png"
              alt="About"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl shadow-2xl mt-9"
            />
          </div>
        </div>

      </div>

    </section>
  );
}