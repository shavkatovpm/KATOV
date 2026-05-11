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
    name: content.h1,
    description: content.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'KATOV',
      url: 'https://katov.uz',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    serviceType: content.breadcrumbServices,
    offers: {
      '@type': 'Offer',
      price: service.basePrice,
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock',
    },
    url,
    inLanguage: locale,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
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
