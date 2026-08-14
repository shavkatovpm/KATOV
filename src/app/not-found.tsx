import { headers } from 'next/headers';
import { NotFoundContent } from '@/components/not-found-content';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

function isLocale(value: string | null): value is Locale {
  return !!value && locales.includes(value as Locale);
}

/**
 * The 404 speaks Uzbek unless the visitor is actually on a translated version
 * of the site. The browser's Accept-Language is deliberately ignored — a
 * Russian-language browser is common here and says nothing about which
 * version of the site the person chose.
 */
async function detectLocale(): Promise<Locale> {
  const h = await headers();

  // next-intl's middleware resolves this from the URL. Because routing has
  // localeDetection turned off, it never reflects the browser's language.
  const fromUrl = h.get('x-next-intl-locale');
  if (isLocale(fromUrl)) return fromUrl;

  // Defensive fallback for requests that arrive without the middleware
  // having run (its matcher skips /api, /_next and any path containing a
  // dot) and therefore carry no locale header. Compared on the parsed
  // pathname, so an unrelated URL like /blog/ru-post can't match.
  const referer = h.get('referer');
  if (referer) {
    try {
      const { pathname } = new URL(referer);
      const prefix = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
      if (prefix) return prefix;
    } catch {
      // Malformed referer — fall through to the default.
    }
  }

  return defaultLocale;
}

export default async function NotFound() {
  const locale = await detectLocale();

  return (
    <html lang={locale} style={{ backgroundColor: '#000000' }}>
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#000000',
        }}
      >
        <NotFoundContent locale={locale} />
      </body>
    </html>
  );
}
