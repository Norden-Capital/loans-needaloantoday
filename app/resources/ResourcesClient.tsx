'use client';

import Link from "next/link";
import { Calculator, Scale, BookOpen, HelpCircle, Grid3x3, ArrowRight } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import HubCTA from "@/components/shared/HubCTA";

const resources = [
  {
    icon: Calculator,
    title: "Tools",
    description: "Calculators and helpful tools to plan your loan and repayments.",
    href: "/resources/tools",
  },
  {
    icon: Scale,
    title: "Comparisons",
    description: "Compare personal loans against credit cards, lines of credit, and more.",
    href: "/resources/comparisons",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "Step-by-step guides on credit scores, eligibility, and borrowing responsibly.",
    href: "/resources/guides",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Common questions about applying for and repaying a personal loan.",
    href: "/resources/faq",
  },
];

const ResourcesClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        icon={Grid3x3}
        title={<>Resources</>}
        subtitle="Tools, guides, and answers to help you make an informed borrowing decision."
        maxWidthClassName="max-w-5xl"
      />

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-wrap justify-center gap-6">
            {resources.map(({ icon: Icon, title, description, href }) => (
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
                      className="w-4 h-4 shrink-0 transition-colors duration-300 group-hover:text-[hsl(160,84%,39%)]"
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

export default ResourcesClient;
