import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Locale, locales, defaultLocale } from '@/i18n/config';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

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

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
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
            </header>

            <div
              className="mb-10"
              style={{ borderTop: '1px solid var(--color-border)' }}
            />

            <div className="prose max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
