import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://katov.uz';
  const locales = ['uz', 'ru', 'en'];

  // Main pages
  const pages = [
    '',
    '#about',
    '#services',
    '#portfolio',
    '#pricing',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for each locale
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  // Add root URL that redirects to default locale
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  return sitemapEntries;
}
