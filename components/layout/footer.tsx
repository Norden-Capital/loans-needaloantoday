"use client";

import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin, ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations();

  const footerLinks = {
    Company: [
      { label: t("footer.links.company.about"), href: "/about" },
      { label: t("footer.links.company.resources"), href: "/coming-soon" },
      { label: t("footer.links.company.loans"), href: "/coming-soon" },
      { label: t("footer.links.company.blog"), href: "/coming-soon" },
    ],
    Products: [
      { label: t("footer.links.products.home"), href: "/coming-soon" },
      { label: t("footer.links.products.business"), href: "/coming-soon" },
      { label: t("footer.links.products.education"), href: "/coming-soon" },
      { label: t("footer.links.products.personal"), href: "/coming-soon" },
    ],
    Support: [
      { label: t("footer.links.support.helpCenter"), href: "/contact" },
      { label: t("footer.links.support.contact"), href: "/contact" },
      { label: t("footer.links.support.faq"), href: "/#faq" },
      { label: t("footer.links.support.feedback"), href: "/#testimonials" },
    ],
    Legal: [
      { label: t("footer.links.legal.privacy"), href: "/privacy" },
      { label: t("footer.links.legal.terms"), href: "/terms" },
    ],
  };

  return (
    <footer className="bg-[hsl(215,28%,12%)] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(160,84%,39%)]/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <Link 
              href="/" 
              className="inline-block"
            >
              <Image 
                src="/logo2.svg" 
                alt="NeedALoanToday" 
                width={200}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
            <p 
              className="text-white/50 text-sm mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {t("footer.tagline")}
            </p>
            
            {/* Contact Information */}
            <div className="mt-6 space-y-3 flex flex-col items-center lg:items-start">
              <div 
                className="flex items-center gap-2 text-white/40 text-xs"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <Phone size={14} className="text-[hsl(160,84%,39%)]/60" />
                +1 (800) 555-LOAN
              </div>
              <div 
                className="flex items-center gap-2 text-white/40 text-xs"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <Mail size={14} className="text-[hsl(160,84%,39%)]/60" />
                hello@needaloantoday.com
              </div>
              <div 
                className="flex items-center gap-2 text-white/40 text-xs"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <MapPin size={14} className="text-[hsl(160,84%,39%)]/60" />
                {t("footer.contact.location")}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-center lg:text-left">
              <h4 
                className="font-semibold text-white mb-4 text-sm"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {t(`footer.sections.${title.toLowerCase()}`)}
              </h4>
              <ul className="space-y-2 flex flex-col items-center lg:items-start">
                {links.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                      <Link 
                        href={link.href as any} 
                        className="text-sm text-white/50 hover:text-[hsl(160,84%,39%)] transition-colors"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="text-sm text-white/50 hover:text-[hsl(160,84%,39%)] transition-colors"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Email Subscription Form - Only in Legal Column */}
              {title === "Legal" && (
                <form className="relative mt-6">
                  <input
                    type="email"
                    placeholder={t("footer.newsletter.placeholder")}
                    className="w-full px-4 py-3 pr-12 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent outline-none transition-all"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[hsl(160,84%,39%)] text-white rounded-md hover:bg-[hsl(160,84%,35%)] transition-all flex items-center justify-center"
                    aria-label={t("footer.newsletter.subscribe")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[hsl(160,84%,39%)]/20 flex items-center justify-center">
              <Zap className="w-3 h-3 text-[hsl(160,84%,39%)]" fill="currentColor" />
            </div>
          </div>
          <p 
            className="text-sm text-white/40"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
