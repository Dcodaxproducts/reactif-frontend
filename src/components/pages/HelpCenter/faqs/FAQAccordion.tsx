import { Accordion } from "@/components/ui/accordion";
import type { FAQItemData } from "@/types/component-props";
import { FAQAccordionItem } from "./FAQAccordionItem";

export function FAQAccordion({ faqs }: { faqs: FAQItemData[] }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {faqs.map((faq) => (
        <FAQAccordionItem key={faq.value} {...faq} />
      ))}
    </Accordion>
  );
}
