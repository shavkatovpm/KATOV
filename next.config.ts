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
};

// SEO, AI SEO (aeo-xizmati) and website creation moved off /services/[slug]
// onto their own short, keyword-first top-level URL — new canonical for
// each, since the nested URL sat un-indexed for months. Every inbound link
// to the old path (including Google's own cached one) needs to land here.
const flagshipServicePaths: Record<string, string> = {
  'seo-xizmati': '/seo',
  'aeo-xizmati': '/ai-seo',
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

    // The old singular /service/seo alias used to land on
    // /services/seo-xizmati — send it straight to the new /seo instead of
    // chaining through the (now also redirecting) old services page.
    redirects.push({ source: '/service/seo', destination: '/seo', permanent: true });
    for (const locale of ['ru', 'en']) {
      redirects.push({
        source: `/${locale}/service/seo`,
        destination: `/${locale}/seo`,
        permanent: true,
      });
    }

    for (const [oldSlug, newPath] of Object.entries(flagshipServicePaths)) {
      redirects.push({
        source: `/services/${oldSlug}`,
        destination: newPath,
        permanent: true,
      });
      for (const locale of ['ru', 'en']) {
        redirects.push({
          source: `/${locale}/services/${oldSlug}`,
          destination: `/${locale}${newPath}`,
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
