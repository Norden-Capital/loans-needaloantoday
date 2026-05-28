import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { getAlternateMetadata, getBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternateMetadata('/contact', locale),
  };
}

export default async function ContactLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navbar.links" });
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('home') || 'Home', path: '/' },
    { name: t('contact'), path: '/contact' }
  ]);

  return (
    <>
      <Script id="breadcrumb-contact" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      {children}
    </>
  );
}
