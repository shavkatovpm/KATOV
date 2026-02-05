'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Rocket, Building2, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  { id: 'landing', icon: Rocket },
  { id: 'corporate', icon: Building2 },
  { id: 'ecommerce', icon: ShoppingCart },
];

export function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="section-padding bg-section">
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
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card p-6 sm:p-8 h-full group">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)' }}
                >
                  <service.icon size={24} />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {t(`${service.id}.title`)}
                </h3>
                <p className="text-muted text-sm sm:text-base mb-5">
                  {t(`${service.id}.description`)}
                </p>

                <Link
                  href="#pricing"
                  className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                >
                  {t('learnMore')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
