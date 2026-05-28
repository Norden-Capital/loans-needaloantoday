"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const PrivacyPage = () => {
  const t = useTranslations("privacy");

  const protectionFeatures = [
    { icon: Lock, text: t("hero.features.encryption") },
    { icon: Shield, text: t("hero.features.security") },
    { icon: Eye, text: t("hero.features.transparency") },
  ];

  const sections = [
    {
      title: t("sections.dataProtection.title"),
      content: t("sections.dataProtection.content")
    },
    {
      title: t("sections.internalAccess.title"),
      content: t("sections.internalAccess.content"),
      subtext: t("sections.internalAccess.subtext"),
      list: [
        t("sections.internalAccess.list.0"),
        t("sections.internalAccess.list.1"),
        t("sections.internalAccess.list.2"),
        t("sections.internalAccess.list.3")
      ]
    },
    {
      title: t("sections.thirdParty.title"),
      content: t("sections.thirdParty.content"),
      list: [
        t("sections.thirdParty.list.0"),
        t("sections.thirdParty.list.1"),
        t("sections.thirdParty.list.2"),
        t("sections.thirdParty.list.3"),
        t("sections.thirdParty.list.4")
      ],
      footer: t("sections.thirdParty.footer")
    },
    {
      title: t("sections.multiLender.title"),
      content: t("sections.multiLender.content"),
      subtext: t("sections.multiLender.subtext")
    },
    {
      title: t("sections.phoneAuth.title"),
      content: t("sections.phoneAuth.content"),
      list: [
        t("sections.phoneAuth.list.0"),
        t("sections.phoneAuth.list.1"),
        t("sections.phoneAuth.list.2"),
        t("sections.phoneAuth.list.3"),
        t("sections.phoneAuth.list.4")
      ],
      footer: t("sections.phoneAuth.footer")
    },
    {
      title: t("sections.emailAuth.title"),
      content: t("sections.emailAuth.content"),
      list: [
        t("sections.emailAuth.list.0"),
        t("sections.emailAuth.list.1"),
        t("sections.emailAuth.list.2"),
        t("sections.emailAuth.list.3"),
        t("sections.emailAuth.list.4")
      ],
      footer: t("sections.emailAuth.footer")
    },
    {
      title: t("sections.retention.title"),
      content: t("sections.retention.content")
    },
    {
      title: t("sections.cookies.title"),
      content: t("sections.cookies.content")
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-15 md:pb-25 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="privacy-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V0h32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-grid)" />
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
              <Shield className="w-4 h-4 text-[hsl(160,84%,39%)]" />
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
              className="text-white/60 text-lg mb-8 font-dm-sans"
            >
              {t("hero.description")}
            </p>

            <p 
              className="text-white/80 text-sm font-dm-sans"
            >
              {t("hero.acceptance")}
            </p>
          </motion.div>

          {/* Protection Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12 max-w-2xl mx-auto"
          >
            {protectionFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm"
              >
                <feature.icon className="w-4 h-4 text-[hsl(160,84%,39%)]" />
                <span 
                  className="text-white text-sm font-medium font-dm-sans"
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
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
              transition={{ delay: index * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(160,84%,39%)]/20 to-[hsl(160,84%,39%)]/5 flex items-center justify-center shrink-0 mt-1"
                >
                  <FileText className="w-5 h-5 text-[hsl(160,84%,39%)]" />
                </div>
                <div className="flex-1">
                  <h2 
                    className="text-2xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk"
                  >
                    {section.title}
                  </h2>
                  <p 
                    className="text-[hsl(215,14%,46%)] leading-relaxed mb-4 font-dm-sans"
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

                  {section.list && (
                    <ul className="space-y-3 mb-4">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[hsl(160,84%,39%)] shrink-0 mt-0.5" />
                          <span 
                            className="text-[hsl(215,14%,46%)] font-dm-sans"
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
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

      {/* Your Rights */}
      <section className="py-16 bg-[hsl(210,25%,97%)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[hsl(214,20%,90%)] shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(160,84%,39%)]/20 to-[hsl(160,84%,39%)]/5 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-[hsl(160,84%,39%)]" />
              </div>
              <div className="flex-1">
                <h2 
                  className="text-2xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk"
                >
                  {t("rights.title")}
                </h2>
                <p 
                  className="text-[hsl(215,14%,46%)] leading-relaxed font-dm-sans"
                >
                  {t("rights.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white border-t border-[hsl(214,20%,90%)]">
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
            href="mailto:privacy@needaloantoday.com"
            className="inline-flex items-center gap-2 bg-[hsl(160,84%,39%)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[hsl(160,84%,35%)] transition-colors font-dm-sans shadow-lg shadow-primary/20"
          >
            <Mail className="w-5 h-5" />
            privacy@needaloantoday.com
          </a>
          <p 
            className="text-[hsl(215,14%,46%)] text-sm mt-8 font-dm-sans"
          >
            {t("contact.updated")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
