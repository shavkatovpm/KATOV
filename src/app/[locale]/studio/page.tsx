'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CircleDollarSign } from 'lucide-react';

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

const blogPostsEn = [
  {
    slug: 'website-creation-services',
    title: "Website Creation Services: Prices, Types, and How to Order",
    description: "A complete guide to website creation services for businesses in Uzbekistan.",
    date: '2025-02-06',
    readingTime: 7,
  },
];

const tools = [
  {
    id: 'price',
    icon: CircleDollarSign,
  },
];

export default function StudioPage() {
  const t = useTranslations('studio');
  const blogT = useTranslations('blog');
  const locale = useLocale();
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const blogPosts = locale === 'ru' ? blogPostsRu : locale === 'en' ? blogPostsEn : blogPostsUz;

  useEffect(() => {
    const footer = document.querySelector('footer') as HTMLElement | null;
    const header = document.querySelector('header') as HTMLElement | null;
    if (footer) footer.style.display = 'none';
    if (header) {
      header.style.transition = 'opacity 0.5s';
      header.style.opacity = '0';
    }

    const timer = setTimeout(() => setShowIntro(false), 1155);
    return () => {
      clearTimeout(timer);
      if (footer) footer.style.display = '';
      if (header) { header.style.opacity = ''; header.style.transition = ''; }
    };
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const footer = document.querySelector('footer') as HTMLElement | null;
      const header = document.querySelector('header') as HTMLElement | null;
      if (header) header.style.opacity = '1';
      if (footer) footer.style.display = '';
    }
  }, [showIntro]);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setContentVisible(true)}>
      {showIntro ? (
        <motion.div
          key="lab-intro"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 0.3 } }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="min-h-screen flex items-center justify-center"
        >
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            {t('lab')}
          </span>
        </motion.div>
      ) : contentVisible ? (
        <motion.div
          key="studio-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="section-padding pt-32"
        >
          <div className="container-custom">
            {/* Title & subtitle */}
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {t('title')}
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl font-script text-muted mt-4">
                {t('subtitle')}
              </p>
            </div>

            {/* Tools Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-20"
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">{t('toolsTitle')}</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={`/studio/${tool.id}`}
                      className="group block rounded-2xl p-6 sm:p-8 transition-all duration-300"
                      style={{
                        backgroundColor: '#000000',
                        border: '1px solid var(--color-border)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#dddddd';
                        e.currentTarget.style.color = '#dddddd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = '';
                      }}
                    >
                      <tool.icon size={32} className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors">
                        {t(`tools.${tool.id}.title`)}
                      </h3>
                      <p className="text-muted text-sm">
                        {t(`tools.${tool.id}.description`)}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Blog Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">{t('blogsTitle')}</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={`/studio/${post.slug}`}
                      className="group block rounded-2xl p-6 sm:p-8 transition-all duration-300 h-full"
                      style={{
                        backgroundColor: '#000000',
                        border: '1px solid var(--color-border)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#dddddd';
                        e.currentTarget.style.color = '#dddddd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = '';
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
                          <span>{post.readingTime} {blogT('readTime')}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted text-sm line-clamp-1">{post.description}</p>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
