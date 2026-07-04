'use client';

import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2, Zap, ShieldCheck, TrendingDown } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import HubCTA from "@/components/shared/HubCTA";
import { canadaLocations } from "@/lib/canada-locations";

const microBadges = ["All 10 provinces & 3 territories covered", "Same-day approval available", "PIPEDA-compliant & secure"];

const whyChoose = [
  { icon: Zap, text: "Fast Online Application: Complete your application in just 2 minutes from any device." },
  { icon: CheckCircle2, text: "Compare Multiple Lenders: See offers from several lenders with one application." },
  { icon: ShieldCheck, text: "All Credit Types Welcome: Bad credit, fair credit, or good credit — we have options for everyone." },
  { icon: TrendingDown, text: "No Impact on Credit Score: Checking your rate won't affect your credit score." },
  { icon: Zap, text: "Quick Funding: Funds deposited as soon as the next business day." },
];

const majorCities = [
  "Toronto, Ontario",
  "Vancouver, BC",
  "Calgary, Alberta",
  "Montreal, Quebec",
  "Winnipeg, Manitoba",
  "Halifax, Nova Scotia",
];

const applySteps = [
  "Choose your location — Select your province or city from the list above.",
  "Complete the form — Provide basic information about yourself and the loan amount you need.",
  "Compare offers — Review loan offers from multiple lenders quickly.",
  "Get funded — Accept your preferred offer and have the funds deposited to your account.",
];

const LoansByLocationClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Loans by Location" }]}
        icon={MapPin}
        title={<>Personal Loans Across Canada</>}
        subtitle="Find personal loans from $300 to $5,000 CAD in your province or city. Compare offers with trusted Canadian lenders — bad credit welcome."
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
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          Loans by Province &amp; Territory
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {canadaLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/loans/by-location/${location.slug}`}
              className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <HubIconBox icon={MapPin} size="sm" />
                <ArrowRight
                  className="w-4 h-4 mt-2 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
                  style={{ color: "hsl(215,14%,46%)" }}
                />
              </div>
              <h3 className="font-bold text-base mb-1 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                {location.name}
              </h3>
              <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                Compare local lenders serving {location.cities.length}+ communities.
              </p>
            </Link>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-8 font-dm-sans">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Personal Loans for Canadians in Every Province
            </h2>
            <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
              NeedALoanToday connects Canadians with trusted lenders across the country. Whether you&apos;re in a major city like Toronto, Vancouver, or Montreal, or a smaller community in rural Canada, our network of lenders can help you access the funds you need — quickly and securely.
            </p>
            <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
              Our lenders understand local regulations and provincial lending laws. From Ontario&apos;s consumer protection standards to British Columbia&apos;s payday loan rules, our partners comply with all applicable regulations to ensure a positive borrowing experience.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Why Canadians Choose NeedALoanToday
            </h2>
            <ul className="space-y-2.5">
              {whyChoose.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              Personal Loans in Major Canadian Cities
            </h2>
            <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
              Our lending partners serve Canadians in all of the country&apos;s major cities. The most popular locations for personal loan applications include:
            </p>
            <ul className="space-y-2.5">
              {majorCities.map((city) => (
                <li key={city} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(160,84%,39%)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
              How to Apply for a Personal Loan
            </h2>
            <ol className="space-y-2.5">
              {applySteps.map((step, index) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                    style={{ backgroundColor: "hsl(160,84%,39%,0.1)", color: "hsl(160,84%,39%)" }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "hsl(215,28%,12%)" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <HubCTA />
        </div>
      </div>
    </>
  );
};

export default LoansByLocationClient;
