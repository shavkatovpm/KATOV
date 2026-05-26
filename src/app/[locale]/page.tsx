import type { Metadata } from 'next';
import { Locale, locales } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';
import HomeContent from './home-content';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

const homeMeta: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: "KATOV — Toshkentdagi IT agentligi: sayt, bot, SEO, AEO",
    description:
      "KATOV — sayt yaratish, Telegram bot, SEO va AEO xizmatlari Toshkentda. Landing page, korporativ sayt, internet do'kon, CRM/ERP — 3 tilda (uz/ru/en).",
  },
  ru: {
    title: 'KATOV — IT-агентство в Ташкенте: сайт, бот, SEO, AEO',
    description:
      'KATOV — создание сайтов, Telegram-боты, SEO и AEO в Ташкенте. Лендинг, корпоративный сайт, интернет-магазин, CRM/ERP на 3 языках (uz/ru/en).',
  },
  en: {
    title: 'KATOV — IT agency in Tashkent: web, bots, SEO, AEO',
    description:
      'KATOV — website development, Telegram bots, SEO and AEO services in Tashkent. Landing, corporate sites, e-commerce, CRM/ERP. UZ/RU/EN.',
  },
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = homeMeta[locale] ?? homeMeta.uz;
  const canonical = localizedUrl(locale);
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localizedUrl(loc);
  languages['x-default'] = localizedUrl('uz');

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'KATOV',
      locale,
      type: 'website',
      images: [{ url: 'https://www.katov.uz/og-image.png', width: 1200, height: 1200, alt: 'KATOV' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://www.katov.uz/og-image.png'],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const url = localizedUrl(locale);
  const meta = homeMeta[locale] ?? homeMeta.uz;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: locale,
        isPartOf: { '@id': 'https://www.katov.uz/#website' },
        about: { '@id': 'https://www.katov.uz/#organization' },
        primaryImageOfPage: 'https://www.katov.uz/og-image.png',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-aeo-speakable]'],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <HomeContent />
    </>
  );
}
