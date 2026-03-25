import { Locale, locales } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}

const validSlugs = ['website', 'crm', 'telegram', 'seo'];

const seoData: Record<string, Record<string, { title: string; description: string; keywords: string[] }>> = {
  website: {
    uz: {
      title: 'Website xizmatlari — KATOV',
      description: 'Professional website yaratish xizmatlari. Biznesingizga mijoz olib keladigan va ishonch beradigan sayt yaratamiz.',
      keywords: ['website yaratish', 'sayt yaratish', 'web sayt', 'professional sayt', 'KATOV'],
    },
    en: {
      title: 'Website Services — KATOV',
      description: 'Professional website development services. We create websites that bring customers and build trust.',
      keywords: ['website development', 'web design', 'professional website', 'KATOV'],
    },
    ru: {
      title: 'Создание сайтов — KATOV',
      description: 'Профессиональные услуги по созданию сайтов. Создаем сайты, которые привлекают клиентов и вызывают доверие.',
      keywords: ['создание сайтов', 'веб разработка', 'профессиональный сайт', 'KATOV'],
    },
  },
  crm: {
    uz: {
      title: 'CRM / ERP tizimlar — KATOV',
      description: 'Biznes jarayonlarini avtomatlashtiruvchi CRM va ERP tizimlar ishlab chiqamiz.',
      keywords: ['CRM', 'ERP', 'biznes avtomatlashtirish', 'admin panel', 'KATOV'],
    },
    en: {
      title: 'CRM / ERP Systems — KATOV',
      description: 'We build CRM and ERP systems that automate your business processes.',
      keywords: ['CRM', 'ERP', 'business automation', 'admin panel', 'KATOV'],
    },
    ru: {
      title: 'CRM / ERP системы — KATOV',
      description: 'Разрабатываем CRM и ERP системы для автоматизации бизнес-процессов.',
      keywords: ['CRM', 'ERP', 'автоматизация бизнеса', 'админ панель', 'KATOV'],
    },
  },
  telegram: {
    uz: {
      title: 'Telegram botlar — KATOV',
      description: 'Mijozlar bilan 24/7 ishlaydigan va sotuvni avtomatlashtiradigan Telegram botlar yaratamiz.',
      keywords: ['telegram bot', 'sotuv bot', 'bot yaratish', 'telegram bot toshkent', 'KATOV'],
    },
    en: {
      title: 'Telegram Bots — KATOV',
      description: 'We create Telegram bots that work 24/7 with customers and automate sales.',
      keywords: ['telegram bot', 'sales bot', 'bot development', 'KATOV'],
    },
    ru: {
      title: 'Телеграм боты — KATOV',
      description: 'Создаем Telegram ботов, которые работают 24/7 с клиентами и автоматизируют продажи.',
      keywords: ['телеграм бот', 'бот продаж', 'создание ботов', 'KATOV'],
    },
  },
  seo: {
    uz: {
      title: 'SEO xizmatlari — KATOV',
      description: 'Google orqali bepul trafik va mijoz olib keladigan SEO strategiya quramiz.',
      keywords: ['SEO', 'SEO xizmatlari', 'Google optimizatsiya', 'sayt optimizatsiya', 'KATOV'],
    },
    en: {
      title: 'SEO Services — KATOV',
      description: 'We build SEO strategies that bring free traffic and customers through Google.',
      keywords: ['SEO', 'SEO services', 'Google optimization', 'search optimization', 'KATOV'],
    },
    ru: {
      title: 'SEO услуги — KATOV',
      description: 'Строим SEO стратегии, которые приводят бесплатный трафик и клиентов через Google.',
      keywords: ['SEO', 'SEO услуги', 'оптимизация Google', 'поисковая оптимизация', 'KATOV'],
    },
  },
};

export async function generateMetadata({ params }: ServiceLayoutProps) {
  const { locale, slug } = await params;
  const slugData = seoData[slug];
  if (!slugData) return {};

  const data = slugData[locale] || slugData.uz;
  const baseUrl = 'https://katov.uz';

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === 'uz' ? '' : `/${loc}`;
    alternateLanguages[loc] = `${baseUrl}${prefix}/service/${slug}`;
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: locale === 'uz' ? `${baseUrl}/service/${slug}` : `${baseUrl}/${locale}/service/${slug}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: locale === 'uz' ? `${baseUrl}/service/${slug}` : `${baseUrl}/${locale}/service/${slug}`,
      type: 'website',
      siteName: 'KATOV',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : 'uz_UZ',
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 1200, alt: data.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: data.title,
      description: data.description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
