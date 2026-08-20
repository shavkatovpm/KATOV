import { hasLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { buildFlagshipOgImage, ogImageSize } from '@/components/service-detail/flagship-og-image';

export const alt = 'KATOV — SEO xizmati';
export const size = ogImageSize;
export const contentType = 'image/png';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function SeoOgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    return new Response('Not found', { status: 404 });
  }
  return buildFlagshipOgImage('seo-xizmati', locale as Locale);
}
