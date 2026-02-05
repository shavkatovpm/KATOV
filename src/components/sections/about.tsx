'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding md:min-h-screen md:flex md:items-center">
      <div className="container-custom w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl md:max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16 md:text-center">
            {t('title')}
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-4 md:mb-6 leading-relaxed text-left">
            {t('description')}
          </p>
          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-10 md:mb-16 leading-relaxed text-left">
            {t('description2')}
          </p>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-4 md:mb-8 text-left">
            {t('featuresTitle')}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 md:mb-6 text-left"
          >
            <span className="text-base sm:text-lg md:text-2xl lg:text-3xl">{t('feature4')}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-0"
          >
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-3xl lg:text-4xl">
              <span className="text-muted md:hidden">•</span>
              {t('feature1')}
            </span>
            <span className="hidden md:inline text-muted mx-4 md:text-3xl lg:text-4xl">•</span>
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-3xl lg:text-4xl">
              <span className="text-muted md:hidden">•</span>
              {t('feature2')}
            </span>
            <span className="hidden md:inline text-muted mx-4 md:text-3xl lg:text-4xl">•</span>
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-3xl lg:text-4xl">
              <span className="text-muted md:hidden">•</span>
              {t('feature3')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
