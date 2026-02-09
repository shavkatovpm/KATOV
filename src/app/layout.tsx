import type { Metadata } from 'next';
import './globals.css';

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
    'создание сайта',
    'создание сайта ташкент',
    'заказать сайт узбекистан',
  ],
  authors: [{ name: 'KATOV' }],
  creator: 'KATOV',
  metadataBase: new URL('https://katov.uz'),
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://katov.uz',
    siteName: 'KATOV',
    title: 'KATOV - Kreativ website xizmatlari',
    description:
      'Kreativ va professional sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 1200,
        alt: 'KATOV - Kreativ website xizmatlari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KATOV - Kreativ website xizmatlari',
    description:
      'Kreativ va professional sayt yaratish xizmatlari. Minimal dizayn, maksimal natija.',
    images: ['/og-image.png'],
  },
  alternates: {
    languages: {
      uz: '/uz',
      ru: '/ru',
      en: '/en',
    },
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
  return children;
}
