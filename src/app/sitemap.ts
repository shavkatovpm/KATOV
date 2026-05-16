import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/data/services';
import { locales, type Locale } from '@/i18n/config';
import { localizedUrl, SITE_URL } from '@/lib/urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root URL (apex of canonical host)
  sitemapEntries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Main pages per locale (UZ collapses to root, others get /{locale})
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: localizedUrl(locale as Locale),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Studio
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: localizedUrl(locale as Locale, '/studio'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Price calculator
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: localizedUrl(locale as Locale, '/studio/price'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Services index
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: localizedUrl(locale as Locale, '/services'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Service detail pages
  const serviceSlugs = getAllServiceSlugs();
  locales.forEach((locale) => {
    serviceSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: localizedUrl(locale as Locale, `/services/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  // Blog posts
  const blogPosts: Record<string, string[]> = {
    uz: ['sayt-yaratish-xizmati'],
    ru: ['sozdanie-sayta-uslugi'],
    en: ['website-creation-services'],
  };

  locales.forEach((locale) => {
    const slugs = blogPosts[locale] || [];
    slugs.forEach((slug) => {
      sitemapEntries.push({
        url: localizedUrl(locale as Locale, `/blog/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
