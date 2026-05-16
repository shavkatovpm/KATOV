import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { getServiceData, getAllServiceSlugs } from '@/data/services';
import { ServiceHero } from '@/components/service-detail/service-hero';
import { ServiceForWho } from '@/components/service-detail/service-for-who';
import { ServiceDeliverables } from '@/components/service-detail/service-deliverables';
import { ServiceProcess } from '@/components/service-detail/service-process';
import { ServiceWhyUs } from '@/components/service-detail/service-why-us';
import { ServicePortfolio } from '@/components/service-detail/service-portfolio';
import { ServiceFAQ } from '@/components/service-detail/service-faq';
import { ServiceContactForm } from '@/components/service-detail/service-contact-form';
import { ServiceSchema } from '@/components/service-detail/service-schema';
import { ServiceRelated } from '@/components/service-detail/service-related';
import { localizedUrl } from '@/lib/urls';

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locales, locale)) return {};

  const data = getServiceData(slug, locale as Locale);
  if (!data) return {};

  const { content } = data;
  const canonical = localizedUrl(locale as Locale, `/services/${slug}`);
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localizedUrl(loc, `/services/${slug}`);
  }
  languages['x-default'] = localizedUrl('uz', `/services/${slug}`);

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: canonical,
      siteName: 'KATOV',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
    },
  };
}

const portfolioCategoryLabels: Record<Locale, Record<string, string>> = {
  uz: {
    darslinker: "Onlayn ta'limni tizimlashtirish platformasi",
    getolog: 'Yopiq Telegram kanallarini avtomatlashtirish',
    uzbektype: "Tez va to'g'ri yozishni tekshirish",
  },
  ru: {
    darslinker: 'Платформа для систематизации онлайн-обучения',
    getolog: 'Автоматизация закрытых Telegram-каналов',
    uzbektype: 'Проверка скорости и точности набора текста',
  },
  en: {
    darslinker: 'Online learning systematization platform',
    getolog: 'Closed Telegram channels automation',
    uzbektype: 'Typing speed and accuracy test',
  },
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const data = getServiceData(slug, locale as Locale);
  if (!data) notFound();

  const { service, content } = data;
  const url = localizedUrl(locale as Locale, `/services/${slug}`);
  const homeUrl = localizedUrl(locale as Locale);
  const servicesIndexUrl = localizedUrl(locale as Locale, '/services');

  const categoryLabel = (id: string) =>
    portfolioCategoryLabels[locale as Locale]?.[id] ?? id;

  return (
    <>
      <ServiceSchema
        service={service}
        content={content}
        locale={locale as Locale}
        url={url}
        homeUrl={homeUrl}
        servicesIndexUrl={servicesIndexUrl}
      />

      <ServiceHero
        icon={service.icon}
        basePrice={service.basePrice}
        priceSuffix={service.priceSuffix}
        content={content}
        ctaHref="#contact"
      />

      <ServiceForWho content={content} />
      <ServiceDeliverables content={content} />
      <ServiceProcess content={content} />
      <ServiceWhyUs content={content} />

      <ServicePortfolio
        content={content}
        categoryLabel={categoryLabel}
      />

      <ServiceFAQ content={content} />

      <ServiceRelated
        currentSlug={slug}
        locale={locale as Locale}
        title={
          locale === 'uz'
            ? 'Boshqa xizmatlarimiz'
            : locale === 'ru'
            ? 'Другие наши услуги'
            : 'Other services'
        }
      />

      <ServiceContactForm
        serviceTitle={content.h1}
        serviceIcon={service.icon}
        basePrice={service.basePrice}
        priceSuffix={service.priceSuffix}
        content={content}
      />
    </>
  );
}
