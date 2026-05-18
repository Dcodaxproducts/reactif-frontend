import { Accordion } from "@/components/ui/accordion";
import { featuredFAQs } from "@/data/help-center";
import { FAQAccordionItem } from "./FAQAccordionItem";

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {featuredFAQs.map((faq) => (
        <FAQAccordionItem key={faq.value} {...faq} />
      ))}
    </Accordion>
  );
}
