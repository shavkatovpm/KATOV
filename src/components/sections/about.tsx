'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const stats = [
  { key: 'experience', value: '3+' },
  { key: 'projects', value: '50+' },
  { key: 'clients', value: '40+' },
];

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 sm:gap-10 lg:gap-16 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={stat.key} className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
              >
                {stat.value}
              </motion.p>
              <p className="text-muted text-xs sm:text-sm md:text-base">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
