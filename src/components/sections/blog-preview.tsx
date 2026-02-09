'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CircleDollarSign } from 'lucide-react';

export function BlogPreview() {
  const t = useTranslations('blog');
  const st = useTranslations('studio');

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

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/studio/price"
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
              <CircleDollarSign size={32} className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 transition-colors">
                {st('tools.price.title')}
              </h3>
              <p className="text-muted text-sm sm:text-base mb-4">
                {st('tools.price.description')}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium opacity-70 group-hover:opacity-100 transition-all">
                {st('tools.price.cta')}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/studio"
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
