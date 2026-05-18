"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FeaturedFAQs() {
  return (
    <section className="w-full  px-6 flex justify-center pb-5">
      <div className="max-w-4xl w-full">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-semibold mb-2">
            Featured FAQs
          </h2>
          <p className="text-gray-400 text-sm">
            Find quick answers to our most common inquiries.
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-4"
        >
          {/* Item 1 */}
          <AccordionItem
            value="item-1"
            className="border border-white/10 rounded-xl px-5 bg-[#0b0f17]"
          >
            <AccordionTrigger className="text-left text-white text-sm font-medium hover:no-underline py-5">
              What is the typical turnaround time for a full vehicle wrap?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-sm pb-5">
              Turnaround time typically ranges from 3–7 business days depending
              on design complexity, printing, and installation scheduling.
            </AccordionContent>
          </AccordionItem>

          {/* Item 2 */}
          <AccordionItem
            value="item-2"
            className="border border-white/10 rounded-xl px-5 bg-[#0b0f17]"
          >
            <AccordionTrigger className="text-left text-white text-sm font-medium hover:no-underline py-5">
              Do you provide on-site installation services?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-sm pb-5">
              Yes, we offer on-site installation services depending on your
              location and project size.
            </AccordionContent>
          </AccordionItem>

          {/* Item 3 */}
          <AccordionItem
            value="item-3"
            className="border border-white/10 rounded-xl px-5 bg-[#0b0f17]"
          >
            <AccordionTrigger className="text-left text-white text-sm font-medium hover:no-underline py-5">
              How long do the vinyl materials last under UV exposure?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-sm pb-5">
              High-quality vinyl materials typically last 5–7 years with proper
              care, even under strong UV exposure.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}