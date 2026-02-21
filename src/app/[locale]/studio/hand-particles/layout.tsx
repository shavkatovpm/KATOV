import { locales } from '@/i18n/config';

interface HandParticlesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const seoData: Record<string, { title: string; description: string; keywords: string[] }> = {
  uz: {
    title: 'Hand Particles — Qo\'l harakati bilan boshqaruv',
    description: 'Qo\'l harakati bilan zarrachalarni boshqaring. Kamerangizni yoqing va interaktiv tajribani sinab ko\'ring.',
    keywords: ['hand particles', 'qo\'l harakati', 'interaktiv', 'zarrachalar', 'MediaPipe', 'KATOV'],
  },
  ru: {
    title: 'Hand Particles — Управление жестами руки',
    description: 'Управляйте частицами движением руки. Включите камеру и попробуйте интерактивный опыт.',
    keywords: ['hand particles', 'жесты руки', 'интерактив', 'частицы', 'MediaPipe', 'KATOV'],
  },
  en: {
    title: 'Hand Particles — Gesture Control',
    description: 'Control particles with hand gestures. Turn on your camera and try the interactive experience.',
    keywords: ['hand particles', 'hand gestures', 'interactive', 'particles', 'MediaPipe', 'KATOV'],
  },
};

export async function generateMetadata({ params }: HandParticlesLayoutProps) {
  const { locale } = await params;
  const data = seoData[locale] || seoData.uz;
  const baseUrl = 'https://katov.uz';

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === 'uz' ? '' : `/${loc}`;
    alternateLanguages[loc] = `${baseUrl}${prefix}/studio/hand-particles`;
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: locale === 'uz' ? `${baseUrl}/studio/hand-particles` : `${baseUrl}/${locale}/studio/hand-particles`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: locale === 'uz' ? `${baseUrl}/studio/hand-particles` : `${baseUrl}/${locale}/studio/hand-particles`,
      type: 'website',
      siteName: 'KATOV',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : 'uz_UZ',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 1200,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: data.title,
      description: data.description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default function HandParticlesLayout({ children }: HandParticlesLayoutProps) {
  return children;
}
