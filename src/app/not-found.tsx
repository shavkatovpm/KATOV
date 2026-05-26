import { headers } from 'next/headers';
import Link from 'next/link';

type Locale = 'uz' | 'ru' | 'en';

const copy: Record<Locale, { title: string; description: string; home: string; services: string; blog: string }> = {
  uz: {
    title: 'Sahifa topilmadi',
    description: 'Kechirasiz, qidirayotgan sahifangiz mavjud emas yoki ko\'chirilgan.',
    home: 'Bosh sahifaga qaytish',
    services: 'Xizmatlarni ko\'rish',
    blog: 'Blogni o\'qish',
  },
  ru: {
    title: 'Страница не найдена',
    description: 'Извините, искомая страница не существует или была перемещена.',
    home: 'Вернуться на главную',
    services: 'Посмотреть услуги',
    blog: 'Читать блог',
  },
  en: {
    title: 'Page not found',
    description: 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.',
    home: 'Back to home',
    services: 'View services',
    blog: 'Read the blog',
  },
};

async function detectLocale(): Promise<Locale> {
  const h = await headers();
  const referer = h.get('referer') || '';
  const accept = h.get('accept-language') || '';
  if (referer.includes('/ru/') || referer.endsWith('/ru')) return 'ru';
  if (referer.includes('/en/') || referer.endsWith('/en')) return 'en';
  if (accept.toLowerCase().startsWith('ru')) return 'ru';
  if (accept.toLowerCase().startsWith('en')) return 'en';
  return 'uz';
}

export default async function NotFound() {
  const locale = await detectLocale();
  const t = copy[locale];
  const prefix = locale === 'uz' ? '' : `/${locale}`;
  const langAttr = locale;

  return (
    <html lang={langAttr} style={{ backgroundColor: '#000' }}>
      <body
        style={{
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '6rem',
              fontWeight: 700,
              opacity: 0.3,
              margin: 0,
              lineHeight: 1,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>{t.title}</h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.7, lineHeight: 1.6, margin: '0 0 2.5rem' }}>
            {t.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <Link
              href={`${prefix}/`}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {t.home}
            </Link>
            <Link
              href={`${prefix}/services`}
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {t.services}
            </Link>
            <Link
              href={`${prefix}/blog`}
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {t.blog}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
