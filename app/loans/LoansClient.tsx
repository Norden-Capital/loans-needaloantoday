'use client';

import Link from "next/link";
import { DollarSign, Target, CreditCard, FileText, MapPin, List, ArrowRight } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import HubCTA from "@/components/shared/HubCTA";

const loanCategories = [
  {
    icon: DollarSign,
    title: "By Amount",
    description: "$300 - $5,000 loans matched to how much you need.",
    href: "/loans/by-amount",
  },
  {
    icon: Target,
    title: "By Purpose",
    description: "Debt consolidation, emergencies, and more.",
    href: "/loans/by-purpose",
  },
  {
    icon: CreditCard,
    title: "By Credit Score",
    description: "Find loans that fit your credit range.",
    href: "/loans/by-credit-score",
  },
  {
    icon: FileText,
    title: "By Type",
    description: "Personal, emergency, and same-day loans.",
    href: "/loans/by-type",
  },
  {
    icon: MapPin,
    title: "By Location",
    description: "Loans available across Canada.",
    href: "/loans/by-location",
  },
];

const LoansClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Loans" }]}
        icon={List}
        title={<>All Loan Options</>}
        subtitle="Browse personal loans by amount, purpose, credit score, type, or location to find the option that fits you."
        maxWidthClassName="max-w-5xl"
      />

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-wrap justify-center gap-6">
            {loanCategories.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl p-6 border flex items-start gap-4 transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
                style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
              >
                <HubIconBox icon={Icon} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-bold text-lg font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                      {title}
                    </h2>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 transition-colors group-hover:text-[hsl(160,84%,39%)]"
                      style={{ color: "hsl(215,14%,46%)" }}
                    />
                  </div>
                  <p className="text-sm mt-1 font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                    {description}
                  </p>
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

export default LoansClient;
