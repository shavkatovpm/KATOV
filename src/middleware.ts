import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
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
