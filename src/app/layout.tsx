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
    default: 'Katov - Kreativ Veb-sayt Xizmatlari',
    template: '%s | Katov',
  },
  description:
    "Katov - O'zbekistonda kreativ va professional veb-sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.",
  keywords: [
    'veb-sayt',
    'web design',
    'kreativ dizayn',
    "O'zbekiston",
    'sayt yaratish',
    'landing page',
  ],
  authors: [{ name: 'Katov' }],
  creator: 'Katov',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://katov.uz',
    siteName: 'Katov',
    title: 'Katov - Kreativ Veb-sayt Xizmatlari',
    description:
      "Katov - O'zbekistonda kreativ va professional veb-sayt yaratish xizmatlari.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katov - Kreativ Veb-sayt Xizmatlari',
    description:
      "Katov - O'zbekistonda kreativ va professional veb-sayt yaratish xizmatlari.",
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
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${caveat.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
