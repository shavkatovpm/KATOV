import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { iconMap } from './icon-map';
import {
  servicesCatalog,
  servicesData,
  type ServiceCatalogItem,
} from '@/data/services';
import type { Locale } from '@/i18n/config';

interface ServiceRelatedProps {
  currentSlug: string;
  locale: Locale;
  title: string;
}

// Hand-curated relations — surface services that solve adjacent problems
// rather than random or demand-only neighbours. AI engines value semantic
// connections between resources.
const relatedMap: Record<string, string[]> = {
  'landing-page': ['korporativ-sayt', 'seo-xizmati', 'telegram-bot'],
  'korporativ-sayt': ['landing-page', 'sayt-redesign', 'seo-xizmati'],
  'internet-dokon': ['telegram-bot', 'admin-panel', 'crm-tizimi'],
  'telegram-bot': ['internet-dokon', 'crm-tizimi', 'admin-panel'],
  'restoran-sayti': ['internet-dokon', 'telegram-bot', 'landing-page'],
  'sayt-redesign': ['korporativ-sayt', 'seo-xizmati', 'landing-page'],
  'crm-tizimi': ['erp-tizimi', 'admin-panel', 'telegram-bot'],
  'seo-xizmati': ['aeo-xizmati', 'korporativ-sayt', 'sayt-redesign'],
  'erp-tizimi': ['crm-tizimi', 'admin-panel', 'internet-dokon'],
  'portfolio-sayt': ['landing-page', 'korporativ-sayt', 'seo-xizmati'],
  'admin-panel': ['crm-tizimi', 'erp-tizimi', 'internet-dokon'],
  'aeo-xizmati': ['seo-xizmati', 'korporativ-sayt', 'sayt-redesign'],
};

export function ServiceRelated({ currentSlug, locale, title }: ServiceRelatedProps) {
  const relatedSlugs = relatedMap[currentSlug] ?? [];
  const related: Array<ServiceCatalogItem & { available: boolean }> = relatedSlugs
    .map((slug) => servicesCatalog.find((s) => s.slug === slug))
    .filter((s): s is ServiceCatalogItem => Boolean(s))
    .map((s) => ({ ...s, available: !!servicesData[s.slug] }))
    .filter((s) => s.available);

  if (related.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">{title}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {related.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Link
                key={item.slug}
                href={`/${locale}/services/${item.slug}`}
                className="group block"
              >
                <div
                  className="relative rounded-2xl p-5 lg:p-6 flex flex-col h-full border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-[border-color] duration-300"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon size={26} className="opacity-70" />
                    <ArrowUpRight
                      size={18}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold mb-2">
                    {item.card[locale].title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted leading-relaxed">
                    {item.card[locale].description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
