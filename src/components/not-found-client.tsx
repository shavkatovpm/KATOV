'use client';

import { useSyncExternalStore } from 'react';
import { NotFoundContent } from '@/components/not-found-content';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

function localeFromPath(pathname: string): Locale {
  return (
    locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) ?? defaultLocale
  );
}

const subscribe = () => () => {};

/**
 * Resolves the 404's language on the client instead of from request headers.
 *
 * Reading `headers()` in the root not-found is what forced *every* route in
 * the app to render dynamically — the not-found boundary is part of each
 * route's tree, so one dynamic API in here opted the whole site out of static
 * generation and out of CDN caching. Deriving the locale from the URL on the
 * client keeps the translated 404 without that cost.
 *
 * useSyncExternalStore renders the default locale during SSR and the real one
 * immediately on hydration, so there is no hydration mismatch.
 */
export function NotFoundClient() {
  const locale = useSyncExternalStore(
    subscribe,
    () => localeFromPath(window.location.pathname),
    () => defaultLocale
  );

  return <NotFoundContent locale={locale} />;
}
