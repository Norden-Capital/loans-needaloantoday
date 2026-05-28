import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternateMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.terms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternateMetadata('/terms', locale),
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
