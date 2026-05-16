import { iconMap } from './icon-map';
import type { IconName, ServiceLocalizedContent } from '@/data/services';

interface ServiceHeroProps {
  icon: IconName;
  basePrice: number;
  priceSuffix: string;
  content: ServiceLocalizedContent;
  ctaHref: string;
}

export function ServiceHero({
  icon,
  basePrice,
  priceSuffix,
  content,
  ctaHref,
}: ServiceHeroProps) {
  const ServiceIcon = iconMap[icon];

  return (
    <section className="section-padding pt-32 sm:pt-36">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            <ServiceIcon size={14} className="opacity-80" />
            <span>{content.breadcrumbServices}</span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
            style={{
              backgroundColor: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            <span className="opacity-80">{content.priceLabel}</span>
            <span>
              ${basePrice}
              {content.priceSuffix ? ` ${content.priceSuffix}` : priceSuffix}
            </span>
          </div>
        </div>

        <h1 className="text-[1.625rem] leading-[1.2] sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl font-bold mb-5 text-balance">
          {content.h1}
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-10"
          data-aeo-speakable
        >
          {content.heroSubtitle}
        </p>

        {/* 3 benefits grid */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {content.benefits.map((benefit) => {
            const BenefitIcon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <BenefitIcon size={22} className="mb-3 opacity-80" />
                <h3 className="text-base font-semibold mb-1.5">{benefit.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <div className="flex flex-wrap gap-3">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            {content.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
