'use client';

import Link from "next/link";
import { MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import DetailHero from "@/components/shared/DetailHero";
import DetailLayout from "@/components/shared/DetailLayout";
import DetailSidebarCta from "@/components/shared/DetailSidebarCta";
import TrustBadges from "@/components/shared/TrustBadges";
import ContentBlocks, { findFaqBlock } from "@/components/shared/ContentBlocks";
import CTASection from "@/components/home/cta-section";
import type { ArticleContent } from "@/lib/content-blocks";
import type { CanadaLocation } from "@/lib/canada-locations";
import { getOtherProvinces } from "@/lib/canada-locations";

const APPLY_URL = "https://cmi.rocks/go/6a0768c8e9dee?affiliate_sub1=needaloantoday";

const relatedRegulationGuides: Record<string, string> = {
  ontario: "lending-regulations-ontario",
  alberta: "lending-regulations-alberta",
  "british-columbia": "lending-regulations-british-columbia",
  quebec: "lending-regulations-quebec",
  manitoba: "lending-regulations-manitoba",
};

const primarySources: Record<string, { name: string; url: string }> = {
  ontario: { name: "Ontario.ca — Payday Loans: Your Rights", url: "https://www.ontario.ca/page/payday-loan-your-rights" },
  alberta: { name: "Alberta.ca — Payday Loans", url: "https://www.alberta.ca/payday-loans" },
  "british-columbia": {
    name: "Consumer Protection BC — Payday Loans",
    url: "https://www.consumerprotectionbc.ca/consumer-help/consumer-information-payday-loans/",
  },
  quebec: { name: "Office de la protection du consommateur", url: "https://www.opc.gouv.qc.ca/" },
  manitoba: { name: "Manitoba Consumer Protection Office — Payday Loans", url: "https://www.gov.mb.ca/cp/cpo/info/payday.html" },
  saskatchewan: {
    name: "Financial and Consumer Affairs Authority of Saskatchewan",
    url: "https://fcaa.gov.sk.ca/regulated-businesses-persons/businesses/payday-lenders/compliance-with-legislation",
  },
  "nova-scotia": { name: "Government of Nova Scotia — Payday Loans: Your Rights", url: "https://www.novascotia.ca/payday-loans-your-rights" },
  "new-brunswick": { name: "FCNB — Payday Loans", url: "https://fcnb.ca/en/personal-finances/payday-loans" },
  "newfoundland-and-labrador": { name: "Government of Newfoundland and Labrador", url: "https://www.gov.nl.ca" },
  "prince-edward-island": {
    name: "Government of Prince Edward Island — Payday Loans Act",
    url: "https://www.princeedwardisland.ca/sites/default/files/legislation/P-02-1-Payday%20Loans%20Act.pdf",
  },
  "northwest-territories": {
    name: "Financial Consumer Agency of Canada — Payday Loans",
    url: "https://www.canada.ca/en/financial-consumer-agency/services/loans/payday-loans.html",
  },
  yukon: {
    name: "Financial Consumer Agency of Canada — Payday Loans",
    url: "https://www.canada.ca/en/financial-consumer-agency/services/loans/payday-loans.html",
  },
  nunavut: {
    name: "Financial Consumer Agency of Canada — Payday Loans",
    url: "https://www.canada.ca/en/financial-consumer-agency/services/loans/payday-loans.html",
  },
};

const ProvinceLocationClient = ({
  province,
  content,
}: {
  province: CanadaLocation;
  content: ArticleContent;
}) => {
  const otherProvinces = getOtherProvinces(province.slug);
  const faqBlock = findFaqBlock(content.blocks);
  const relatedGuideSlug = relatedRegulationGuides[province.slug];
  const primarySource = primarySources[province.slug];

  return (
    <>
      {faqBlock && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqBlock.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}

      <DetailHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Loans by Location", href: "/loans/by-location" },
          { label: province.name },
        ]}
        icon={MapPin}
        title={<>Personal Loans in {province.name}</>}
        subtitle={content.subtitle}
        meta={
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> All credit types welcome
          </span>
        }
      >
        <div className="mt-6 mb-2">
          <TrustBadges dark />
        </div>
      </DetailHero>

      <DetailLayout sidebar={<DetailSidebarCta applyUrl={APPLY_URL} label="Check Your Rate Now" />}>
        <div className="font-dm-sans">
          <ContentBlocks blocks={content.blocks} />
        </div>

        <div className="rounded-2xl border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-6 font-dm-sans" style={{ borderColor: "hsl(214,20%,90%)" }}>
          <span style={{ color: "hsl(215,14%,46%)" }}>
            <strong style={{ color: "hsl(215,28%,12%)" }}>First Published:</strong> April 13, 2026
          </span>
          <span style={{ color: "hsl(215,14%,46%)" }}>
            <strong style={{ color: "hsl(215,28%,12%)" }}>Last Updated:</strong> April 13, 2026
          </span>
          <span style={{ color: "hsl(215,14%,46%)" }}>
            <strong style={{ color: "hsl(215,28%,12%)" }}>Reviewed by:</strong> NeedALoanToday Editorial Team
          </span>
          <span style={{ color: "hsl(215,14%,46%)" }}>
            <strong style={{ color: "hsl(215,28%,12%)" }}>Next Review:</strong> January 2027
          </span>
        </div>

        <div className="rounded-xl border-l-4 p-4 mt-4" style={{ backgroundColor: "hsl(160,84%,39%,0.08)", borderColor: "hsl(160,84%,39%)" }}>
          <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
            Editorial Note: Our content is reviewed by financial experts for accuracy. We may receive compensation from partner lenders, which does not influence our rankings or recommendations.
          </p>
        </div>

        {primarySource && (
          <p className="text-xs mt-3 font-dm-sans" style={{ color: "hsl(215,14%,60%)" }}>
            Primary source:{" "}
            <a
              href={primarySource.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline hover:text-[hsl(160,84%,39%)]"
            >
              {primarySource.name}
            </a>
          </p>
        )}

        {relatedGuideSlug && (
          <div className="rounded-xl border p-4 mt-4" style={{ borderColor: "hsl(214,20%,90%)" }}>
            <p className="text-sm leading-relaxed font-dm-sans" style={{ color: "hsl(215,28%,12%)" }}>
              For a deeper look at provincial lending rules, read our full{" "}
              <Link href={`/resources/guides/${relatedGuideSlug}`} className="font-medium hover:underline" style={{ color: "hsl(160,84%,39%)" }}>
                {province.name} Lending Regulations Guide
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Communities We Serve in {province.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {province.cities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-dm-sans"
                style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,14%,46%)" }}
              >
                <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(160,84%,39%)" }} />
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-lg font-bold mb-4 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
            Other Provinces &amp; Territories
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherProvinces.map((p) => (
              <Link
                key={p.slug}
                href={`/loans/by-location/${p.slug}`}
                className="rounded-full border px-4 py-2 text-sm font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }}
              >
                {p.name}
              </Link>
            ))}
          </div>
          <Link href="/loans/by-location" className="text-sm font-medium mt-3 inline-block" style={{ color: "hsl(160,84%,39%)" }}>
            View all locations →
          </Link>
        </div>
      </DetailLayout>

      <CTASection />
    </>
  );
};

export default ProvinceLocationClient;
