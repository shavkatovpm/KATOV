import { notFound } from 'next/navigation';
import { getServiceData } from '@/data/services';
import { ServiceSchema } from '../service-schema';
import { ServicePortfolio } from '../service-portfolio';
import { ServiceFAQ } from '../service-faq';
import { ServiceContactForm } from '../service-contact-form';
import { ServiceRelated } from '../service-related';
import { Reveal } from '../reveal';
import { portfolioCategoryLabels, otherServicesLabel } from '../shared-labels';
import { AiSeoHero } from './ai-seo-hero';
import { AiSeoHighlights } from './ai-seo-highlights';
import { AiSeoParallaxBackdrop } from './ai-seo-parallax-backdrop';
import { AiSeoForWho } from './ai-seo-for-who';
import { AiSeoDeliverables } from './ai-seo-deliverables';
import { AiSeoWhyUs } from './ai-seo-why-us';
import type { Locale } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';

const DATA_SLUG = 'aeo-xizmati';
const PATH = '/ai-seo';

interface AiSeoFlagshipContentProps {
  locale: Locale;
}

export function AiSeoFlagshipContent({ locale }: AiSeoFlagshipContentProps) {
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

      <AiSeoParallaxBackdrop>
        <AiSeoHero
          basePrice={service.basePrice}
          priceSuffix={service.priceSuffix}
          content={content}
          ctaHref="#contact"
        />

        <AiSeoHighlights content={content} basePrice={service.basePrice} locale={locale} />
      </AiSeoParallaxBackdrop>

      <AiSeoForWho content={content} />
      <AiSeoDeliverables content={content} />
      <AiSeoWhyUs content={content} />

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
