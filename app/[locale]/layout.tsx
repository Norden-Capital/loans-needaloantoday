import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Space_Grotesk } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import MainLayout from "@/components/layout/main-layout";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google';
import { getAlternateMetadata } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: "NeedALoanToday" }],
    creator: "NeedALoanToday",
    publisher: "NeedALoanToday",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://needaloantoday.ca'),
    alternates: getAlternateMetadata('/', locale),
    openGraph: {
      type: "website",
      url: "https://needaloantoday.ca/",
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: "NeedALoanToday",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "NeedALoanToday - Fast Personal Loans Canada",
        },
      ],
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
    },
    twitter: {
      card: "summary_large_image",
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ["/og-image.jpg"],
      creator: "@needaloantoday",
    },
    icons: {
      apple: [
        { url: "/logo.svg" },
      ],
    },
    manifest: "/site.webmanifest",
    other: {
      "contact": "hello@needaloantoday.com",
      "phone": "+1-800-555-LOAN",
      "geo.region": "CA",
      "geo.placename": "Canada",
      "ICBM": "43.6532, -79.3832",
      "geo.position": "43.6532;-79.3832",
      "business:contact_data:country_name": "Canada",
      "business:contact_data:locality": "Toronto",
      "business:contact_data:region": "ON",
      "revisit-after": "7 days",
      "language": locale === 'fr' ? 'French' : 'English',
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>


        {/* Structured Data - FinancialService */}
        <Script id="schema-financial-service" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "NeedALoanToday",
            "alternateName": "Need A Loan Today",
            "url": "https://needaloantoday.ca",
            "logo": "https://needaloantoday.ca/logo.png",
            "image": "https://needaloantoday.ca/og-image.jpg",
            "description": locale === 'fr' 
              ? "Prêts personnels rapides et faciles au Canada avec des taux compétitifs, approbation instantanée par IA et financement le jour même."
              : "Fast and easy personal loans in Canada with competitive rates, instant AI-powered approval, and same-day funding.",
            "email": "hello@needaloantoday.com",
            "telephone": "+1-800-555-LOAN",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "areaServed": { "@type": "Country", "name": "Canada" },
            "serviceType": [
              "Personal Loans", "Quick Loans", "Instant Loans", "Same-Day Loans", 
              "Online Loans", "Emergency Loans", "Bad Credit Loans", 
              "Home Loans", "Business Loans", "Education Loans", "Auto Loans"
            ],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50000",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </Script>

        {/* Structured Data - Organization */}
        <Script id="schema-organization" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NeedALoanToday",
            "url": "https://needaloantoday.ca",
            "logo": "https://needaloantoday.ca/logo.png",
            "foundingDate": "2016",
            "slogan": "Get Funds Faster Than Ever Before",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-800-555-LOAN",
                "contactType": "customer service",
                "areaServed": "CA",
                "availableLanguage": ["English", "French"]
              }
            ]
          })}
        </Script>

        {/* Structured Data - FAQ */}
        <Script id="schema-faq" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Object.values((messages as any).faq.categories).flatMap((cat: any) => 
              cat.questions.map((faq: any) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            )
          })}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-space-grotesk" suppressHydrationWarning>
        <GoogleAnalytics gaId="G-VCW7MGPC1S" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainLayout>
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
