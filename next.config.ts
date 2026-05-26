import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const legacyServiceSlugMap: Record<string, string> = {
  website: 'korporativ-sayt',
  crm: 'crm-tizimi',
  telegram: 'telegram-bot',
  seo: 'seo-xizmati',
};

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    const redirects: { source: string; destination: string; permanent: true }[] = [];
    for (const [oldSlug, newSlug] of Object.entries(legacyServiceSlugMap)) {
      // Default locale (uz) — no prefix
      redirects.push({
        source: `/service/${oldSlug}`,
        destination: `/services/${newSlug}`,
        permanent: true,
      });
      // ru, en
      for (const locale of ['ru', 'en']) {
        redirects.push({
          source: `/${locale}/service/${oldSlug}`,
          destination: `/${locale}/services/${newSlug}`,
          permanent: true,
        });
      }
    }
    return redirects;
  },
};

export default withNextIntl(withMDX(nextConfig));
