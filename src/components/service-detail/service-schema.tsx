import type { ServiceData, ServiceLocalizedContent } from '@/data/services';
import type { Locale } from '@/i18n/config';

interface ServiceSchemaProps {
  service: ServiceData;
  content: ServiceLocalizedContent;
  locale: Locale;
  url: string;
  homeUrl: string;
  servicesIndexUrl: string;
}

// Last broad content review — kept as a constant so AI engines see a
// recent dateModified even between deployments without per-service edits.
const SERVICES_LAST_MODIFIED = '2026-05-16';

export function ServiceSchema({
  service,
  content,
  locale,
  url,
  homeUrl,
  servicesIndexUrl,
}: ServiceSchemaProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: content.h1,
    description: content.metaDescription,
    image: 'https://www.katov.uz/og-image.png',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.katov.uz/#organization',
      name: 'KATOV',
      url: 'https://www.katov.uz',
      logo: 'https://www.katov.uz/og-image.png',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    serviceType: content.breadcrumbServices,
    category: content.breadcrumbServices,
    offers: {
      '@type': 'Offer',
      price: service.basePrice,
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.basePrice,
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false,
      },
    },
    serviceOutput: content.deliverables.map((d) => ({
      '@type': 'Thing',
      name: d,
    })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: content.forWho.map((f) => f.title).join(', '),
    },
    url,
    inLanguage: locale,
    dateModified: SERVICES_LAST_MODIFIED,
    mainEntityOfPage: url,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'uz' ? 'Bosh sahifa' : locale === 'ru' ? 'Главная' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: content.breadcrumbServices,
        item: servicesIndexUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.h1,
        item: url,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: locale,
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-aeo-speakable]'],
    },
  };

  // Make the H1 + hero subtitle voice-friendly — Google Assistant, Yandex Alisa
  // pick this up via the WebPage's speakable spec.
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: content.title,
    description: content.metaDescription,
    inLanguage: locale,
    isPartOf: { '@id': 'https://www.katov.uz/#website' },
    about: { '@id': `${url}#service` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: 'https://www.katov.uz/og-image.png',
    dateModified: SERVICES_LAST_MODIFIED,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-aeo-speakable]'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
