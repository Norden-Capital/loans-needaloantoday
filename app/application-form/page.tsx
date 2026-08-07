import { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/application-form/application-form";

export const metadata: Metadata = {
  title: "Apply for a Personal Loan Online | NeedALoanToday Canada",
  description:
    "Start your loan application with NeedALoanToday. Compare offers from vetted Canadian lenders and get matched with your best rate in minutes.",
  alternates: {
    canonical: "/application-form",
  },
  keywords: [
    "apply for a loan online canada",
    "needaloantoday application",
    "instant loan application canada",
  ],
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Apply", item: "/application-form" },
  ],
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-15 md:pb-25 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[hsl(160,84%,39%)]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="inline-block text-sm font-medium text-[hsl(160,84%,35%)] px-4 py-1 rounded-full relative"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span
                className="absolute top-0 left-1 w-3 h-3 border-l-2 border-t-2 rounded-tl-sm"
                style={{ borderColor: "hsl(160, 84%, 39%)" }}
              />
              <span
                className="absolute bottom-0 right-1 w-3 h-3 border-r-2 border-b-2 rounded-br-sm"
                style={{ borderColor: "hsl(160, 84%, 39%)" }}
              />
              <span className="uppercase tracking-wider font-semibold">Apply Now</span>
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {"Let's Find Your "}
            <span className="text-[hsl(160,84%,39%)]">Best Loan Rate</span>
          </h1>

          <p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Fill out the quick form below and we&apos;ll match you with vetted Canadian lenders in as
            little as 2 minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[hsl(210,25%,97%)] pt-14 pb-24 lg:pt-16 lg:pb-32">
        <div className="max-w-[560px] mx-auto px-4 lg:px-8 -mt-24 relative z-20">
          <Suspense fallback={<div className="min-h-[450px]" />}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
