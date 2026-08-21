import { notFound } from 'next/navigation';
import { getServiceData } from '@/data/services';
import { ServiceSchema } from '../service-schema';
import { ServicePortfolio } from '../service-portfolio';
import { ServiceFAQ } from '../service-faq';
import { ServiceContactForm } from '../service-contact-form';
import { ServiceRelated } from '../service-related';
import { Reveal } from '../reveal';
import { portfolioCategoryLabels, otherServicesLabel } from '../shared-labels';
import { AdsHero } from './ads-hero';
import { AdsHighlights } from './ads-highlights';
import { AdsParallaxBackdrop } from './ads-parallax-backdrop';
import { AdsForWho } from './ads-for-who';
import { AdsDeliverables } from './ads-deliverables';
import { AdsWhyUs } from './ads-why-us';
import type { Locale } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';

const DATA_SLUG = 'google-ads-xizmati';
const PATH = '/ads';

interface AdsFlagshipContentProps {
  locale: Locale;
}

export function AdsFlagshipContent({ locale }: AdsFlagshipContentProps) {
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

      <AdsParallaxBackdrop>
        <AdsHero
          basePrice={service.basePrice}
          priceSuffix={service.priceSuffix}
          content={content}
          ctaHref="#contact"
        />

        <AdsHighlights content={content} basePrice={service.basePrice} locale={locale} />
      </AdsParallaxBackdrop>

      <AdsForWho content={content} />
      <AdsDeliverables content={content} />
      <AdsWhyUs content={content} />

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
