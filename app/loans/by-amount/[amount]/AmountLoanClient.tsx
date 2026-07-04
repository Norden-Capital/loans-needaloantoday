'use client';

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  DollarSign,
  Lock,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import DetailLayout from "@/components/shared/DetailLayout";
import DetailSidebarCta from "@/components/shared/DetailSidebarCta";
import SocialProof from "@/components/shared/SocialProof";
import FaqAccordion from "@/components/shared/FaqAccordion";
import PurposeLoanCalculator from "@/components/shared/PurposeLoanCalculator";
import CTASection from "@/components/home/cta-section";
import { Button } from "@/components/ui/button";
import {
  creditTiers,
  monthlyPayment,
  getOtherLoanAmounts,
  CRIMINAL_RATE_APR,
  type LoanAmountEntry,
} from "@/lib/loan-amounts";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const badges = [
  { icon: ShieldCheck, label: "Bank-Level Security" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: CheckCircle2, label: "Trusted Lenders" },
  { icon: Users, label: "50,000+ Canadians Served" },
  { icon: Zap, label: "Fast 2-Minute Application" },
];

const commonReasons = [
  "A car repair or towing bill",
  "An emergency utility bill",
  "A rent or mortgage shortfall",
  "A short-term gap until payday",
  "A dental or vision expense not covered by insurance",
  "A security deposit on a new apartment",
];

const eligibilityRequirements = [
  "Age 18 or older (19+ in some provinces)",
  "Canadian residency and a government-issued ID",
  "An active bank account for e-Transfer or direct deposit",
  "Verifiable monthly income — employment, self-employment, EI, CPP, OAS, or support payments",
];

const speedTable = [
  { when: "Weekday morning before 11am", result: "Same-day, often within 2-4 hours" },
  { when: "Weekday afternoon or evening", result: "Same-day or next business morning" },
  { when: "Weekend or statutory holiday", result: "Next business day" },
];

const checklist = (amount: number) => [
  `Confirm you actually need $${amount} — a smaller amount costs less, a larger amount means less scrambling later`,
  "Check the lender is licensed in your province — provincial regulators (FSRA in Ontario, Consumer Protection BC, and others) publish licensee lists",
  "Compare 2-3 offers — even a small APR difference adds up over the life of the loan",
  "Read the fine print before you apply — origination fees, NSF fees, and prepayment penalties can change the real cost",
  "Have a repayment plan — know which upcoming paycheque covers the payment before you sign",
];

const purposeLinks = [
  "Adoption Expenses",
  "Appliance Replacement",
  "Baby Expenses",
  "Back to School",
  "Birthday & Special Occasions",
  "Business Startup Costs",
];

const creditScoreLinks = [
  "300-559 (Poor)",
  "560-659 (Fair)",
  "660-724 (Good)",
  "725-759 (Very Good)",
  "760-900 (Excellent)",
];

const comparisonLinks = [
  { label: "Personal vs Payday Loan", href: "/resources/comparisons/payday-vs-personal-loans" },
  { label: "Secured vs Unsecured", href: "/resources/comparisons/secured-vs-unsecured-loans" },
  { label: "Fixed vs Variable Rate", href: "/resources/comparisons/fixed-vs-variable-rates" },
  { label: "Loans vs Line of Credit", href: "/resources/comparisons/personal-loans-vs-loc" },
  { label: "Online vs Traditional Lenders", href: "/resources/comparisons/online-vs-traditional-lenders" },
];

const cityLinks = ["Toronto, ON", "Montreal, QC", "Calgary, AB", "Ottawa, ON", "Edmonton, AB", "Vancouver, BC"];

const trackClick = (label: string, slug: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "loan_application_click", {
      event_category: "engagement",
      event_label: label,
      event_source: `loan_amount_${slug}`,
    });
  }
};

const AmountLoanClient = ({ entry }: { entry: LoanAmountEntry }) => {
  const { amount, slug } = entry;
  const otherAmounts = getOtherLoanAmounts(slug);

  const faqItems = [
    {
      question: `Can I get a $${amount} loan with no credit check?`,
      answer:
        "Most Canadian lenders use a soft credit-check pre-approval that doesn't affect your score, though the final approval before funding usually involves a hard check. Lenders advertising a truly \"no credit check\" loan tend to charge much higher rates to offset their risk.",
    },
    {
      question: "Will applying hurt my credit score?",
      answer:
        "Pre-qualification uses a soft pull that never affects your credit. Only a formal application and acceptance of a firm offer triggers a hard inquiry, which may cause a small, temporary dip.",
    },
    {
      question: `Can I pay back $${amount} early without penalty?`,
      answer:
        "Most personal loans allow early repayment without penalty, but confirm this with your lender before signing — some lenders deduct a small early-payment fee.",
    },
    {
      question: `What's the difference between a $${amount} personal loan and a payday loan?`,
      answer: `A personal loan is repaid in installments over months at a rate capped by law at ${CRIMINAL_RATE_APR}% APR, while a payday loan is due in full on your next payday and can carry an effective APR well over 300% once annualized.`,
    },
    {
      question: `How quickly can I get a $${amount} loan?`,
      answer:
        "Many online lenders can approve you within minutes and fund your account by e-Transfer the same business day, provided you apply before their daily cut-off time.",
    },
    {
      question: `What are the requirements for a $${amount} loan?`,
      answer:
        "You'll need to be of legal age in your province, a Canadian resident with a valid ID, have an active bank account, and show verifiable income. Most lenders don't require perfect credit.",
    },
    {
      question: `Can I get a $${amount} loan with bad credit?`,
      answer:
        "Yes. Several Canadian lenders specialize in smaller loans for borrowers with less-than-perfect credit, though your APR will typically land at the higher end of the legal range.",
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
          { label: "Loans by Amount", href: "/loans/by-amount" },
          { label: `I Need to Borrow $${amount} Today` },
        ]}
        icon={DollarSign}
        title={<>I Need to Borrow ${amount} Today — Here&apos;s How (Canada, 2026)</>}
        subtitle={<>Need to borrow ${amount} today in Canada? Apply online in 2 minutes for same-day funding. Bad credit OK, APR capped at {CRIMINAL_RATE_APR}%.</>}
        meta={
          <>
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Same-day funding
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Quick application
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
              onClick={() => trackClick("Amount Page Top CTA", slug)}
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

        <div className="flex justify-center">
          <SocialProof dark />
        </div>
      </DetailHero>

      <DetailLayout
        sidebar={
          <>
            <PurposeLoanCalculator
              purposeLabel={`$${amount}`}
              title={`Estimate Your $${amount} Payment`}
              defaultAmount={amount}
              defaultTerm={24}
              minAmount={100}
              maxAmount={5000}
              disclaimer="Estimate at 19.99% APR. Actual rate may vary (5%-35% APR)."
              guideSlug={`amount-${slug}`}
            />
            <DetailSidebarCta
              applyUrl={APPLY_URL}
              label="Check Your Rate Now"
              onApplyClick={() => trackClick("Amount Page Sidebar CTA", slug)}
            />
          </>
        }
      >
        <div className="space-y-5 font-dm-sans">
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            If you need to borrow ${amount} today in Canada, you have real options. Same-day personal loans are widely available online from lenders and brokers that use a soft credit-check pre-approval, meaning you can compare offers with no impact to your credit score and no in-person bank appointment.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            How to Borrow ${amount} Today: The 3-Step Path
          </h2>
          <div className="relative my-2">
            <div className="absolute left-3.25 top-3 bottom-3 w-0.5" style={{ backgroundColor: "hsl(160,84%,39%,0.2)" }} />
            <div className="space-y-6">
              {[
                {
                  title: "Apply online (2-3 minutes)",
                  body: "Use a Canadian lender or broker that offers soft credit-check pre-approval — no impact to your credit score.",
                },
                {
                  title: "Get a decision in minutes",
                  body: "Most reputable lenders return an answer the same day, often within an hour during business hours.",
                },
                {
                  title: "Receive funds by Interac e-Transfer",
                  body: `Once approved and verified, $${amount} lands in your chequing account — typically same-day if you apply before mid-afternoon on a business day.`,
                },
              ].map((step, index) => (
                <div key={step.title} className="relative flex gap-4">
                  <span
                    className="relative z-10 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
                  >
                    {index + 1}
                  </span>
                  <div className="flex-1 pb-1">
                    <h3 className="font-bold text-base mb-1 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Why ${amount} Is a Common &quot;Today&quot; Amount
          </h2>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            ${amount} is one of the most-searched short-term borrowing amounts because it lines up closely with the cost of:
          </p>
          <ul className="space-y-2.5">
            {commonReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {reason}
                </span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            It&apos;s large enough to actually solve the problem, small enough that you can pay it off without restructuring your budget.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            What a ${amount} Loan Costs in Canada
          </h2>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Under federal law, the Criminal Rate of Interest caps personal loan APRs at {CRIMINAL_RATE_APR}% — legitimate Canadian lenders cannot charge more than that, no matter your credit profile.
          </p>
          <div className="rounded-2xl border overflow-hidden my-2" style={{ borderColor: "hsl(214,20%,90%)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "hsl(210,20%,98%)" }}>
                    <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                      Credit profile
                    </th>
                    <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                      Typical APR range
                    </th>
                    <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                      Monthly payment on ${amount} (12 mo)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {creditTiers.map((tier, index) => {
                    const lowPayment = monthlyPayment(amount, tier.minApr, 12);
                    const highPayment = monthlyPayment(amount, tier.maxApr, 12);
                    return (
                      <tr key={tier.label} style={{ borderTop: index === 0 ? "none" : "1px solid hsl(214,20%,90%)" }}>
                        <td className="p-4 font-medium whitespace-nowrap" style={{ color: "hsl(215,28%,12%)" }}>
                          {tier.label}
                        </td>
                        <td className="p-4" style={{ color: "hsl(215,14%,46%)" }}>
                          {tier.minApr}% - {tier.maxApr}%
                        </td>
                        <td className="p-4" style={{ color: "hsl(215,14%,46%)" }}>
                          ${Math.round(lowPayment)} - ${Math.round(highPayment)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Sample math for a mid-range 20% APR on ${amount}: a 6-month term costs about ${Math.round(monthlyPayment(amount, 20, 6))}/month, a 12-month term about ${Math.round(monthlyPayment(amount, 20, 12))}/month, and a 24-month term about ${Math.round(monthlyPayment(amount, 20, 24))}/month — longer terms lower the payment but increase total interest paid.
          </p>
          <div className="rounded-xl border-l-4 p-4" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
              Avoid payday loans for ${amount}: a typical payday loan costs $15-$21 per $100 borrowed for a two-week term, which annualizes to roughly 390%-546% APR. A personal loan at even the {CRIMINAL_RATE_APR}% legal maximum is dramatically cheaper.
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Who Qualifies for a ${amount} Loan in Canada Today
          </h2>
          <ul className="space-y-2.5">
            {eligibilityRequirements.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            You do <strong>not</strong> need perfect credit. Several Canadian lenders specialize in small personal loans for borrowers with accessible credit, including those rebuilding after a consumer proposal or bankruptcy.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            How Fast Can You Actually Get ${amount}?
          </h2>
          <div className="rounded-2xl border overflow-hidden my-2" style={{ borderColor: "hsl(214,20%,90%)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "hsl(210,20%,98%)" }}>
                    <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                      When you apply
                    </th>
                    <th className="text-left font-semibold p-4 font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                      When funds typically land
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {speedTable.map((row, index) => (
                    <tr key={row.when} style={{ borderTop: index === 0 ? "none" : "1px solid hsl(214,20%,90%)" }}>
                      <td className="p-4 font-medium whitespace-nowrap" style={{ color: "hsl(215,28%,12%)" }}>
                        {row.when}
                      </td>
                      <td className="p-4" style={{ color: "hsl(215,14%,46%)" }}>
                        {row.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Speed depends on three things: how quickly you complete identity verification, whether your bank supports instant Interac e-Transfer, and the lender&apos;s daily funding cut-off time.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Smart Borrowing Checklist Before You Click &quot;Apply&quot;
          </h2>
          <ul className="space-y-2.5">
            {checklist(amount).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              ${amount} Loan FAQ — Canada
            </h2>
            <FaqAccordion items={faqItems} variant="flat" />
          </div>

          <div className="rounded-xl border-l-4 p-4 mt-6" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
              Editorial Note: Our content is reviewed by financial experts for accuracy. We may receive compensation from partner lenders, which does not influence our rankings or recommendations.
            </p>
          </div>
        </div>

        <div
          className="text-center rounded-2xl p-8 mt-16 border"
          style={{ backgroundColor: "hsl(160,84%,39%,0.06)", borderColor: "hsl(160,84%,39%,0.2)" }}
        >
          <h2 className="text-lg font-bold mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Ready to Borrow ${amount} Today?
          </h2>
          <p className="text-sm mb-5 font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
            Check your rate in under 2 minutes with a soft credit check — no impact, no obligation. Compare offers from Canadian lenders that fund ${amount} same-day.
          </p>
          <Button
            asChild
            className="hover:scale-105 active:scale-95"
            style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackClick("Amount Page Ready to Apply", slug)}
            >
              Check Your Rate Now
              <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 font-dm-sans">
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Explore by Loan Purpose
            </h3>
            <ul className="space-y-2 mb-3">
              {purposeLinks.map((label) => (
                <li key={label}>
                  <Link href="/loans/by-purpose" className="text-sm hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/loans/by-purpose" className="text-sm font-medium" style={{ color: "hsl(160,84%,39%)" }}>
              View all purposes →
            </Link>
          </div>
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
            <h3 className="font-bold text-base mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Explore by Credit Score
            </h3>
            <ul className="space-y-2 mb-3">
              {creditScoreLinks.map((label) => (
                <li key={label}>
                  <Link href="/loans/by-credit-score" className="text-sm hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/loans/by-credit-score" className="text-sm font-medium" style={{ color: "hsl(160,84%,39%)" }}>
              View all credit ranges →
            </Link>
          </div>
        </div>

        {otherAmounts.length > 0 && (
          <div className="text-center mt-16">
            <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Other Loan Amounts
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherAmounts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/loans/by-amount/${other.slug}`}
                  className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                  style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
                >
                  ${other.amount}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-lg font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Keep Exploring
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-dm-sans">
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}>
              <h3 className="font-bold text-sm mb-3 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                Browse by Credit Score
              </h3>
              <ul className="space-y-1.5">
                {creditScoreLinks.map((label) => (
                  <li key={label}>
                    <Link href="/loans/by-credit-score" className="text-xs hover:text-[hsl(160,84%,39%)]" style={{ color: "hsl(215,14%,46%)" }}>
                      {label}
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

export default AmountLoanClient;
