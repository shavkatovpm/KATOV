import { Locale, locales } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';

interface StudioLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const seoData: Record<string, { title: string; description: string; keywords: string[] }> = {
  uz: {
    title: 'Studiya',
    description: 'KATOV studiyasi haqida. Professional sayt yaratish xizmatlari, blog maqolalari va foydali vositalar.',
    keywords: ['studiya', 'veb studiya', 'sayt yaratish', 'blog', 'KATOV studiya', 'web studio toshkent'],
  },
  ru: {
    title: 'Студия',
    description: 'О студии KATOV. Профессиональные услуги по созданию сайтов, статьи в блоге и полезные инструменты.',
    keywords: ['студия', 'веб студия', 'создание сайтов', 'блог', 'студия KATOV', 'web студия ташкент'],
  },
  en: {
    title: 'Studio',
    description: 'About KATOV studio. Professional website creation services, blog articles, and useful tools.',
    keywords: ['studio', 'web studio', 'website creation', 'blog', 'KATOV studio', 'web studio tashkent'],
  },
};

export async function generateMetadata({ params }: StudioLayoutProps) {
  const { locale } = await params;
  const data = seoData[locale] || seoData.uz;
  const baseUrl = 'https://katov.uz';

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === 'uz' ? '' : `/${loc}`;
    alternateLanguages[loc] = `${baseUrl}${prefix}/studio`;
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: locale === 'uz' ? `${baseUrl}/studio` : `${baseUrl}/${locale}/studio`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: locale === 'uz' ? `${baseUrl}/studio` : `${baseUrl}/${locale}/studio`,
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

export default function StudioLayout({ children }: StudioLayoutProps) {
  return children;
}
