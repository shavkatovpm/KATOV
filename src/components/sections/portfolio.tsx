'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const portfolioItems = [
  { id: '1', title: 'Darslinker', category: "Onlayn ta'limni tizimlashtirish platformasi", url: 'https://darslinker.uz' },
  { id: '2', title: 'Uzbektype', category: "Tez va to'g'ri yozishni tekshirish", url: 'https://uzbektype.uz' },
  { id: '3', title: 'Getolog', category: 'Yopiq telegram kanallarini avtomatlashtirish', url: 'https://getolog.uz' },
];

export function Portfolio() {
  const t = useTranslations('portfolio');

  return (
    <section id="portfolio" className="section-padding">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {/* Top left - Title and Description */}
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h3>
                    <p className="text-muted text-xs sm:text-sm">
                      {item.category}
                    </p>
                  </div>

                  {/* Bottom right - Arrow icon */}
                  <div className="flex justify-end">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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
            href="/portfolio"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            {t('viewAll')}
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
