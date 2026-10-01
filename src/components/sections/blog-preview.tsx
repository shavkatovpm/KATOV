'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export interface BlogPreviewPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
}

// Home links straight to the newest articles so the strongest page passes
// link equity (and a crawl path) to the blog, not just to /blog.
export function BlogPreview({ posts }: { posts: BlogPreviewPost[] }) {
  const t = useTranslations('blog');

  return (
    <section id="studio" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('title')}
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-script text-muted mt-4">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl p-6 transition-colors"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <span className="text-xs text-muted">
                {post.date} · {post.readingTime} {t('readTime')}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:underline underline-offset-4">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{post.description}</p>
              <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                {t('readMore')}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            {t('allArticles')}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
