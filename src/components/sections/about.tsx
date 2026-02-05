'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const features = ['feature4', 'feature1', 'feature2', 'feature3'];

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
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:text-center">
            {t('title')}
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl mb-4 leading-relaxed">
            {t('description')}
          </p>
          <p className="text-muted text-base sm:text-lg md:text-xl mb-10 leading-relaxed">
            {t('description2')}
          </p>

          <p className="text-muted text-sm sm:text-base mb-4">
            {t('featuresTitle')}
          </p>

          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                {index > 0 && <span className="text-muted">•</span>}
                <span className="text-base sm:text-lg">{t(feature)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
