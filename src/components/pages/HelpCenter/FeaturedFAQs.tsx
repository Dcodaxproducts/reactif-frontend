"use client";

import { useSupportFaqs } from "@/hooks/useSupportFaqs";
import { FAQAccordion } from "./faqs/FAQAccordion";
import { FAQHeader } from "./faqs/FAQHeader";

export default function FeaturedFAQs() {
  const { faqs } = useSupportFaqs();

  return (
    <section className="w-full px-6 flex justify-center pb-5">
      <div className="max-w-4xl w-full">
        <FAQHeader />
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
