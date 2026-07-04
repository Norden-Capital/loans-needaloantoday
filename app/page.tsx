import HeroSection from "@/components/home/hero-section";
import PartnersMarquee from "@/components/home/partners-marquee";
import FeaturesSection from "@/components/home/features-section";
import FeaturesShowcaseSection from "@/components/home/features-showcase-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import LoanTypesSection from "@/components/home/loan-types-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import FAQSection from "@/components/home/faq-section";
import CTASection from "@/components/home/cta-section";
import { faqCategories } from "@/lib/faq-data";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((cat) =>
              cat.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              }))
            ),
          }),
        }}
      />
      <HeroSection />
      <PartnersMarquee />
      <FeaturesSection />
      <FeaturesShowcaseSection />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <LoanTypesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
