'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const blogPostsUz = [
  {
    slug: 'website-narxi-uzbekistonda',
    title: "Website yasatish qancha turadi O'zbekistonda? To'liq narx tahlili",
    description: "Sayt narxi, landing page, korporativ sayt, internet do'kon narxlari — to'liq tahlil.",
    date: '2026-03-25',
    readingTime: 12,
  },
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
    slug: 'skolko-stoit-sozdanie-sayta-uzbekistan',
    title: "Сколько стоит создание сайта в Узбекистане? Полный анализ цен",
    description: "Цены на лендинг, корпоративный сайт, интернет-магазин — полный анализ.",
    date: '2026-03-25',
    readingTime: 12,
  },
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
    slug: 'website-cost-in-uzbekistan',
    title: "How Much Does It Cost to Build a Website in Uzbekistan?",
    description: "Landing page, corporate site, e-commerce prices and factors that affect pricing.",
    date: '2026-03-25',
    readingTime: 12,
  },
  {
    slug: 'website-creation-services',
    title: "Website Creation Services: Prices, Types, and How to Order",
    description: "A complete guide to website creation services for businesses in Uzbekistan.",
    date: '2025-02-06',
    readingTime: 7,
  },
];

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();

  const blogPosts = locale === 'ru' ? blogPostsRu : locale === 'en' ? blogPostsEn : blogPostsUz;

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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
