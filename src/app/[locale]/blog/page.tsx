import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { getBlogPosts } from '@/lib/blog';
import { Link } from '@/i18n/routing';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const blogPosts = getBlogPosts(locale);

  return (
    <div className="section-padding pt-32">
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
