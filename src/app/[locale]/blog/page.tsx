import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getBlogPosts(locale);

  return (
    <div className="section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-muted text-sm sm:text-base mb-2">{t('subtitle')}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">{t('title')}</h1>
            <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">{t('description')}</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted">Maqolalar tez orada...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl p-6 sm:p-8 transition-all"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 3%, transparent)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted mb-3">
                      <time>
                        {new Date(post.date).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>
                        {post.readingTime} {t('readTime')}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm sm:text-base mb-5 line-clamp-2">{post.description}</p>

                    <div className="flex items-center gap-2 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                      {t('readMore')}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
