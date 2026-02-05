'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    slug: 'veb-sayt-narxi-2024',
    title: "Veb-sayt yaratish narxi 2024-yilda",
    description: "O'zbekistonda veb-sayt yaratish qancha turadi? To'liq qo'llanma.",
    date: '2024-01-15',
    readingTime: 5,
  },
  {
    slug: 'seo-nima',
    title: 'SEO nima va nima uchun kerak?',
    description: "Qidiruv tizimlarida yuqori o'rinni egallash sirlari.",
    date: '2024-01-10',
    readingTime: 7,
  },
  {
    slug: 'landing-page-afzalliklari',
    title: 'Landing page afzalliklari',
    description: 'Nima uchun har bir biznesga landing page kerak?',
    date: '2024-01-05',
    readingTime: 4,
  },
];

export function BlogPreview() {
  const t = useTranslations('blog');

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  className="aspect-[16/10] rounded-2xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)' }}
                >
                  <span className="text-4xl sm:text-5xl font-bold opacity-10">
                    {post.title[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted text-xs sm:text-sm mb-2">
                  <time>
                    {new Date(post.date).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} {t('readTime')}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-muted text-sm">{post.description}</p>
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
