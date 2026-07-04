'use client';

import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Target } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import DetailLayout from "@/components/shared/DetailLayout";
import DetailSidebarCta from "@/components/shared/DetailSidebarCta";
import TrustBadges from "@/components/shared/TrustBadges";
import PurposeLoanCalculator from "@/components/shared/PurposeLoanCalculator";
import ContentBlocks from "@/components/shared/ContentBlocks";
import FaqAccordion from "@/components/shared/FaqAccordion";
import CTASection from "@/components/home/cta-section";
import { Button } from "@/components/ui/button";
import type { ArticleContent } from "@/lib/content-blocks";
import type { LoanPurposeMeta } from "@/lib/loan-purposes";
import { getOtherLoanPurposes } from "@/lib/loan-purposes";
import { loanAmounts } from "@/lib/loan-amounts";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const trackClick = (label: string, slug: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "loan_application_click", {
      event_category: "engagement",
      event_label: label,
      event_source: `purpose_${slug}`,
    });
  }
};

const PurposeArticleClient = ({
  entry,
  content,
}: {
  entry: LoanPurposeMeta;
  content: ArticleContent;
}) => {
  const otherPurposes = getOtherLoanPurposes(entry.slug);
  const popularAmounts = [...loanAmounts].sort((a, b) => a.amount - b.amount).slice(0, 6);

  const faqItems = [
    {
      question: `How do I apply for a loan for ${entry.name.toLowerCase()}?`,
      answer:
        "Compare a few lenders, check your credit score, gather your ID, proof of income, and banking details, then apply online with a soft credit-check pre-approval that won't affect your score.",
    },
    {
      question: `What loan amounts are available for ${entry.name.toLowerCase()}?`,
      answer:
        "NeedALoanToday's network offers personal loans from $300 to $5,000. Your ideal amount depends on your specific costs — borrow only what you need to keep your payments manageable.",
    },
    {
      question: `How fast can I get funds for ${entry.name.toLowerCase()}?`,
      answer:
        "Many lenders can approve you within minutes and deposit funds by Interac e-Transfer the same business day, provided you apply before their daily cut-off time.",
    },
    {
      question: `Are there alternatives to a personal loan for ${entry.name.toLowerCase()}?`,
      answer:
        "Depending on your situation, a line of credit, a 0% introductory credit card, savings, or a relevant government or provincial assistance program may also be worth considering before you borrow.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Loans by Purpose", href: "/loans/by-purpose" },
          { label: entry.name },
        ]}
        icon={Target}
        title={<>Personal Loans for {entry.name} in Canada</>}
        subtitle={content.subtitle}
        meta={
          <>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> All credit types welcome
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fast funding available
            </span>
          </>
        }
      >
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
          <Button
            asChild
            size="lg"
            className="rounded-xl ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-[hsl(215,28%,12%)] hover:scale-105 active:scale-95"
            style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackClick("Purpose Page Top CTA", entry.slug)}
            >
              Apply Now
              <ArrowRight />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-2 border-[hsl(160,84%,39%)] bg-transparent text-[hsl(160,84%,39%)] hover:bg-[hsl(160,84%,39%)]/10 hover:text-[hsl(160,84%,39%)]"
          >
            <a href="#calculator">
              <Calculator className="w-4 h-4" />
              Calculate Payments
            </a>
          </Button>
        </div>

        <div className="mb-8">
          <TrustBadges dark />
        </div>
      </DetailHero>

      <DetailLayout
        sidebar={
          <>
            <PurposeLoanCalculator
              purposeLabel={entry.name}
              title={`Estimate Your ${entry.name} Payment`}
              defaultAmount={2500}
              defaultTerm={24}
              minAmount={500}
              maxAmount={5000}
              maxTerm={60}
              estimateApr={21}
              disclaimer="Based on 21% APR (CAD) • Max 35% APR in Canada"
              guideSlug={`purpose-${entry.slug}`}
            />
            <DetailSidebarCta
              applyUrl={APPLY_URL}
              onApplyClick={() => trackClick("Purpose Page Sidebar CTA", entry.slug)}
            />
          </>
        }
      >
        <div className="font-dm-sans">
          <ContentBlocks blocks={content.blocks} />
        </div>

        <div className="pt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} variant="flat" />
        </div>

        <div className="rounded-xl border-l-4 p-4 mt-6" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
          <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
            Editorial Note: Our content is reviewed by financial experts for accuracy. We may receive compensation from partner lenders, which does not influence our rankings or recommendations.
          </p>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Popular Loan Amounts
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularAmounts.map((a) => (
              <Link
                key={a.slug}
                href={`/loans/by-amount/${a.slug}`}
                className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
              >
                ${a.amount}
              </Link>
            ))}
          </div>
          <Link href="/loans/by-amount" className="text-sm font-medium mt-3 inline-block" style={{ color: "hsl(160,84%,39%)" }}>
            View all loan amounts →
          </Link>
        </div>

        {otherPurposes.length > 0 && (
          <div className="text-center mt-16">
            <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Other Loan Purposes
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherPurposes.map((p) => (
                <Link
                  key={p.slug}
                  href={`/loans/by-purpose/${p.slug}`}
                  className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                  style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </DetailLayout>

      <CTASection />
    </>
  );
};

export default PurposeArticleClient;
