'use client';

import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import HubCTA from "@/components/shared/HubCTA";
import { creditScoreRanges } from "@/lib/credit-scores";

const microBadges = ["All credit types welcome", "Same-day approval available", "Secure application"];

const LoansByCreditScoreClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Loans by Credit Score" }]}
        icon={TrendingUp}
        title={<>Loans by Credit Score</>}
        subtitle="Find loans that match your credit profile"
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
        <div className="max-w-3xl mx-auto space-y-4 mb-12 font-dm-sans">
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Your credit score affects the loan terms you&apos;re offered — but it doesn&apos;t have to stop you from getting funded. Canadian lenders offer options for every credit range, from excellent (740+) to poor (below 580).
          </p>
          <p className="leading-relaxed" style={{ color: "hsl(215,14%,46%)" }}>
            Select your credit score range below to see lenders who specialize in your tier. You&apos;ll find estimated APR ranges, approval tips, and credit-building strategies. Checking your rate through our platform won&apos;t impact your score.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
          Browse Loans by Credit Score
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {creditScoreRanges.map(({ slug, label }) => (
            <Link
              key={slug}
              href={`/loans/by-credit-score/${slug}`}
              className="group w-full sm:w-[calc(50%-0.75rem)] rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
            >
              <div className="flex items-center gap-4">
                <HubIconBox icon={TrendingUp} size="sm" />
                <div className="flex-1">
                  <h3 className="font-bold text-base font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                    Credit Score {label}
                  </h3>
                  <p className="text-sm font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                    Lenders for your credit level
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
                  style={{ color: "hsl(215,14%,46%)" }}
                />
              </div>
            </Link>
          ))}
        </div>

        <HubCTA />
        </div>
      </div>
    </>
  );
};

export default LoansByCreditScoreClient;
