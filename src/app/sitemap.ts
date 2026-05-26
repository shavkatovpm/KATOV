import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/data/services';
import { getBlogPosts } from '@/lib/blog';
import { locales, type Locale } from '@/i18n/config';
import { localizedUrl } from '@/lib/urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home — one entry per locale (uz collapses to root via localizedUrl)
  locales.forEach((locale) => {
    entries.push({
      url: localizedUrl(locale as Locale),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Static top-level pages (priority 0.8) — same path across locales
  const staticPaths = ['/services', '/portfolio', '/blog', '/studio'];
  staticPaths.forEach((path) => {
    locales.forEach((locale) => {
      entries.push({
        url: localizedUrl(locale as Locale, path),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Studio: price calculator is a useful tool for SEO; hand-particles
  // is a pure animation playground and stays out of the index (noindex
  // set on its own layout).
  locales.forEach((locale) => {
    entries.push({
      url: localizedUrl(locale as Locale, '/studio/price'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Service detail pages — driven by data/services.ts catalog
  const serviceSlugs = getAllServiceSlugs();
  locales.forEach((locale) => {
    serviceSlugs.forEach((slug) => {
      entries.push({
        url: localizedUrl(locale as Locale, `/services/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  // Blog posts — driven by filesystem (src/content/blog/{locale}/*.mdx)
  // so new posts appear automatically. Each entry uses the post's own date.
  locales.forEach((locale) => {
    const posts = getBlogPosts(locale as Locale);
    posts.forEach((post) => {
      entries.push({
        url: localizedUrl(locale as Locale, `/blog/${post.slug}`),
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return entries;
}
