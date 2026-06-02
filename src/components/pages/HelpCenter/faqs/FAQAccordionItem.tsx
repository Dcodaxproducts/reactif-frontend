import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { FAQItemData } from "@/types/component-props";

export function FAQAccordionItem({
  value,
  question,
  questionKey,
  answer,
  answerKey,
}: FAQItemData) {
  const { t } = useAppTranslation();

  return (
    <AccordionItem
      value={value}
      className="border border-white/10 rounded-xl px-5 bg-[#0b0f17]"
    >
      <AccordionTrigger className="text-left text-white text-sm font-medium hover:no-underline py-5">
        {questionKey ? t(questionKey) : question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-400 text-sm pb-5">
        {answerKey ? t(answerKey) : answer}
      </AccordionContent>
    </AccordionItem>
  );
}
