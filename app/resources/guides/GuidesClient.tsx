'use client';

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import HubIconBox from "@/components/shared/HubIconBox";
import TrustBadges from "@/components/shared/TrustBadges";
import SocialProof from "@/components/shared/SocialProof";
import { guides, guideSectionLabels, type GuideSection } from "@/lib/guides";
import { guideIcons } from "@/lib/guide-icons";

const sectionOrder: GuideSection[] = ["main", "how-to", "regulations", "seasonal"];

const GuidesClient = () => {
  return (
    <>
      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Guides" },
        ]}
        icon={FileText}
        title={<>Canadian Loan Guides</>}
        subtitle="Comprehensive guides to help you navigate the personal loan process in Canada."
        maxWidthClassName="max-w-6xl"
      >
        <div className="mb-8">
          <TrustBadges dark />
        </div>

        <div className="flex justify-center">
          <SocialProof dark />
        </div>
      </DetailHero>

      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {sectionOrder.map((section) => {
          const items = guides.filter((g) => g.section === section);
          if (items.length === 0) return null;

          return (
            <div key={section} className="mb-16 last:mb-0">
              {section !== "main" && (
                <h2 className="text-xl sm:text-2xl font-bold mb-6 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                  {guideSectionLabels[section]}
                </h2>
              )}
              <div className="flex flex-wrap gap-6">
                {items.map(({ slug, title, description, icon }) => {
                  const Icon = guideIcons[icon];
                  return (
                    <Link
                      key={slug}
                      href={`/resources/guides/${slug}`}
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
                      <h3 className="font-bold text-base mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
                        {description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
};

export default GuidesClient;
