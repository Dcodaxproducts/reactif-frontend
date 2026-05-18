"use client";

import Image from "next/image";
import { SectionHeader } from "../shared/SectionHeader";
import ContactForm from "../forms/ContactForm";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function StartProjectContent() {
  const pathname = usePathname();
  const isHelpCenter = pathname === "/help-center";

  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      
      {/* Background */}
      {!isHelpCenter && (
        <Image
          src="/assets/hero/gradient.png"
          alt="Background"
          fill
          className="object-cover -z-10"
        />
      )}

      <div className="mx-auto px-4 sm:px-6 md:px-40">
        
        <SectionHeader
          badgeText="Get in Touch"
          size={isHelpCenter ? "sm" : "default"} // 👈 clean control
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
      </div>
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