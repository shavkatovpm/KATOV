import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceData } from '@/data/services';
import { ServiceHero } from './service-hero';
import { ServiceForWho } from './service-for-who';
import { ServiceDeliverables } from './service-deliverables';
import { ServiceProcess } from './service-process';
import { ServiceWhyUs } from './service-why-us';
import { ServicePortfolio } from './service-portfolio';
import { ServiceFAQ } from './service-faq';
import { ServiceContactForm } from './service-contact-form';
import { ServiceSchema } from './service-schema';
import { ServiceRelated } from './service-related';
import { portfolioCategoryLabels, otherServicesLabel } from './shared-labels';
import { locales, type Locale } from '@/i18n/config';
import { localizedUrl, ogLocale } from '@/lib/urls';

// A handful of services (SEO, AI SEO, website creation) moved off
// /services/[slug] onto their own top-level, keyword-first URL. This
// renders the exact same layout as a regular service page — only the
// canonical path and data lookup key differ — so all three new routes
// stay a few lines each instead of tripling the /services/[slug] logic.
//
// /seo has since forked onto its own bespoke composition
// (service-detail/seo/seo-flagship-content.tsx); this component still
// serves /ai-seo and /sayt-yaratish until they get the same treatment.

export async function generateFlagshipMetadata(
  dataSlug: string,
  path: string,
  locale: Locale
): Promise<Metadata> {
  const data = getServiceData(dataSlug, locale);
  if (!data) return {};

  const { content } = data;
  const canonical = localizedUrl(locale, path);
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localizedUrl(loc, path);
  }
  languages['x-default'] = localizedUrl('uz', path);

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
      locale: ogLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
    },
  };
}

interface FlagshipServicePageProps {
  dataSlug: string;
  path: string;
  locale: Locale;
}

export function FlagshipServicePage({ dataSlug, path, locale }: FlagshipServicePageProps) {
  const data = getServiceData(dataSlug, locale);
  if (!data) notFound();

  const { service, content } = data;
  const url = localizedUrl(locale, path);
  const homeUrl = localizedUrl(locale);
  const servicesIndexUrl = localizedUrl(locale, '/services');

  const categoryLabel = (id: string) =>
    portfolioCategoryLabels[locale]?.[id] ?? id;

  return (
    <>
      <ServiceSchema
        service={service}
        content={content}
        locale={locale}
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
        currentSlug={dataSlug}
        locale={locale}
        title={otherServicesLabel[locale]}
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
