import { notFound } from 'next/navigation';
import { getServiceData } from '@/data/services';
import { ServiceSchema } from '../service-schema';
import { ServicePortfolio } from '../service-portfolio';
import { ServiceFAQ } from '../service-faq';
import { ServiceContactForm } from '../service-contact-form';
import { ServiceRelated } from '../service-related';
import { Reveal } from '../reveal';
import { portfolioCategoryLabels, otherServicesLabel } from '../shared-labels';
import { SeoHero } from './seo-hero';
import { SeoHighlights } from './seo-highlights';
import { SeoParallaxBackdrop } from './seo-parallax-backdrop';
import { SeoForWho } from './seo-for-who';
import { SeoDeliverables } from './seo-deliverables';
import { SeoWhyUs } from './seo-why-us';
import type { Locale } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';

const DATA_SLUG = 'seo-xizmati';
const PATH = '/seo';

interface SeoFlagshipContentProps {
  locale: Locale;
}

export function SeoFlagshipContent({ locale }: SeoFlagshipContentProps) {
  const data = getServiceData(DATA_SLUG, locale);
  if (!data) notFound();

  const { service, content } = data;
  const url = localizedUrl(locale, PATH);
  const homeUrl = localizedUrl(locale);
  const servicesIndexUrl = localizedUrl(locale, '/services');

  const categoryLabel = (id: string) => portfolioCategoryLabels[locale]?.[id] ?? id;

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

      <SeoParallaxBackdrop>
        <SeoHero
          basePrice={service.basePrice}
          priceSuffix={service.priceSuffix}
          content={content}
          ctaHref="#contact"
        />

        <SeoHighlights content={content} basePrice={service.basePrice} locale={locale} />
      </SeoParallaxBackdrop>

      <SeoForWho content={content} />
      <SeoDeliverables content={content} />
      <SeoWhyUs content={content} />

      <Reveal>
        <ServicePortfolio content={content} categoryLabel={categoryLabel} />
      </Reveal>

      <Reveal>
        <ServiceFAQ content={content} />
      </Reveal>

      <Reveal>
        <ServiceRelated currentSlug={DATA_SLUG} locale={locale} title={otherServicesLabel[locale]} />
      </Reveal>

      <Reveal>
        <ServiceContactForm
          serviceTitle={content.h1}
          serviceIcon={service.icon}
          basePrice={service.basePrice}
          priceSuffix={service.priceSuffix}
          content={content}
        />
      </Reveal>
    </>
  );
}
