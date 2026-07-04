'use client';

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const DEFAULT_ESTIMATE_APR = 19.99;
const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const sliderColorClasses =
  "[&_[data-slot=slider-track]]:bg-white/15 [&_[data-slot=slider-range]]:bg-[hsl(160,84%,39%)] [&_[data-slot=slider-thumb]]:bg-[hsl(160,84%,39%)] [&_[data-slot=slider-thumb]]:border-white";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const PurposeLoanCalculator = ({
  purposeLabel,
  defaultAmount,
  defaultTerm,
  minAmount = 500,
  maxAmount = 5000,
  minTerm = 6,
  maxTerm = 72,
  guideSlug,
  title,
  disclaimer,
  lockAmount = false,
  estimateApr = DEFAULT_ESTIMATE_APR,
}: {
  purposeLabel: string;
  defaultAmount: number;
  defaultTerm: number;
  minAmount?: number;
  maxAmount?: number;
  minTerm?: number;
  maxTerm?: number;
  guideSlug: string;
  title?: string;
  disclaimer?: string;
  lockAmount?: boolean;
  estimateApr?: number;
}) => {
  const [amount, setAmount] = useState(defaultAmount);
  const [term, setTerm] = useState(defaultTerm);

  const monthlyPayment = useMemo(() => {
    const r = estimateApr / 100 / 12;
    return (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  }, [amount, term, estimateApr]);

  return (
    <div className="relative overflow-hidden mx-auto w-full max-w-md rounded-2xl p-6 text-left font-dm-sans bg-[hsl(215,28%,12%)]">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="purpose-calc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#purpose-calc-grid)" />
      </svg>
      <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[hsl(160,84%,39%)]/10 blur-3xl pointer-events-none" />

      <h3 className="relative font-bold text-base mb-4 text-center font-space-grotesk text-white">
        {title ?? `Estimate Your ${purposeLabel} Payment`}
      </h3>

      <div className="relative space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">
              Loan Amount
            </span>
            <span className="text-sm font-semibold text-white">
              {formatCurrency(amount)}
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={([value]) => setAmount(value)}
            min={minAmount}
            max={maxAmount}
            step={100}
            disabled={lockAmount}
            className={sliderColorClasses}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">
              Loan Term
            </span>
            <span className="text-sm font-semibold text-white">
              {term} months
            </span>
          </div>
          <Slider
            value={[term]}
            onValueChange={([value]) => setTerm(value)}
            min={minTerm}
            max={maxTerm}
            step={6}
            className={sliderColorClasses}
          />
        </div>

        <div className="rounded-xl p-4 text-center bg-white/5 border border-white/10">
          <p className="text-xs mb-1 text-white/60">
            Estimated Monthly Payment
          </p>
          <p className="text-2xl font-bold font-space-grotesk text-[hsl(160,84%,39%)]">
            {formatCurrency(monthlyPayment)}
            <span className="text-sm font-normal">/mo</span>
          </p>
          <p className="text-[11px] mt-1 text-white/40">
            {disclaimer ?? `Based on ${estimateApr}% APR for ${purposeLabel.toLowerCase()} loans in Canada`}
          </p>
        </div>

        <Button
          asChild
          className="w-full rounded-xl ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-[hsl(215,28%,12%)] hover:scale-[1.02] active:scale-95"
          style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
        >
          <a
            href={APPLY_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "loan_application_click", {
                  event_category: "engagement",
                  event_label: "Purpose Calculator CTA",
                  event_source: `guide_${guideSlug}`,
                });
              }
            }}
          >
            Check Your Rate — No Credit Impact
            <ArrowRight />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PurposeLoanCalculator;
