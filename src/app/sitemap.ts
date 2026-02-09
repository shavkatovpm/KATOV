import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://katov.uz';
  const locales = ['uz', 'ru', 'en'];
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root URL
  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Main pages per locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Studio page
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/studio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Price calculator
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/studio/price`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
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
        url: `${baseUrl}/${locale}/studio/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
