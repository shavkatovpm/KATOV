import { Locale, locales } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';

interface PriceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const seoData: Record<string, { title: string; description: string; keywords: string[] }> = {
  uz: {
    title: 'Sayt narxini hisoblash — Onlayn kalkulyator',
    description: 'Sayt narxini onlayn hisoblang. Sayt turini, funksiyalarni va dizayn darajasini tanlang — taxminiy narx va muddatni ko\'ring.',
    keywords: ['sayt narxi', 'sayt narxini hisoblash', 'website narxi', 'sayt yaratish narxi', 'veb-sayt kalkulyator', 'sayt buyurtma berish'],
  },
  ru: {
    title: 'Рассчитать стоимость сайта — Онлайн калькулятор',
    description: 'Рассчитайте стоимость сайта онлайн. Выберите тип сайта, функции и уровень дизайна — узнайте примерную цену и сроки.',
    keywords: ['стоимость сайта', 'рассчитать стоимость сайта', 'цена сайта', 'калькулятор сайта', 'заказать сайт', 'создание сайта цена'],
  },
  en: {
    title: 'Calculate Website Price — Online Calculator',
    description: 'Calculate your website price online. Select the site type, features, and design level — get an estimated price and timeline.',
    keywords: ['website price', 'calculate website cost', 'website calculator', 'web development pricing', 'order website', 'website cost estimator'],
  },
};

export async function generateMetadata({ params }: PriceLayoutProps) {
  const { locale } = await params;
  const data = seoData[locale] || seoData.uz;
  const baseUrl = 'https://katov.uz';

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === 'uz' ? '' : `/${loc}`;
    alternateLanguages[loc] = `${baseUrl}${prefix}/studio/price`;
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: locale === 'uz' ? `${baseUrl}/studio/price` : `${baseUrl}/${locale}/studio/price`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: locale === 'uz' ? `${baseUrl}/studio/price` : `${baseUrl}/${locale}/studio/price`,
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

export default function PriceLayout({ children }: PriceLayoutProps) {
  return children;
}
