import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Locale, locales, defaultLocale } from '@/i18n/config';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import ScrollToAnchor from '@/components/ScrollToAnchor';

function DonutRing({ value, size, strokeWidth }: { value: number; size: number; strokeWidth: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="color-mix(in srgb, var(--color-fg) 10%, transparent)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-fg)" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

function GrowthChart() {
  const size = 160;
  const strokeWidth = 16;

  return (
    <div className="growth-chart-wrap" style={{ margin: '2em 0', padding: '1.5em 2em', borderRadius: '1em', backgroundColor: '#000000', border: '1px solid var(--color-border)' }}>
      <p className="gc-title" style={{ fontSize: '1.275em', color: 'var(--color-fg)', marginBottom: '1.5em', textAlign: 'center' }}>
        O'zbekiston, 2025-yil
      </p>
      <div className="gc-grid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div className="gc-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75em', flex: '1 1 0', minWidth: '140px', padding: '0.75em 1em' }}>
          <div style={{ position: 'relative', width: size, height: size }}>
            <DonutRing value={89} size={size} strokeWidth={strokeWidth} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="gc-percent" style={{ fontSize: '3em', fontWeight: 700, lineHeight: 1 }}>89%</span>
            </div>
          </div>
          <span className="gc-label" style={{ fontSize: '1.275em', fontWeight: 600, color: 'var(--color-fg)' }}>Aholi internetda</span>
          <span className="gc-sub" style={{ fontSize: '0.8em', color: 'var(--color-fg)', textAlign: 'center', lineHeight: 1.4 }}>32.7 mln kishi onlayn</span>
        </div>
        <div className="gc-divider" style={{ width: '1px', backgroundColor: 'var(--color-border)', margin: '0.5em 0' }} />
        <div className="gc-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75em', flex: '1 1 0', minWidth: '140px', padding: '0.75em 1em' }}>
          <div style={{ position: 'relative', width: size, height: size }}>
            <DonutRing value={18} size={size} strokeWidth={strokeWidth} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="gc-percent" style={{ fontSize: '3em', fontWeight: 700, lineHeight: 1 }}>18%</span>
            </div>
          </div>
          <span className="gc-label" style={{ fontSize: '1.275em', fontWeight: 600, color: 'var(--color-fg)' }}>Biznesda sayt bor</span>
          <span className="gc-sub" style={{ fontSize: '0.8em', color: 'var(--color-fg)', textAlign: 'center', lineHeight: 1.4 }}>471 000+ korxonadan</span>
        </div>
      </div>
      <p style={{ fontSize: '0.75em', color: 'color-mix(in srgb, var(--color-fg) 35%, transparent)', marginTop: '1.5em', textAlign: 'center' }}>
        Manba: DataReportal, Stat.uz, UNDP
      </p>
    </div>
  );
}

const slugMap: Record<string, Record<string, string>> = {
  'sayt-yaratish-xizmati': { uz: 'sayt-yaratish-xizmati', ru: 'sozdanie-sayta-uslugi', en: 'website-creation-services' },
  'sozdanie-sayta-uslugi': { uz: 'sayt-yaratish-xizmati', ru: 'sozdanie-sayta-uslugi', en: 'website-creation-services' },
  'website-creation-services': { uz: 'sayt-yaratish-xizmati', ru: 'sozdanie-sayta-uslugi', en: 'website-creation-services' },
};

interface BlogPostPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  // Redirect to correct slug for this locale
  const mapping = slugMap[slug];
  if (mapping && mapping[locale] && mapping[locale] !== slug) {
    return { title: 'Redirecting...' };
  }

  const post = getBlogPost(slug, locale);

  if (!post) {
    return { title: 'Not Found' };
  }

  const baseUrl = 'https://katov.uz';
  const url = `${baseUrl}/${locale}/studio/${slug}`;

  const alternateLanguages: Record<string, string> = {};
  if (mapping) {
    for (const loc of locales) {
      if (mapping[loc]) {
        alternateLanguages[loc] = `${baseUrl}/${loc}/studio/${mapping[loc]}`;
      }
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      siteName: 'KATOV',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : 'uz_UZ',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 1200,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: post.title,
      description: post.description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  // Redirect to correct slug for this locale (e.g., UZ slug on EN page → EN slug)
  const slugMapping = slugMap[slug];
  if (slugMapping && slugMapping[locale] && slugMapping[locale] !== slug) {
    const prefix = locale === defaultLocale ? '' : `/${locale}`;
    redirect(`${prefix}/studio/${slugMapping[locale]}`);
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const fromPath = `/studio/${slug}`;
  const priceUrl = `${prefix}/studio/price?from=${encodeURIComponent(fromPath)}`;

  const priceCTATexts: Record<string, { question: string; description: string; note: string; button: string }> = {
    uz: {
      question: "Siz xohlagan sayt narxi qanchaga tushishi o'ylantiryaptimi?",
      description: "Narx kalkulyatorimiz orqali\naniq javobni hoziroq bilib oling.",
      note: "Tugmani bosish orqali hozirgi sahifani tark etasiz!",
      button: "Sayt narxini hisoblash",
    },
    ru: {
      question: "Думаете, сколько будет стоить нужный вам сайт?",
      description: "Мы разработали калькулятор стоимости сайта, чтобы дать более точный ответ на этот вопрос.",
      note: "Нажимая кнопку, вы покинете текущую страницу!",
      button: "Рассчитать стоимость сайта",
    },
    en: {
      question: "Wondering how much your website will cost?",
      description: "We built a website price calculator to give you a more accurate answer.",
      note: "Clicking the button will take you away from this page!",
      button: "Calculate website price",
    },
  };
  const ctaText = priceCTATexts[locale] || priceCTATexts.uz;

  function PriceCTA() {
    return (
      <div id="price-cta" className="price-cta-wrap" style={{ margin: '2em 0', padding: '1.5em 2em', borderRadius: '1em', backgroundColor: '#000000', border: '1px solid var(--color-border)', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1em', fontWeight: 600, marginBottom: '0.5em', color: 'var(--color-fg)' }}>{ctaText.question}</p>
        <p style={{ fontSize: '0.7em', color: 'color-mix(in srgb, var(--color-fg) 35%, transparent)', marginBottom: '1em' }}>{ctaText.note}</p>
        <a
          href={priceUrl}
          style={{
            display: 'inline-block',
            padding: '0.75em 1.75em',
            borderRadius: '2em',
            backgroundColor: 'var(--color-fg)',
            color: 'var(--color-bg)',
            fontWeight: 600,
            fontSize: '0.95em',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          {ctaText.button}
        </a>
      </div>
    );
  }

  const mdxComponents = { GrowthChart, PriceCTA };

  const baseUrl = 'https://katov.uz';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'KATOV',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KATOV',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/studio/${slug}`,
    },
    inLanguage: locale === 'ru' ? 'ru' : locale === 'en' ? 'en' : 'uz',
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <ScrollToAnchor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="section-padding pt-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity mb-10"
            >
              <ArrowLeft size={18} />
              {t('allArticles')}
            </Link>

            <header className="mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
              <p className="text-base sm:text-lg text-muted mb-5">{post.description}</p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
                <time>
                  {new Date(post.date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-US' : 'uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.readingTime} {t('readTime')}</span>
              </div>

            </header>

            <div
              className="mb-10"
              style={{ borderTop: '1px solid var(--color-border)' }}
            />

            <div className="prose max-w-none">
              <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-fg) 7%, transparent)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
