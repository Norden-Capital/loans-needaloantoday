'use client';

import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import { comparisons } from "@/lib/comparisons";
import { comparisonIcons } from "@/lib/comparison-icons";

const ComparisonsClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Comparisons" },
        ]}
        icon={Scale}
        title={<>Loan Comparisons — Canada</>}
        subtitle="Side-by-side comparisons to help you choose the right borrowing option in Canada."
        maxWidthClassName="max-w-6xl"
      />

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-wrap justify-center gap-6">
            {comparisons.map(({ slug, title, description, icon }) => {
              const Icon = comparisonIcons[icon];
              return (
                <Link
                  key={slug}
                  href={`/resources/comparisons/${slug}`}
                  className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "hsl(214,20%,90%)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <HubIconBox icon={Icon} size="sm" />
                    <ArrowRight
                      className="w-4 h-4 mt-2 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
                      style={{ color: "hsl(215,14%,46%)" }}
                    />
                  </div>
                  <h2 className="font-bold text-base mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                    {description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonsClient;
