'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import FaqAccordion from "@/components/shared/FaqAccordion";
import HubCTA from "@/components/shared/HubCTA";
import { loanTypes } from "@/lib/loan-types";

const microBadges = ["Multiple loan types available", "Same-day approval available", "PIPEDA-compliant & secure"];

const howToChoose = [
  "Consider Your Timeline: Need funds today? Look at same-day or emergency loans. Can wait a few days? Standard personal loans may offer better rates.",
  "Evaluate Your Credit: Good credit opens more options, but bad credit loans exist specifically for those with credit challenges.",
  "Define Your Purpose: Consolidating debt? Emergency expense? The loan purpose can help determine the best type.",
  "Compare Total Costs: Look beyond monthly payments to understand the total cost, including interest and fees.",
];

const popularTypesExplained = [
  { name: "Emergency Loans", description: "Designed for unexpected expenses like car repairs, medical bills, or home emergencies. Quick approval and fast funding are the main benefits." },
  { name: "Debt Consolidation Loans", description: "Combine multiple debts into a single loan with one monthly payment. Can simplify your finances and potentially lower your overall interest rate." },
  { name: "Bad Credit Loans", description: "Specifically designed for borrowers with credit scores below 660. Higher approval rates for those who've been declined elsewhere." },
  { name: "Loans for Gig Workers", description: "Built for freelancers and self-employed Canadians with non-traditional income — assessed using bank statements instead of pay stubs." },
  { name: "Same-Day Loans", description: "For urgent needs where you can't wait. Apply in minutes and potentially receive funds the same business day." },
];

const faqItems = [
  {
    question: "What types of personal loans are available in Canada?",
    answer:
      "Canadians can access various types of personal loans including emergency loans for unexpected expenses, debt consolidation loans to combine multiple debts, bad credit loans for those with lower credit scores, and loans tailored for gig and self-employed workers.",
  },
  {
    question: "Which type of loan is best for me?",
    answer:
      "The best loan type depends on your situation. If you need funds quickly, consider emergency or same-day loans. If you have multiple debts, a debt consolidation loan can simplify payments. If your credit isn't perfect, bad credit loans are designed for you.",
  },
  {
    question: "Can I get a personal loan with bad credit in Canada?",
    answer:
      "Yes! Bad credit loans are specifically designed for Canadians with less-than-perfect credit. Many lenders in our network specialize in helping borrowers who've been turned down elsewhere.",
  },
  {
    question: "How fast can I get approved for a loan?",
    answer:
      "Approval times vary by loan type. Same-day loans and emergency loans typically offer the fastest decisions, often within minutes. Most personal loans provide a decision within 24 hours.",
  },
  {
    question: "What's the difference between a payday loan and a personal loan?",
    answer:
      "Personal loans typically have longer repayment terms (months to years), lower interest rates, and larger loan amounts. Payday alternative loans offer a middle ground with more flexible terms than traditional payday loans.",
  },
];

const LoansByTypeClient = () => {
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
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Loan Types" }]}
        icon={FileText}
        title={<>Types of Personal Loans in Canada</>}
        subtitle="Find the right type of personal loan for your needs. From emergency funds to debt consolidation — compare options from $300 to $5,000 CAD."
        maxWidthClassName="max-w-5xl"
      >
        <div className="mt-6 mb-8">
          <TrustBadges dark />
        </div>

        <div className="flex justify-center mb-4">
          <SocialProof dark />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {microBadges.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-dm-sans"
              style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", color: "#FFFFFF" }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(160,84%,39%)" }} />
              {label}
            </span>
          ))}
        </div>
      </DetailHero>

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          Browse Loan Types
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {loanTypes.map(({ slug, name, description }) => (
            <Link
              key={slug}
              href={`/loans/by-type/${slug}`}
              className="group w-full sm:w-[calc(50%-0.75rem)] rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <HubIconBox icon={FileText} size="sm" />
                <ArrowRight
                  className="w-4 h-4 mt-2 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
                  style={{ color: "hsl(215,14%,46%)" }}
                />
              </div>
              <h3 className="font-bold text-base mb-1 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                {name}
              </h3>
              <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                {description}
              </p>
            </Link>
          ))}
        </div>

        <div className="space-y-5 max-w-3xl mx-auto font-dm-sans">
          <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Understanding Different Types of Personal Loans
          </h2>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Not all personal loans are created equal. Different loan types serve different purposes and come with varying terms, rates, and requirements. Understanding the differences can help you choose the right loan for your specific situation and financial goals.
          </p>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Whether you&apos;re facing an unexpected emergency, looking to consolidate debt, or need funds despite having less-than-perfect credit, there&apos;s a loan type designed for your needs. Our network of Canadian lenders offers specialized products for every situation.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-8 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            How to Choose the Right Loan Type
          </h2>
          <ul className="space-y-2.5">
            {howToChoose.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-8 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Popular Loan Types Explained
          </h2>
          <div className="space-y-3">
            {popularTypesExplained.map((item) => (
              <p key={item.name} className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                <strong style={{ color: "hsl(215,28%,12%)" }}>{item.name}:</strong> {item.description}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-10 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} variant="flat" />
        </div>

        <HubCTA />
        </div>
      </div>
    </>
  );
};

export default LoansByTypeClient;
