"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function AboutContent() {
  const { t } = useAppTranslation();

  return (
    <section className="w-full px-4 md:px-8 lg:px-20 py-12 md:pb-16 flex items-center min-h-[70vh]">
      <Container width="7xl" className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="space-y-5 flex flex-col justify-center h-full">
          <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">
            {t("about.originBadge")}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase leading-tight"
            style={{
              background:
                "linear-gradient(90deg, #F262B5 24.52%, #789DFF 60.1%, #9F73F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("about.originTitleLine1")}, <br /> {t("about.originTitleLine2")}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            {t("about.originParagraph1")}
          </p>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            {t("about.originParagraph2")}
          </p>
        </div>
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
      </Container>
    </section>
  );
}
