'use client';

import { ArrowRight } from "lucide-react";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const HubCTA = () => {
  return (
    <div
      className="rounded-3xl px-6 sm:px-10 py-12 sm:py-16 text-center mt-12 sm:mt-16 lg:mt-20"
      style={{ backgroundColor: "hsl(160,84%,39%,0.08)" }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
        Ready to Find Your Perfect Loan?
      </h2>
      <p className="mt-4 max-w-xl mx-auto leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
        Compare loan options from trusted Canadian lenders. Checking your rate won&apos;t affect your credit score.
      </p>
      <div className="mt-8">
        <a
          href={APPLY_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "loan_application_click", {
                event_category: "engagement",
                event_label: "Hub CTA Button",
                event_source: "hub_cta",
              });
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold font-space-grotesk transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95"
          style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
        >
          Check Your Rate Now
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default HubCTA;
