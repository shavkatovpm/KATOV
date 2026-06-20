import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { iconMap } from '@/components/service-detail/icon-map';
import {
  servicesCatalog,
  servicesData,
  type ServiceCatalogItem,
} from '@/data/services';
import type { Locale } from '@/i18n/config';

// Canonical (uz) blog slug → ordered list of related service slugs.
// AI engines weight semantic adjacency, so each post lands on the page
// whose audience is most likely already shopping for it.
const blogToServices: Record<string, string[]> = {
  'backlink-va-google-ranking': ['seo-xizmati', 'aeo-xizmati', 'korporativ-sayt'],
  'crm-tizimini-ishlab-chiqish-uzbekiston': ['crm-tizimi', 'erp-tizimi', 'admin-panel'],
  'sayt-yaratish-xizmati': ['landing-page', 'korporativ-sayt', 'internet-dokon'],
  'website-buyurtma-berish-toshkent': ['korporativ-sayt', 'landing-page', 'seo-xizmati'],
  'website-narxi-uzbekistonda': ['landing-page', 'korporativ-sayt', 'internet-dokon'],
};

// RU / EN slug → canonical uz slug (mirrors the map in the blog page).
const slugToCanonical: Record<string, string> = {
  'sayt-yaratish-xizmati': 'sayt-yaratish-xizmati',
  'sozdanie-sayta-uslugi': 'sayt-yaratish-xizmati',
  'website-creation-services': 'sayt-yaratish-xizmati',
  'website-narxi-uzbekistonda': 'website-narxi-uzbekistonda',
  'skolko-stoit-sozdanie-sayta-uzbekistan': 'website-narxi-uzbekistonda',
  'website-cost-in-uzbekistan': 'website-narxi-uzbekistonda',
  'backlink-va-google-ranking': 'backlink-va-google-ranking',
  'backlink-i-google-ranking': 'backlink-va-google-ranking',
  'backlink-and-google-ranking': 'backlink-va-google-ranking',
  'crm-tizimini-ishlab-chiqish-uzbekiston': 'crm-tizimini-ishlab-chiqish-uzbekiston',
  'razrabotka-crm-sistemy-uzbekistan': 'crm-tizimini-ishlab-chiqish-uzbekiston',
  'crm-system-development-uzbekistan': 'crm-tizimini-ishlab-chiqish-uzbekiston',
  'website-buyurtma-berish-toshkent': 'website-buyurtma-berish-toshkent',
  'zakazat-sayt-tashkent': 'website-buyurtma-berish-toshkent',
  'order-website-tashkent': 'website-buyurtma-berish-toshkent',
};

interface BlogRelatedServicesProps {
  blogSlug: string;
  locale: Locale;
}

const headings: Record<Locale, string> = {
  uz: 'Bu mavzu bo\'yicha xizmatlarimiz',
  ru: 'Наши услуги по этой теме',
  en: 'Our services on this topic',
};

export function BlogRelatedServices({ blogSlug, locale }: BlogRelatedServicesProps) {
  const canonical = slugToCanonical[blogSlug] ?? blogSlug;
  const slugs = blogToServices[canonical] ?? [];
  const items: Array<ServiceCatalogItem & { available: boolean }> = slugs
    .map((slug) => servicesCatalog.find((s) => s.slug === slug))
    .filter((s): s is ServiceCatalogItem => Boolean(s))
    .map((s) => ({ ...s, available: !!servicesData[s.slug] }))
    .filter((s) => s.available);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{headings[locale]}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group block"
            >
              <div
                className="relative rounded-2xl p-5 flex flex-col h-full border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-[border-color] duration-300"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon size={24} className="opacity-70" />
                  <ArrowUpRight
                    size={16}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-semibold mb-1.5">
                  {item.card[locale].title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.card[locale].description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
