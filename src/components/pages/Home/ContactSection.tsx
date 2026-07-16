"use client";

import { useState } from "react";
import { Container } from "@/components/common/Container";
import { ContactCtaCard } from "./contact-section/ContactCtaCard";

export function ContactSection() {
  const [loading, setLoading] = useState(false);

  const handleRequestQuote = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#010101] py-10 md:py-5">
      <Container gutter="page">
        <ContactCtaCard loading={loading} onRequestQuote={handleRequestQuote} />
      </Container>
    </section>
  );
}
