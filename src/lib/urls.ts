import { defaultLocale, type Locale } from '@/i18n/config';

export const SITE_URL = 'https://www.katov.uz';
export const SITE_ORIGIN = SITE_URL;

// Matches next-intl `localePrefix: 'as-needed'` — the default locale (uz)
// is served at the root with no /uz/ prefix.
export function localizedPath(locale: Locale, path: string = ''): string {
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path;
  if (locale === defaultLocale) return cleanPath;
  return `/${locale}${cleanPath}`;
}

export function localizedUrl(locale: Locale, path: string = ''): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

// Open Graph requires `language_TERRITORY` (e.g. `uz_UZ`), not bare `uz`.
export function ogLocale(locale: Locale): string {
  return locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : 'uz_UZ';
}
