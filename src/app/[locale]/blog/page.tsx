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
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-muted mb-2">{t('subtitle')}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
            <p className="text-muted text-lg">{t('description')}</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted">Maqolalar tez orada...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border-b border-border pb-8 last:border-0"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-center gap-3 text-sm text-muted mb-2">
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

                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-muted transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted mb-4">{post.description}</p>

                    <div className="flex items-center gap-2 text-sm font-medium">
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
