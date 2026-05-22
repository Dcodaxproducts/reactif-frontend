"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import ContactForm from "@/components/forms/ContactForm";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function StartProjectContent() {
  const pathname = usePathname();
  const isHelpCenter = pathname === "/help-center";

  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      {!isHelpCenter && (
        <Image
          src="/assets/hero/gradient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
      )}

      <Container gutter="narrow">
        <SectionHeader
          badgeText="Get in Touch"
          size={isHelpCenter ? "sm" : "default"}
          title={
            <>
              START YOUR{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PROJECT
              </span>{" "}
              TODAY
            </>
          }
          description="Let's discuss how we can transform your vision into reality"
        />

        <ContactForm />
      </Container>
    </section>
  );
}

export default function StartProjectSection() {
  return (
    <Suspense fallback={null}>
      <StartProjectContent />
    </Suspense>
  );
}
