import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);
const CANONICAL_HOST = 'www.katov.uz';

export default function middleware(req: NextRequest) {
  // Vercel auto-assigns <project>.vercel.app to every deployment with the
  // same content and `index, follow` meta — Google would treat it as a
  // duplicate of www.katov.uz. 308 it to the canonical host so the alias
  // never accumulates indexing signals.
  const host = req.headers.get('host') ?? '';
  if (host !== CANONICAL_HOST && (host.endsWith('.vercel.app') || host === 'katov.uz')) {
    const url = req.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  const response = intlMiddleware(req);
  // next-intl sets a NEXT_LOCALE cookie on every response. Any Set-Cookie
  // makes Vercel treat the route as dynamic and emit
  // `cache-control: private, no-cache, no-store`, which signals Googlebot
  // that the page is per-user and hurts indexing priority. Locale is in
  // the URL and localeDetection is off, so we don't need the cookie.
  response.headers.delete('set-cookie');
  // The localePrefix='as-needed' rewrite from /foo -> /uz/foo also makes
  // the response default to the dynamic no-cache headers above. Override
  // them so the CDN and Googlebot can cache HTML pages.
  response.headers.set(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  );
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(uz|en|ru)/:path*'],
};
