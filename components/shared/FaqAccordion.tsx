'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  /** "card" (default): boxed items with border/shadow, used on the homepage teaser.
   *  "flat": borderless list with hairline dividers, used on the dedicated FAQ page. */
  variant?: "card" | "flat";
};

const FaqAccordion = ({ items, variant = "card" }: FaqAccordionProps) => {
  if (variant === "flat") {
    return (
      <Accordion type="single" collapsible className="font-dm-sans">
        {items.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            style={{ borderColor: "hsl(214,20%,90%)" }}
          >
            <AccordionTrigger
              className="py-4 text-sm sm:text-base font-medium hover:no-underline font-space-grotesk"
              style={{ color: "hsl(215,28%,12%)" }}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent
              className="text-sm leading-relaxed"
              style={{ color: "hsl(215,14%,46%)" }}
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible className="gap-3 font-dm-sans">
      {items.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="rounded-xl border px-4 sm:px-6 last:border-b-0"
          style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
        >
          <AccordionTrigger
            className="py-4 sm:py-5 text-sm sm:text-base font-semibold hover:no-underline font-space-grotesk"
            style={{ color: "hsl(215,28%,12%)" }}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className="text-sm leading-relaxed"
            style={{ color: "hsl(215,14%,46%)" }}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
