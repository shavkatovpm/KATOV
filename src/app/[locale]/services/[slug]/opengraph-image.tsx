import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { getServiceData, getAllServiceSlugs } from '@/data/services';

export const alt = 'KATOV — IT xizmatlar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

interface Params {
  locale: string;
  slug: string;
}

export default async function ServiceOgImage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!hasLocale(locales, locale)) {
    return new Response('Not found', { status: 404 });
  }
  const data = getServiceData(slug, locale as Locale);
  if (!data) {
    return new Response('Not found', { status: 404 });
  }
  const { service, content } = data;
  const priceLine = `${content.priceLabel} $${service.basePrice}${
    content.priceSuffix ? ` ${content.priceSuffix}` : ''
  }`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          color: '#dddddd',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            |&lt; KATOV
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 22,
              padding: '8px 20px',
              borderRadius: 999,
              border: '1px solid #333333',
              color: '#aaaaaa',
            }}
          >
            {content.breadcrumbServices}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {content.h1}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#aaaaaa',
              lineHeight: 1.35,
              display: 'flex',
            }}
          >
            {content.heroSubtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: '1px solid #2a2a2a',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              display: 'flex',
            }}
          >
            {priceLine}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#888888',
              display: 'flex',
            }}
          >
            katov.uz
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
