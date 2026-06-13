"use client";

import { motion } from "framer-motion";
import { Scale, FileText, AlertCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const TermsPage = () => {
  const t = useTranslations("terms");

  const sections = [
    {
      number: "1",
      title: t("sections.jurisdiction.title"),
      content: t("sections.jurisdiction.content")
    },
    {
      number: "2",
      title: t("sections.important.title"),
      content: t("sections.important.content")
    },
    {
      number: "3",
      title: t("sections.definitions.title"),
      content: t("sections.definitions.content")
    },
    {
      number: "4",
      title: t("sections.agreement.title"),
      content: t("sections.agreement.content")
    },
    {
      number: "5",
      title: t("sections.electronic.title"),
      content: t("sections.electronic.content")
    },
    {
      number: "6",
      title: t("sections.dispute.title"),
      content: t("sections.dispute.content")
    },
    {
      number: "7",
      title: t("sections.records.title"),
      content: t("sections.records.content")
    },
    {
      number: "8",
      title: t("sections.verification.title"),
      content: t("sections.verification.content"),
      subtext: t("sections.verification.subtext"),
      footer: t("sections.verification.footer")
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-15 md:pb-25 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="terms-hex" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,14.4 50,28.9 25,43.3 0,28.9 0,14.4" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#terms-hex)" />
        </svg>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[hsl(160,84%,39%)]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[hsl(160,84%,39%)]/10 px-4 py-2 rounded-full mb-6">
              <Scale className="w-4 h-4 text-[hsl(160,84%,39%)]" />
              <span 
                className="text-[hsl(160,84%,39%)] text-sm font-semibold font-dm-sans"
              >
                {t("hero.badge")}
              </span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-space-grotesk"
            >
              {t("hero.title")}
            </h1>

            <p 
              className="text-white/60 text-lg font-dm-sans"
            >
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-[hsl(210,25%,97%)] border-y border-[hsl(214,20%,90%)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-[hsl(160,84%,39%)]/20 shadow-sm">
            <AlertCircle className="w-6 h-6 text-[hsl(160,84%,39%)] shrink-0 mt-1" />
            <div>
              <h3 
                className="font-bold text-[hsl(215,28%,12%)] mb-2 font-space-grotesk"
              >
                {t("notice.heading")}
              </h3>
              <p 
                className="text-[hsl(215,14%,46%)] text-sm leading-relaxed font-dm-sans"
              >
                {t("notice.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-10 last:mb-0"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(160,84%,39%)]/20 to-[hsl(160,84%,39%)]/5 flex items-center justify-center shrink-0 mt-1"
                >
                  <span 
                    className="text-[hsl(160,84%,39%)] font-bold text-lg font-space-grotesk"
                  >
                    {section.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 
                    className="text-xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk"
                  >
                    {section.title}
                  </h2>
                  <p 
                    className="text-[hsl(215,14%,46%)] leading-relaxed mb-3 font-dm-sans"
                  >
                    {section.content}
                  </p>

                  {section.subtext && (
                    <p 
                      className="text-[hsl(215,14%,46%)] leading-relaxed mb-3 font-dm-sans"
                    >
                      {section.subtext}
                    </p>
                  )}

                  {section.footer && (
                    <p 
                      className="text-[hsl(215,14%,46%)] leading-relaxed text-sm bg-[hsl(210,25%,97%)] p-4 rounded-lg border-l-4 border-[hsl(160,84%,39%)] font-dm-sans"
                    >
                      {section.footer}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-[hsl(210,25%,97%)]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Mail className="w-12 h-12 text-[hsl(160,84%,39%)] mx-auto mb-4" />
          <h3 
            className="text-2xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk"
          >
            {t("contact.heading")}
          </h3>
          <p 
            className="text-[hsl(215,14%,46%)] mb-6 font-dm-sans"
          >
            {t("contact.description")}
          </p>
          <a 
            href="mailto:legal@needaloantoday.com"
            className="inline-flex items-center gap-2 bg-[hsl(160,84%,39%)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[hsl(160,84%,35%)] transition-colors font-dm-sans shadow-lg shadow-primary/20"
          >
            <Mail className="w-5 h-5" />
            legal@needaloantoday.com
          </a>
          <p 
            className="text-[hsl(215,14%,46%)] text-sm mt-8 font-dm-sans"
          >
            {t("contact.updated")}
          </p>
        </div>
      </section>

      {/* Acceptance Reminder */}
      <section className="py-12 bg-white border-t border-[hsl(214,20%,90%)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[hsl(210,25%,97%)] rounded-xl p-6 text-center">
            <p 
              className="text-[hsl(215,14%,46%)] text-sm leading-relaxed font-dm-sans"
            >
              {t("acceptance")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
