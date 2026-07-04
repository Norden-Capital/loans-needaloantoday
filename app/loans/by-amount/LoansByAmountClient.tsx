'use client';

import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import HubCTA from "@/components/shared/HubCTA";
import { loanAmounts } from "@/lib/loan-amounts";

const LoansByAmountClient = () => {
  const sortedAmounts = [...loanAmounts].sort((a, b) => a.amount - b.amount);

  return (
    <>
      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Loans", href: "/loans" },
          { label: "By Amount" },
        ]}
        icon={DollarSign}
        title={<>Loans by Amount</>}
        subtitle="Find out exactly what it costs to borrow the amount you need in Canada, from $300 to $5,000."
        maxWidthClassName="max-w-5xl"
      />

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-wrap justify-center gap-6">
            {sortedAmounts.map(({ amount, slug }) => (
              <Link
                key={slug}
                href={`/loans/by-amount/${slug}`}
                className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
                style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <HubIconBox icon={DollarSign} size="sm" />
                  <ArrowRight
                    className="w-4 h-4 mt-2 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
                    style={{ color: "hsl(215,14%,46%)" }}
                  />
                </div>
                <h2 className="font-bold text-base mb-1 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                  ${amount} Loan
                </h2>
                <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                  See costs, requirements, and same-day options for a ${amount} loan.
                </p>
              </Link>
            ))}
          </div>

          <HubCTA />
        </div>
      </div>
    </>
  );
};

export default LoansByAmountClient;
