"use client";

import Image from "next/image";
import { useState } from "react";
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
        alt="Background"
        fill
        className="object-cover -z-10"
      />

      <div className="mx-auto px-4 sm:px-6 md:px-30">
        <ContactCtaCard loading={loading} onRequestQuote={handleRequestQuote} />
      </div>
    </section>
  );
}
