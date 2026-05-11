import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import {
  getServicesCatalog,
  servicesIndexCopy,
} from '@/data/services';
import { ServiceCard } from '@/components/service-detail/service-card';

const SITE_URL = 'https://katov.uz';

interface ServicesIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesIndexProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) return {};

  const copy = servicesIndexCopy[locale as Locale];
  const canonical = `${SITE_URL}/${locale}/services`;
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE_URL}/${loc}/services`;
  }
  languages['x-default'] = `${SITE_URL}/uz/services`;

  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: { canonical, languages },
    openGraph: {
      title: copy.title,
      description: copy.metaDescription,
      url: canonical,
      siteName: 'KATOV',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ServicesIndexPage({ params }: ServicesIndexProps) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const loc = locale as Locale;
  const copy = servicesIndexCopy[loc];
  const catalog = getServicesCatalog();
  const url = `${SITE_URL}/${locale}/services`;
  const homeUrl = `${SITE_URL}/${locale}`;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: copy.h1,
    description: copy.metaDescription,
    numberOfItems: catalog.length,
    itemListElement: catalog.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/${locale}/services/${item.slug}`,
      name: item.card[loc].title,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name:
          loc === 'uz' ? 'Bosh sahifa' : loc === 'ru' ? 'Главная' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: copy.h1,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="section-padding pt-32 sm:pt-36">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              {copy.h1}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {catalog.map((item) => (
              <ServiceCard
                key={item.slug}
                slug={item.slug}
                icon={item.icon}
                title={item.card[loc].title}
                description={item.card[loc].description}
                basePrice={item.basePrice}
                priceSuffix={item.priceSuffix}
                available={item.available}
                href={`/${locale}/services/${item.slug}`}
                fromLabel={copy.fromLabel}
                comingSoonBadge={copy.comingSoonBadge}
                cardCta={copy.cardCta}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
