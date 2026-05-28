import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Poppins, Caveat, Syne } from 'next/font/google';
import Script from 'next/script';
import { locales, Locale } from '@/i18n/config';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactPrompt } from '@/components/contact-prompt';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Required by next-intl to enable static rendering — without this it
  // falls back to reading the locale from headers(), which marks the
  // route as dynamic and emits no-cache headers that hurt indexing.
  setRequestLocale(locale);

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
              html.light, html.light body, html.light #__next, html.light main {
                background-color: #ffffff !important;
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
              html.light::before {
                background-color: #ffffff;
              }
            `,
          }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vetnzqe1cg");`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['Organization', 'ProfessionalService'],
                  '@id': 'https://www.katov.uz/#organization',
                  name: 'KATOV',
                  url: 'https://www.katov.uz',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.katov.uz/og-image.png',
                    width: 1200,
                    height: 1200,
                  },
                  image: 'https://www.katov.uz/og-image.png',
                  description:
                    'KATOV — IT xizmatlar agentligi O\'zbekistonda: veb-sayt, landing page, korporativ sayt, Internet do\'kon, Telegram bot, CRM, ERP, SEO. 3 til (uz/ru/en).',
                  foundingDate: '2024',
                  areaServed: {
                    '@type': 'Country',
                    name: 'Uzbekistan',
                  },
                  serviceArea: {
                    '@type': 'AdministrativeArea',
                    name: 'Uzbekistan',
                  },
                  priceRange: '$50–$5000',
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+998-33-888-01-33',
                    contactType: 'customer service',
                    email: 'hello@katov.uz',
                    availableLanguage: ['Uzbek', 'Russian', 'English'],
                    areaServed: 'UZ',
                  },
                  sameAs: [
                    'https://t.me/katovuz',
                    'https://instagram.com/katov.uz',
                  ],
                  knowsAbout: [
                    'Web Development',
                    'Web Design',
                    'Landing Page',
                    'E-commerce',
                    'Corporate Website',
                    'Telegram Bot Development',
                    'CRM System',
                    'ERP System',
                    'SEO',
                    'AEO',
                    'Answer Engine Optimization',
                    'ChatGPT optimization',
                    'Perplexity optimization',
                    'Schema.org markup',
                    'IT Services',
                    'Uzbekistan IT',
                    'Click payment integration',
                    'Payme payment integration',
                  ],
                  makesOffer: [
                    { '@type': 'Offer', name: 'Landing Page Yaratish', url: 'https://www.katov.uz/services/landing-page', price: 270, priceCurrency: 'USD' },
                    { '@type': 'Offer', name: 'Korporativ Sayt Yaratish', url: 'https://www.katov.uz/services/korporativ-sayt', price: 870, priceCurrency: 'USD' },
                    { '@type': 'Offer', name: 'Internet Do\'kon Yaratish', url: 'https://www.katov.uz/services/internet-dokon', price: 1700, priceCurrency: 'USD' },
                    { '@type': 'Offer', name: 'Telegram Bot Yaratish', url: 'https://www.katov.uz/services/telegram-bot', price: 400, priceCurrency: 'USD' },
                    { '@type': 'Offer', name: 'SEO Xizmati', url: 'https://www.katov.uz/services/seo-xizmati', price: 300, priceCurrency: 'USD' },
                    { '@type': 'Offer', name: 'AEO Xizmati', url: 'https://www.katov.uz/services/aeo-xizmati', price: 300, priceCurrency: 'USD' },
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.katov.uz/#website',
                  url: 'https://www.katov.uz',
                  name: 'KATOV',
                  description:
                    'IT xizmatlar agentligi O\'zbekistonda — veb-sayt, bot, CRM, ERP va boshqalar.',
                  publisher: { '@id': 'https://www.katov.uz/#organization' },
                  inLanguage: ['uz', 'ru', 'en'],
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.katov.uz/blog?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
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
            <ContactPrompt locale={locale as Locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
