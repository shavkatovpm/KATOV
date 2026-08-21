import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { generateFlagshipMetadata } from '@/components/service-detail/flagship-service-page';
import { AdsFlagshipContent } from '@/components/service-detail/ads/ads-flagship-content';

const DATA_SLUG = 'google-ads-xizmati';
const PATH = '/ads';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) return {};
  return generateFlagshipMetadata(DATA_SLUG, PATH, locale as Locale);
}

export default async function AdsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);

  return <AdsFlagshipContent locale={locale as Locale} />;
}
