import { Locale, locales } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';

interface PortfolioLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

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
  const baseUrl = 'https://katov.uz';

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

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return children;
}
