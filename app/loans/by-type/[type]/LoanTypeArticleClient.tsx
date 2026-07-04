'use client';

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import DetailLayout from "@/components/shared/DetailLayout";
import DetailSidebarCta from "@/components/shared/DetailSidebarCta";
import PurposeLoanCalculator from "@/components/shared/PurposeLoanCalculator";
import ContentBlocks, { findFaqBlock } from "@/components/shared/ContentBlocks";
import LocationsByProvince from "@/components/shared/LocationsByProvince";
import CTASection from "@/components/home/cta-section";
import { Button } from "@/components/ui/button";
import type { ArticleContent } from "@/lib/content-blocks";
import type { LoanTypeMeta } from "@/lib/loan-types";
import { getOtherLoanTypes } from "@/lib/loan-types";
import { loanAmounts } from "@/lib/loan-amounts";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const badges = [
  { icon: ShieldCheck, label: "Bank-Level Security" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: CheckCircle2, label: "Trusted Lenders" },
  { icon: Users, label: "50,000+ Canadians Served" },
  { icon: Zap, label: "Fast 2-Minute Application" },
];

const creditScoreLinks = ["300-559 (Poor)", "560-659 (Fair)", "660-724 (Good)", "725-759 (Very Good)", "760-900 (Excellent)"];

const guideLinks = [
  { label: "How to Get a Personal Loan with Bad Credit", href: "/resources/guides/get-personal-loan-bad-credit" },
  { label: "Understanding Credit Reports", href: "/resources/guides/understanding-credit-reports" },
  { label: "Avoiding Loan Scams", href: "/resources/guides/avoiding-loan-scams" },
  { label: "Preparing for a Loan Application", href: "/resources/guides/preparing-for-loan-application" },
];

const comparisonLinks = [
  { label: "Personal vs Payday Loan", href: "/resources/comparisons/payday-vs-personal-loans" },
  { label: "Secured vs Unsecured", href: "/resources/comparisons/secured-vs-unsecured-loans" },
  { label: "Personal Loan vs Line of Credit", href: "/resources/comparisons/personal-loans-vs-loc" },
];

const toolLinks = [
  { label: "Loan Calculator", href: "/resources/tools" },
  { label: "Approval Calculator", href: "/resources/tools" },
  { label: "Credit Score Simulator", href: "/resources/tools" },
  { label: "Debt Consolidation Analyzer", href: "/resources/tools" },
];

const provinceLinks = ["Alberta", "British Columbia", "Ontario", "Quebec"];

const trackClick = (label: string, slug: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "loan_application_click", {
      event_category: "engagement",
      event_label: label,
      event_source: `loan_type_${slug}`,
    });
  }
};

const LoanTypeArticleClient = ({
  entry,
  content,
}: {
  entry: LoanTypeMeta;
  content: ArticleContent;
}) => {
  const otherTypes = getOtherLoanTypes(entry.slug);
  const popularAmounts = [...loanAmounts].sort((a, b) => a.amount - b.amount).slice(0, 6);
  const faqBlock = findFaqBlock(content.blocks);

  return (
    <>
      {faqBlock && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqBlock.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}

      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Loan Types", href: "/loans/by-type" },
          { label: entry.name },
        ]}
        icon={FileText}
        title={<>{entry.name} in Canada</>}
        subtitle={content.subtitle}
        meta={
          <>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> All credit types welcome
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fast funding available
            </span>
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Secure &amp; confidential
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
              onClick={() => trackClick("Loan Type Page Top CTA", entry.slug)}
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

        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
              guideSlug={`type-${entry.slug}`}
            />
            <DetailSidebarCta
              applyUrl={APPLY_URL}
              onApplyClick={() => trackClick("Loan Type Page Sidebar CTA", entry.slug)}
            />
          </>
        }
      >
        <div className="font-dm-sans">
          <ContentBlocks blocks={content.blocks} />
        </div>

        <div className="rounded-xl border-l-4 p-4 mt-6" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
          <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
            Editorial Note: Our content is reviewed by financial experts for accuracy. We may receive compensation from partner lenders, which does not influence our rankings or recommendations.
          </p>
        </div>

        <LocationsByProvince heading={`${entry.name} by Location`} />

        <div className="mt-16">
          <h2 className="text-lg font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Learn More About {entry.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-dm-sans">
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Related Guides
              </h3>
              <ul className="space-y-1.5">
                {guideLinks.map((link) => (
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
                Compare Options
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
                Free Tools
              </h3>
              <ul className="space-y-1.5">
                {toolLinks.map((link) => (
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
                Browse by Province
              </h3>
              <ul className="space-y-1.5">
                {provinceLinks.map((province) => (
                  <li key={province}>
                    <Link href="/loans/by-location" className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      Loans in {province}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-lg font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Explore More Canadian Loan Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-dm-sans">
            {otherTypes.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                  Loan Types
                </h3>
                <ul className="space-y-1.5 mb-2">
                  {otherTypes.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/loans/by-type/${t.slug}`} className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/loans/by-type" className="text-xs font-medium" style={{ color: "hsl(160,84%,39%)" }}>
                  Browse all types →
                </Link>
              </div>
            )}
            <div>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                By Loan Amount
              </h3>
              <ul className="space-y-1.5 mb-2">
                {popularAmounts.slice(0, 4).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/loans/by-amount/${a.slug}`} className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      ${a.amount} Loan
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/loans/by-amount" className="text-xs font-medium" style={{ color: "hsl(160,84%,39%)" }}>
                Browse all amounts →
              </Link>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                By Credit Score
              </h3>
              <ul className="space-y-1.5 mb-2">
                {creditScoreLinks.slice(0, 4).map((label) => (
                  <li key={label}>
                    <Link href="/loans/by-credit-score" className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/loans/by-credit-score" className="text-xs font-medium" style={{ color: "hsl(160,84%,39%)" }}>
                View all credit ranges →
              </Link>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Tools
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/resources/tools" className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                    Loan Calculator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DetailLayout>

      <CTASection />
    </>
  );
};

export default LoanTypeArticleClient;
