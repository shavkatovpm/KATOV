'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const blogPostsUz = [
  {
    slug: 'sayt-yaratish-xizmati',
    title: "Sayt yaratish xizmati: narxlar, turlar va buyurtma berish jarayoni",
    description: "O'zbekistonda biznes uchun sayt yaratish xizmati haqida to'liq qo'llanma.",
    date: '2025-02-06',
    readingTime: 7,
  },
];

const blogPostsRu = [
  {
    slug: 'sozdanie-sayta-uslugi',
    title: "Создание сайта: цены, виды и процесс заказа",
    description: "Полное руководство по созданию сайтов для бизнеса в Узбекистане.",
    date: '2025-02-06',
    readingTime: 7,
  },
];

export function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();

  const blogPosts = locale === 'ru' ? blogPostsRu : blogPostsUz;

  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-muted text-sm sm:text-base mb-2">{t('subtitle')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            {t('title')}
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div
                  className="rounded-2xl p-6 sm:p-8 transition-all"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 3%, transparent)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-center gap-2 text-muted text-xs sm:text-sm mb-3">
                    <time>
                      {new Date(post.date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime} {t('readTime')}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm sm:text-base mb-4">{post.description}</p>

                  <div className="flex items-center gap-2 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    {t('readMore')}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            {t('viewAll')}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
