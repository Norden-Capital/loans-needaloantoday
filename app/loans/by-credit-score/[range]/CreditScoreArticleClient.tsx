'use client';

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  FileCheck,
  Lock,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import DetailLayout from "@/components/shared/DetailLayout";
import DetailSidebarCta from "@/components/shared/DetailSidebarCta";
import FaqAccordion from "@/components/shared/FaqAccordion";
import CTASection from "@/components/home/cta-section";
import { Button } from "@/components/ui/button";
import type { CreditScoreRange } from "@/lib/credit-scores";
import { getOtherCreditScores } from "@/lib/credit-scores";
import { loanAmounts } from "@/lib/loan-amounts";
import { loanPurposes } from "@/lib/loan-purposes";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const badges = [
  { icon: ShieldCheck, label: "Bank-Level Security" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: CheckCircle2, label: "Trusted Lenders" },
  { icon: Users, label: "50,000+ Canadians Served" },
  { icon: Zap, label: "Fast 2-Minute Application" },
];

const comparisonLinks = [
  { label: "Personal vs Payday Loans", href: "/resources/comparisons/payday-vs-personal-loans" },
  { label: "Secured vs Unsecured", href: "/resources/comparisons/secured-vs-unsecured-loans" },
  { label: "Fixed vs Variable Rate", href: "/resources/comparisons/fixed-vs-variable-rates" },
  { label: "Loans vs Credit Cards", href: "/resources/comparisons/loans-vs-credit-cards" },
  { label: "Online vs Traditional Lenders", href: "/resources/comparisons/online-vs-traditional-lenders" },
  { label: "Credit Union vs Bank", href: "/resources/comparisons/credit-union-vs-bank" },
];

const cityLinks = ["Toronto, ON", "Montreal, QC", "Calgary, AB", "Ottawa, ON", "Edmonton, AB", "Vancouver, BC"];

const trackClick = (label: string, slug: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "loan_application_click", {
      event_category: "engagement",
      event_label: label,
      event_source: `credit_score_${slug}`,
    });
  }
};

const CreditScoreArticleClient = ({ entry }: { entry: CreditScoreRange }) => {
  const otherRanges = getOtherCreditScores(entry.slug);
  const popularAmounts = [...loanAmounts].sort((a, b) => a.amount - b.amount).slice(0, 6);
  const popularPurposes = loanPurposes.slice(0, 6);

  const faqItems = [
    {
      question: `Can I get a loan with a ${entry.label} credit score?`,
      answer: `Yes. Canadian lenders offer personal loan options for the ${entry.label} range, though your rate and terms will reflect the ${entry.tier.toLowerCase()} tier your score falls into.`,
    },
    {
      question: `What interest rates can I expect with a ${entry.label} credit score?`,
      answer: entry.rateInfo,
    },
    {
      question: `How can I improve my ${entry.label} credit score?`,
      answer:
        "Pay every bill on time, keep your credit utilization below 30%, avoid closing old accounts, and check your credit report regularly for errors with Equifax and TransUnion Canada.",
    },
    {
      question: `Will applying affect my ${entry.label} credit score?`,
      answer:
        "Checking your rate through a soft credit check won't affect your score. Only a formal application and acceptance of a firm offer triggers a hard inquiry, which may cause a small, temporary dip.",
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
          { label: "Loans by Credit Score", href: "/loans/by-credit-score" },
          { label: `Score ${entry.label}` },
        ]}
        icon={TrendingUp}
        title={<>Personal Loans for Credit Scores {entry.label} in Canada</>}
        subtitle={<>Explore personal loan options, interest rates, and terms for Canadians with {entry.tier.toLowerCase()} credit scores ({entry.label}).</>}
        meta={
          <>
            <span className="inline-flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" /> Specialized lenders available
            </span>
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Quick decisions
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Soft credit check only
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
              onClick={() => trackClick("Credit Score Page Top CTA", entry.slug)}
            >
              Check Your Options
              <ArrowRight />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-2 border-[hsl(160,84%,39%)] bg-transparent text-[hsl(160,84%,39%)] hover:bg-[hsl(160,84%,39%)]/10 hover:text-[hsl(160,84%,39%)]"
          >
            <Link href="/resources/tools">
              <Calculator className="w-4 h-4" />
              Calculate Payments
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-dm-sans"
              style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", color: "#FFFFFF" }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: "hsl(160,84%,39%)" }} />
              {label}
            </span>
          ))}
        </div>
      </DetailHero>

      <DetailLayout
        sidebar={
          <DetailSidebarCta
            applyUrl={APPLY_URL}
            label="Check Your Options"
            onApplyClick={() => trackClick("Credit Score Page Sidebar CTA", entry.slug)}
          />
        }
      >
        <div className="space-y-5 font-dm-sans">
          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            What a {entry.label} Credit Score Means in Canada
          </h2>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            {entry.whatItMeans}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Loan Options Available for This Credit Range
          </h2>
          <ul className="space-y-2.5">
            {entry.loanOptions.map((option) => (
              <li key={option.name} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  <strong>{option.name}:</strong> {option.description}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Expected Interest Rates and Terms
          </h2>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            {entry.rateInfo}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            How to Improve Your Chances of Approval
          </h2>
          <ul className="space-y-2.5">
            {entry.approvalTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Tips for Improving Your Credit Score
          </h2>
          <ul className="space-y-2.5">
            {entry.creditTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Alternative Options If You&apos;re Having Trouble Qualifying
          </h2>
          <ul className="space-y-2.5">
            {entry.alternatives.map((alt) => (
              <li key={alt} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {alt}
                </span>
              </li>
            ))}
          </ul>

          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            {entry.closing}
          </p>

          <div className="rounded-2xl border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ borderColor: "hsl(214,20%,90%)" }}>
            <span style={{ color: "hsl(215,14%,46%)" }}>
              <strong style={{ color: "hsl(215,28%,12%)" }}>First Published:</strong> April 13, 2026
            </span>
            <span style={{ color: "hsl(215,14%,46%)" }}>
              <strong style={{ color: "hsl(215,28%,12%)" }}>Last Updated:</strong> April 13, 2026
            </span>
            <span style={{ color: "hsl(215,14%,46%)" }}>
              <strong style={{ color: "hsl(215,28%,12%)" }}>Reviewed by:</strong> NeedALoanToday Editorial Team
            </span>
            <span style={{ color: "hsl(215,14%,46%)" }}>
              <strong style={{ color: "hsl(215,28%,12%)" }}>Next Review:</strong> July 2026
            </span>
          </div>

          <div className="rounded-xl border-l-4 p-4" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
              Editorial Note: Our content is reviewed by financial experts for accuracy. We may receive compensation from partner lenders, which does not influence our rankings or recommendations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 font-dm-sans">
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Explore by Loan Amount
            </h3>
            <ul className="space-y-2 mb-3">
              {popularAmounts.map((a) => (
                <li key={a.slug}>
                  <Link href={`/loans/by-amount/${a.slug}`} className="text-sm hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                    ${a.amount} Loans
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/loans/by-amount" className="text-sm font-medium" style={{ color: "hsl(160,84%,39%)" }}>
              Browse all amounts →
            </Link>
          </div>
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Explore by Loan Purpose
            </h3>
            <ul className="space-y-2 mb-3">
              {popularPurposes.map((p) => (
                <li key={p.slug}>
                  <Link href={`/loans/by-purpose/${p.slug}`} className="text-sm hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/loans/by-purpose" className="text-sm font-medium" style={{ color: "hsl(160,84%,39%)" }}>
              Explore all purposes →
            </Link>
          </div>
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

        {otherRanges.length > 0 && (
          <div className="text-center mt-16">
            <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Loans for Other Credit Scores
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherRanges.map((r) => (
                <Link
                  key={r.slug}
                  href={`/loans/by-credit-score/${r.slug}`}
                  className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                  style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
                >
                  Score {r.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} variant="flat" />
        </div>

        <div className="mt-16">
          <h2 className="text-lg font-bold text-center mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Keep Exploring
          </h2>
          <p className="text-sm text-center mb-6 font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
            Related pages to help you find the right loan faster.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-dm-sans">
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Browse by Loan Amount
              </h3>
              <ul className="space-y-1.5">
                {popularAmounts.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/loans/by-amount/${a.slug}`} className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      ${a.amount} Loan
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Compare Your Options
              </h3>
              <ul className="space-y-1.5">
                {comparisonLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Loans in Top Cities
              </h3>
              <ul className="space-y-1.5">
                {cityLinks.map((city) => (
                  <li key={city}>
                    <Link href="/loans/by-location" className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DetailLayout>

      <CTASection />
    </>
  );
};

export default CreditScoreArticleClient;
