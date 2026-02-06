'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const portfolioItems = [
  { id: '1', title: 'Darslinker', category: "Onlayn ta'limni tizimlashtirish platformasi", url: 'https://darslinker.uz', image: '/portfolio/Darslinker.png' },
  { id: '2', title: 'Getolog', category: 'Yopiq telegram kanallarini avtomatlashtirish', url: 'https://getolog.uz', image: '/portfolio/Getolog.png' },
  { id: '3', title: 'Uzbektype', category: "Tez va to'g'ri yozishni tekshirish", url: 'https://uzbektype.uz', image: '/portfolio/Uzbektype.png' },
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-white">
            {t('title')}
          </h2>
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
                className="group block relative"
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  />

                  {/* Top left - Title and Description */}
                  <div className="relative z-10 text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-70">
                      {item.category}
                    </p>
                  </div>

                  {/* Bottom right - Arrow icon */}
                  <div className="relative z-10 flex justify-end">
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
