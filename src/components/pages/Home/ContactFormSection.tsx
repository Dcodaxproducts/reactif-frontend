"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import ContactForm from "@/components/forms/ContactForm";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function StartProjectContent() {
  const { t } = useAppTranslation();
  const pathname = usePathname();
  const isHelpCenter = pathname === "/help-center";

  return (
    <section id="contact" className="relative scroll-mt-24 py-16 md:py-28 overflow-hidden">
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
          badgeText={t("home.contact.badge")}
          size={isHelpCenter ? "sm" : "default"}
          title={
            <>
              {t("home.contact.titlePrefix")}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("home.contact.titleAccent")}
              </span>{" "}
              {t("home.contact.titleSuffix")}
            </>
          }
          description={t("home.contact.description")}
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
