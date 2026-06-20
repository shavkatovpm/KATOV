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
  // Next.js 16 forces `cache-control: private, no-cache, no-store` on
  // routes it considers dynamic (every page here, due to the next-intl
  // rewrite). That header tells Googlebot the page is per-user and hurts
  // indexing. Override it via next.config so the framework default is
  // replaced before Vercel emits the response.
  async headers() {
    return [
      {
        source: '/((?!api|_next|_vercel).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
