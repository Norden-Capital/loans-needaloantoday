'use client';

import { useMemo, useState } from "react";
import { Calculator, DollarSign, Percent, CalendarDays, ArrowRight, ShieldCheck } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const MIN_AMOUNT = 200;
const MAX_AMOUNT = 5000;
const MIN_APR = 5;
const MAX_APR = 35;
const MIN_TERM = 6;
const MAX_TERM = 72;

const RING_RADIUS = 40;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_GAP_DEGREES = 3;

const sliderColorClasses =
  "[&_[data-slot=slider-track]]:bg-[hsl(214,20%,90%)] [&_[data-slot=slider-range]]:bg-[hsl(214,20%,90%)] [&_[data-slot=slider-thumb]]:bg-[hsl(160,84%,39%)] [&_[data-slot=slider-thumb]]:border-[hsl(160,84%,39%)]";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const ToolsClient = () => {
  const [amount, setAmount] = useState(2500);
  const [apr, setApr] = useState(15);
  const [term, setTerm] = useState(24);
  const [hoveredSegment, setHoveredSegment] = useState<"principal" | "interest" | null>(null);

  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    const monthly =
      monthlyRate === 0
        ? amount / term
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
          (Math.pow(1 + monthlyRate, term) - 1);
    const total = monthly * term;

    return {
      monthlyPayment: monthly,
      totalPayment: total,
      totalInterest: total - amount,
    };
  }, [amount, apr, term]);

  const principalShare = (amount / totalPayment) * 100;

  const availableDegrees = 360 - RING_GAP_DEGREES * 2;
  const principalDegrees = (principalShare / 100) * availableDegrees;
  const interestDegrees = availableDegrees - principalDegrees;
  const principalArcLength = (principalDegrees / 360) * RING_CIRCUMFERENCE;
  const interestArcLength = (interestDegrees / 360) * RING_CIRCUMFERENCE;
  const interestArcOffset = -((principalDegrees + RING_GAP_DEGREES) / 360) * RING_CIRCUMFERENCE;

  return (
    <>
      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Calculator" },
        ]}
        icon={Calculator}
        title={<>Canadian Loan Calculator</>}
        subtitle="Estimate your monthly payments and total loan cost with our easy-to-use calculator."
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="rounded-2xl border p-6 sm:p-8 space-y-8"
            style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
          >
            <h2 className="font-bold text-lg font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Loan Details
            </h2>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-sm font-medium font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
                  <DollarSign className="w-4 h-4" style={{ color: "hsl(160,84%,39%)" }} />
                  Loan Amount
                </span>
                <span className="text-lg font-bold font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                  {formatCurrency(amount)}
                </span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step={100}
                className={sliderColorClasses}
              />
              <div className="flex justify-between mt-2 text-xs font-dm-sans" style={{ color: "hsl(215,14%,60%)" }}>
                <span>{formatCurrency(MIN_AMOUNT)}</span>
                <span>{formatCurrency(MAX_AMOUNT)}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-sm font-medium font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
                  <Percent className="w-4 h-4" style={{ color: "hsl(160,84%,39%)" }} />
                  Interest Rate (APR)
                  <Badge
                    variant="secondary"
                    className="h-4 px-1.5 text-[10px] font-normal"
                    style={{ backgroundColor: "hsl(210,20%,95%)", color: "hsl(215,28%,12%)" }}
                  >
                    Max {MAX_APR}%
                  </Badge>
                </span>
                <span className="text-lg font-bold font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                  {apr}%
                </span>
              </div>
              <Slider
                value={[apr]}
                onValueChange={([v]) => setApr(v)}
                min={MIN_APR}
                max={MAX_APR}
                step={0.5}
                className={sliderColorClasses}
              />
              <div className="flex justify-between mt-2 text-xs font-dm-sans" style={{ color: "hsl(215,14%,60%)" }}>
                <span>{MIN_APR}%</span>
                <span>{MAX_APR}%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-sm font-medium font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
                  <CalendarDays className="w-4 h-4" style={{ color: "hsl(160,84%,39%)" }} />
                  Loan Term
                </span>
                <span className="text-lg font-bold font-space-grotesk" style={{ color: "hsl(160,84%,39%)" }}>
                  {term} months
                </span>
              </div>
              <Slider
                value={[term]}
                onValueChange={([v]) => setTerm(v)}
                min={MIN_TERM}
                max={MAX_TERM}
                step={6}
                className={sliderColorClasses}
              />
              <div className="flex justify-between mt-2 text-xs font-dm-sans" style={{ color: "hsl(215,14%,60%)" }}>
                <span>{MIN_TERM} months</span>
                <span>{MAX_TERM} months</span>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col bg-[hsl(215,28%,12%)]"
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="calc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#calc-grid)" />
            </svg>
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[hsl(160,84%,39%)]/10 blur-3xl pointer-events-none" />

            <h2 className="relative font-bold text-lg mb-4 font-space-grotesk text-white">
              Your Estimate
            </h2>

            <div className="relative rounded-xl p-4 bg-white/5 border border-white/10">
              <p className="text-sm font-dm-sans text-white/60">
                Monthly Payment
              </p>
              <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[hsl(160,84%,39%)]">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>

            <div className="relative mx-auto my-6 w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="hsl(160,84%,39%)"
                  strokeWidth="12"
                  strokeDasharray={`${principalArcLength} ${RING_CIRCUMFERENCE}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSegment("principal")}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="12"
                  strokeDasharray={`${interestArcLength} ${RING_CIRCUMFERENCE}`}
                  strokeDashoffset={interestArcOffset}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSegment("interest")}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              </svg>
              {hoveredSegment && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-center pointer-events-none bg-[hsl(215,28%,12%)] border border-white/15">
                  <p className="text-[10px] font-medium whitespace-nowrap font-dm-sans text-white/80">
                    {hoveredSegment === "principal"
                      ? `Principal: ${formatCurrency(amount)}`
                      : `Interest: ${formatCurrency(totalInterest)}`}
                  </p>
                </div>
              )}
            </div>
            <div className="relative flex justify-center gap-4 text-xs mb-6 font-dm-sans">
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="w-2.5 h-2.5 rounded-sm bg-[hsl(160,84%,39%)]" />Principal
              </span>
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="w-2.5 h-2.5 rounded-sm bg-white/15" />Interest
              </span>
            </div>

            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                <p className="text-xs font-dm-sans text-white/60">
                  Total Payment
                </p>
                <p className="text-base font-semibold font-space-grotesk text-white">
                  {formatCurrency(totalPayment)}
                </p>
              </div>
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                <p className="text-xs font-dm-sans text-white/60">
                  Total Interest
                </p>
                <p className="text-base font-semibold font-space-grotesk text-white">
                  {formatCurrency(totalInterest)}
                </p>
              </div>
            </div>

            <p className="relative text-xs mt-4 leading-relaxed font-dm-sans text-white/40">
              * This is an estimate only. Actual rates and terms may vary based on your creditworthiness and lender policies.
            </p>

            <div className="relative mt-6">
              <Button
                asChild
                size="lg"
                className="w-full rounded-xl ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-[hsl(215,28%,12%)] hover:scale-[1.02] active:scale-95"
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
                        event_label: 'Calculator CTA Button',
                        event_source: 'tools_page',
                      });
                    }
                  }}
                >
                  Check Your Real Rate
                  <ArrowRight />
                </a>
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-center mt-3 font-dm-sans text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[hsl(160,84%,39%)]" />
                No-Impact Credit Check: Comparing offers won&apos;t affect your score
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 sm:mt-20 font-dm-sans">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            How to Use This Loan Calculator
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: "hsl(215,14%,46%)" }}>
            Our free loan calculator helps you estimate your monthly payment before you apply. Adjust the sliders above to match your desired loan amount, interest rate, and repayment term, and the calculator instantly shows what you&apos;d pay each month, plus the total cost over the life of the loan.
          </p>

          <h3 className="text-xl font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            What Factors Affect Your Monthly Payment?
          </h3>
          <p className="leading-relaxed mb-4" style={{ color: "hsl(215,14%,46%)" }}>
            Three things determine your monthly payment: how much you borrow (the principal), the annual percentage rate (APR) you&apos;re offered, and how long you take to repay the loan (the term). Borrowing more or accepting a higher APR increases your payment, while a longer term lowers your monthly payment but increases the total interest you&apos;ll pay over time.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: "hsl(215,14%,46%)" }}>
            Your credit profile plays a major role in the APR a lender offers you. Borrowers with stronger credit typically qualify for lower rates, while those with limited or lower credit scores may see higher rates. That&apos;s why checking your rate with a soft credit pull, which won&apos;t affect your score, is a useful first step before committing to an offer.
          </p>

          <h3 className="text-xl font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Tips for Getting Better Rates
          </h3>
          <ul className="space-y-3 mb-6 list-disc pl-5" style={{ color: "hsl(215,14%,46%)" }}>
            <li className="leading-relaxed">
              <strong style={{ color: "hsl(215,28%,12%)" }}>Check your credit report first.</strong> Look for errors that could be dragging your score down unnecessarily. Even a small correction can improve the rate you&apos;re offered.
            </li>
            <li className="leading-relaxed">
              <strong style={{ color: "hsl(215,28%,12%)" }}>Compare offers from multiple lenders.</strong> Rates vary significantly between lenders, so comparing a few options helps you find the most competitive one for your situation.
            </li>
            <li className="leading-relaxed">
              <strong style={{ color: "hsl(215,28%,12%)" }}>Consider a shorter term if you can afford it.</strong> A shorter term means a higher monthly payment, but you&apos;ll pay less interest overall.
            </li>
            <li className="leading-relaxed">
              <strong style={{ color: "hsl(215,28%,12%)" }}>Borrow only what you need.</strong> It&apos;s tempting to round up &quot;just in case,&quot; but every dollar you borrow accrues interest.
            </li>
            <li className="leading-relaxed">
              <strong style={{ color: "hsl(215,28%,12%)" }}>Time your application thoughtfully.</strong> If you&apos;re close to paying off other debt or expecting your credit to improve soon, waiting a little longer could help you qualify for a better rate.
            </li>
          </ul>

          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Keep in mind that the numbers above are only an estimate. Your actual rate and terms depend on your full financial profile and the lender you&apos;re matched with. To see personalized offers without affecting your credit score, click &quot;Check Your Real Rate&quot; above.
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default ToolsClient;
