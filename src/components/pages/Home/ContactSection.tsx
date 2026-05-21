"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/common/Container";
import { ContactCtaCard } from "./contact-section/ContactCtaCard";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const handleRequestQuote = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="relative py-10 md:py-5 overflow-hidden">
      <Image
        src="/assets/hero/gradient.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />

      <Container gutter="page">
        <ContactCtaCard loading={loading} onRequestQuote={handleRequestQuote} />
      </Container>
    </section>
  );
}
