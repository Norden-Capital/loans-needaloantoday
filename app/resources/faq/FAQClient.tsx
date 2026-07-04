'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { HelpCircle, Search, ArrowRight } from "lucide-react";
import FaqAccordion, { FaqItem } from "@/components/shared/FaqAccordion";
import DetailHero from "@/components/shared/DetailHero";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faqCategories } from "@/lib/faq-data";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

const categories: FaqCategory[] = faqCategories.map((cat) => ({
  title: cat.category,
  items: cat.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
}));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

const FAQClient = () => {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FAQ" },
        ]}
        icon={HelpCircle}
        title={<>Frequently Asked Questions — Canada</>}
        subtitle={
          <>
            Find answers to common questions about personal loans in Canada. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="underline underline-offset-4 text-[hsl(160,84%,39%)]">
              Contact us
            </Link>{" "}
            for personalized assistance.
          </>
        }
        maxWidthClassName="max-w-4xl"
      >
        <div className="mb-6 mt-6">
          <TrustBadges dark />
        </div>

        <div className="flex justify-center">
          <SocialProof dark />
        </div>
      </DetailHero>

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="relative max-w-sm mx-auto mb-12 sm:mb-16">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "hsl(215,14%,60%)" }}
          />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="pl-8 font-dm-sans"
            style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
          />
        </div>

        {filteredCategories.length > 0 ? (
          <div className="space-y-12 sm:space-y-16">
            {filteredCategories.map((category) => (
              <div key={category.title}>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6 font-space-grotesk"
                  style={{ color: "hsl(215,28%,12%)" }}
                >
                  {category.title}
                </h2>
                <FaqAccordion items={category.items} variant="flat" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
            No questions match &quot;{query}&quot;. Try a different search or{" "}
            <Link href="/contact" className="underline underline-offset-4" style={{ color: "hsl(160,84%,39%)" }}>
              contact us
            </Link>
            .
          </p>
        )}

        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <p className="text-sm sm:text-base mb-4 font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
            Still have questions?
          </p>
          <Button
            asChild
            size="lg"
            className="hover:scale-105 active:scale-95"
            style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'loan_application_click', {
                    event_category: 'engagement',
                    event_label: 'FAQ Page CTA Button',
                    event_source: 'faq_page',
                  });
                }
              }}
            >
              Apply Now
              <ArrowRight />
            </a>
          </Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default FAQClient;
