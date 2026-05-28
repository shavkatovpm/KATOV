import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale, locales } from '@/i18n/config';
import { getBlogPosts } from '@/lib/blog';
import { Link } from '@/i18n/routing';
import { localizedUrl, ogLocale } from '@/lib/urls';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

const blogMeta: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: 'Blog — KATOV',
    description: 'Sayt yaratish, SEO, AEO va Telegram bot mavzularida amaliy maqolalar. Toshkentdagi IT agentligi tajribasi asosida.',
  },
  ru: {
    title: 'Блог — KATOV',
    description: 'Практические статьи о создании сайтов, SEO, AEO и Telegram-ботах. На основе опыта IT-агентства в Ташкенте.',
  },
  en: {
    title: 'Blog — KATOV',
    description: 'Practical articles on website development, SEO, AEO, and Telegram bots — from a Tashkent IT agency.',
  },
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = blogMeta[locale] ?? blogMeta.uz;
  const canonical = localizedUrl(locale, '/blog');
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localizedUrl(loc, '/blog');
  languages['x-default'] = localizedUrl('uz', '/blog');

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'KATOV',
      locale: ogLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const blogPosts = getBlogPosts(locale);
  const url = localizedUrl(locale, '/blog');
  const homeUrl = localizedUrl(locale);
  const meta = blogMeta[locale] ?? blogMeta.uz;

  const breadcrumbHome =
    locale === 'uz' ? 'Bosh sahifa' : locale === 'ru' ? 'Главная' : 'Home';
  const breadcrumbBlog =
    locale === 'uz' ? 'Blog' : locale === 'ru' ? 'Блог' : 'Blog';

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: locale,
        publisher: { '@id': 'https://www.katov.uz/#organization' },
        blogPost: blogPosts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${localizedUrl(locale, `/blog/${post.slug}`)}#article`,
          headline: post.title,
          description: post.description,
          url: localizedUrl(locale, `/blog/${post.slug}`),
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Organization', name: post.author, url: 'https://www.katov.uz' },
          inLanguage: locale,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbBlog, item: url },
        ],
      },
    ],
  };

  return (
    <div className="section-padding pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('title')}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-script text-muted mt-4">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl p-6 sm:p-8 h-full border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-[border-color] duration-300"
                style={{
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <div className="flex items-center gap-2 text-muted text-xs sm:text-sm mb-4">
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
                <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted text-sm line-clamp-2">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
