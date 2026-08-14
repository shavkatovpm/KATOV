import { ScanLogo } from '@/components/ui/logo-animations';
import type { Locale } from '@/i18n/config';

const copy: Record<Locale, { title: string; cta: string }> = {
  uz: { title: 'Sahifa topilmadi', cta: 'Bosh sahifa' },
  ru: { title: 'Страница не найдена', cta: 'На главную' },
  en: { title: 'Page not found', cta: 'Back home' },
};

interface NotFoundContentProps {
  locale: Locale;
}

/**
 * Shared by the real 404 (src/app/not-found.tsx) and its preview at
 * /test/404, so the design only exists once.
 *
 * Styling is inline and theme-token based with hard fallbacks: the real 404
 * renders outside the theme provider, where the tokens resolve to their dark
 * defaults, while inside the site they follow the light/dark toggle.
 */
export function NotFoundContent({ locale }: NotFoundContentProps) {
  const t = copy[locale] ?? copy.uz;
  const prefix = locale === 'uz' ? '' : `/${locale}`;

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        backgroundColor: 'var(--color-bg, #000000)',
        color: 'var(--color-fg, #dddddd)',
        textAlign: 'center',
      }}
    >
      {/* The only animated element on the page, at 6.75rem — 50% up from the
          4.5rem static mark it replaces. */}
      <ScanLogo className="h-[6.75rem] w-auto overflow-visible" />

      <p
        style={{
          margin: '2.5rem 0 0',
          fontSize: 'clamp(3rem, 13vw, 3.75rem)',
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        404
      </p>
      <p
        style={{
          margin: '0.75rem 0 0',
          fontSize: '0.95rem',
          color: 'var(--color-muted, #767676)',
        }}
      >
        {t.title}
      </p>

      <a
        href={`${prefix}/`}
        style={{
          marginTop: '2.5rem',
          padding: '0.8rem 1.75rem',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-fg, #dddddd)',
          color: 'var(--color-bg, #000000)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {t.cta}
      </a>
    </div>
  );
}
