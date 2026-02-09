import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Poppins, Caveat, Syne } from 'next/font/google';
import { locales, Locale } from '@/i18n/config';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['700'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const langMap: Record<Locale, string> = {
  uz: 'uz',
  ru: 'ru',
  en: 'en',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={langMap[locale as Locale] || 'uz'} suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #__next, main {
                background-color: #000000 !important;
              }
              html::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000000;
                z-index: -9999;
                pointer-events: none;
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${caveat.variable} ${syne.variable} antialiased`}
        style={{ backgroundColor: '#000000' }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <div className="page-content flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
