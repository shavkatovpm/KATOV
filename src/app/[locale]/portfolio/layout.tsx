import { setRequestLocale } from 'next-intl/server';
import { Locale, locales } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';

interface PortfolioLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const portfolioItems = [
  {
    name: 'Darslinker',
    url: 'https://darslinker.uz',
    description: {
      uz: "Onlayn ta'limni tizimlashtirish platformasi",
      ru: 'Платформа для систематизации онлайн-обучения',
      en: 'Online learning systematization platform',
    },
  },
  {
    name: 'Getolog',
    url: 'https://getolog.uz',
    description: {
      uz: 'Yopiq Telegram kanallarini avtomatlashtirish',
      ru: 'Автоматизация закрытых Telegram-каналов',
      en: 'Closed Telegram channels automation',
    },
  },
  {
    name: 'Uzbektype',
    url: 'https://uzbektype.uz',
    description: {
      uz: "Tez va to'g'ri yozishni tekshirish",
      ru: 'Проверка скорости и точности набора текста',
      en: 'Typing speed and accuracy test',
    },
  },
];

const seoData: Record<string, { title: string; description: string; keywords: string[] }> = {
  uz: {
    title: 'Loyihalar',
    description: 'KATOV tomonidan amalga oshirilgan loyihalar portfoliosi. Bizning ishlarimiz va mijozlarimiz uchun yaratgan veb-saytlarimiz.',
    keywords: ['portfolio', 'loyihalar', 'bajarilgan ishlar', 'veb-sayt namunalari', 'KATOV portfolio', 'bizning ishlarimiz'],
  },
  ru: {
    title: 'Портфолио',
    description: 'Портфолио проектов, реализованных KATOV. Наши работы и веб-сайты, созданные для наших клиентов.',
    keywords: ['портфолио', 'проекты', 'выполненные работы', 'примеры сайтов', 'портфолио KATOV', 'наши работы'],
  },
  en: {
    title: 'Portfolio',
    description: 'Portfolio of projects completed by KATOV. Our work and websites created for our clients.',
    keywords: ['portfolio', 'projects', 'completed works', 'website examples', 'KATOV portfolio', 'our work'],
  },
};

export async function generateMetadata({ params }: PortfolioLayoutProps) {
  const { locale } = await params;
  const data = seoData[locale] || seoData.uz;
  const baseUrl = 'https://www.katov.uz';

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === 'uz' ? '' : `/${loc}`;
    alternateLanguages[loc] = `${baseUrl}${prefix}/portfolio`;
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: locale === 'uz' ? `${baseUrl}/portfolio` : `${baseUrl}/${locale}/portfolio`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: locale === 'uz' ? `${baseUrl}/portfolio` : `${baseUrl}/${locale}/portfolio`,
      type: 'website',
      siteName: 'KATOV',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : 'uz_UZ',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 1200,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: data.title,
      description: data.description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function PortfolioLayout({ children, params }: PortfolioLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (locale as Locale) ?? 'uz';
  const url = localizedUrl(loc, '/portfolio');
  const homeUrl = localizedUrl(loc);
  const data = seoData[loc] ?? seoData.uz;

  const breadcrumbHome =
    loc === 'uz' ? 'Bosh sahifa' : loc === 'ru' ? 'Главная' : 'Home';
  const breadcrumbPortfolio =
    loc === 'uz' ? 'Loyihalar' : loc === 'ru' ? 'Портфолио' : 'Portfolio';

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: data.title,
        description: data.description,
        inLanguage: loc,
        isPartOf: { '@id': 'https://www.katov.uz/#website' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: portfolioItems.length,
          itemListElement: portfolioItems.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'CreativeWork',
              name: item.name,
              url: item.url,
              description: item.description[loc],
              creator: { '@id': 'https://www.katov.uz/#organization' },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbPortfolio, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {children}
    </>
  );
}
