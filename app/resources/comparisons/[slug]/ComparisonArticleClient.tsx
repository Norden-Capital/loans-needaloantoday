'use client';

import Link from "next/link";
import { ArrowRight, Check, X, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/cta-section";
import type { ComparisonEntry } from "@/lib/comparisons";
import { exploreMoreLinks } from "@/lib/comparisons";
import { comparisonIcons } from "@/lib/comparison-icons";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const ComparisonArticleClient = ({ entry }: { entry: ComparisonEntry }) => {
  const Icon = comparisonIcons[entry.icon];

  return (
    <div className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: entry.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 400px at center top, hsl(160,84%,39%,0.08) 0%, hsl(160,84%,39%,0.04) 40%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: entry.title },
            ]}
          />
        </div>

        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "hsl(160,84%,39%,0.1)" }}
          >
            <Icon className="w-7 h-7" style={{ color: "hsl(160,84%,39%)" }} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            {entry.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
            {entry.subtitle}
          </p>

          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="rounded-full hover:scale-105 active:scale-95"
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
                      event_label: 'Comparison Article Top CTA',
                      event_source: `comparison_${entry.slug}`,
                    });
                  }
                }}
              >
                Check {entry.optionA.name} Rates
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[entry.optionA, entry.optionB].map((option) => (
            <div
              key={option.name}
              className="rounded-2xl border p-6 flex flex-col"
              style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
            >
              <h2 className="font-bold text-lg mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                {option.name}
              </h2>
              <ul className="space-y-2.5 mb-4 font-dm-sans">
                {option.pros.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                      {point}
                    </span>
                  </li>
                ))}
                {option.cons.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <X className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-auto rounded-lg p-3 font-dm-sans"
                style={{ backgroundColor: "hsl(210,20%,98%)" }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: "hsl(215,28%,12%)" }}>
                  Best For:
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                  {option.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          Side-by-Side Comparison
        </h2>
        <div
          className="rounded-2xl border overflow-hidden mb-12"
          style={{ borderColor: "hsl(214,20%,90%)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-dm-sans">
              <thead>
                <tr style={{ backgroundColor: "hsl(210,20%,98%)" }}>
                  <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                    Feature
                  </th>
                  <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                    {entry.optionA.name}
                  </th>
                  <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                    {entry.optionB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {entry.table.map((row, index) => (
                  <tr
                    key={row.feature}
                    style={{ borderTop: index === 0 ? "none" : "1px solid hsl(214,20%,90%)" }}
                  >
                    <td className="p-4 font-medium whitespace-nowrap" style={{ color: "hsl(215,28%,12%)" }}>
                      {row.feature}
                    </td>
                    <td className="p-4" style={{ color: row.winner === "a" ? "hsl(160,84%,39%)" : "hsl(215,14%,46%)" }}>
                      <span className="inline-flex items-center gap-1.5">
                        {row.a}
                        {row.winner === "a" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: row.winner === "b" ? "hsl(160,84%,39%)" : "hsl(215,14%,46%)" }}>
                      <span className="inline-flex items-center gap-1.5">
                        {row.b}
                        {row.winner === "b" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          When to Choose Each Option
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
          >
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Choose {entry.optionA.name} When:
            </h3>
            <ul className="space-y-2.5 font-dm-sans">
              {entry.chooseA.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
          >
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Choose {entry.optionB.name} When:
            </h3>
            <ul className="space-y-2.5 font-dm-sans">
              {entry.chooseB.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          Frequently Asked Questions
        </h2>
        <div className="mb-12">
          <FaqAccordion items={entry.faq} variant="flat" />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {exploreMoreLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default ComparisonArticleClient;
