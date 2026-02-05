import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins, Caveat, Syne } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'KATOV - Kreativ website xizmatlari',
    template: '%s | KATOV',
  },
  description:
    'Kreativ va professional sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.',
  keywords: [
    'veb-sayt',
    'web design',
    'kreativ dizayn',
    "O'zbekiston",
    'sayt yaratish',
    'landing page',
    'website',
    'Toshkent',
  ],
  authors: [{ name: 'KATOV' }],
  creator: 'KATOV',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://katov.uz',
    siteName: 'KATOV',
    title: 'KATOV - Kreativ website xizmatlari',
    description:
      'Kreativ va professional sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KATOV - Kreativ website xizmatlari',
    description:
      'Kreativ va professional sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
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
        {children}
      </body>
    </html>
  );
}
