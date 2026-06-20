'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { getServicesCatalog, servicesIndexCopy } from '@/data/services';
import type { Locale } from '@/i18n/config';
import { ServiceCard } from '@/components/service-detail/service-card';

const catalog = getServicesCatalog();

export function Services() {
  const t = useTranslations('services');
  const pt = useTranslations('pricing');
  const locale = useLocale() as Locale;
  const copy = servicesIndexCopy[locale];

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {pt('title')}
          </h2>
          <p className="text-muted text-sm mt-2">{pt('description')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {catalog.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
            >
              <ServiceCard
                slug={item.slug}
                icon={item.icon}
                title={item.card[locale].title}
                description={item.card[locale].description}
                basePrice={item.basePrice}
                priceSuffix={item.priceSuffix}
                available={item.available}
                href={`/${locale}/services/${item.slug}`}
                fromLabel={copy.fromLabel}
                comingSoonBadge={copy.comingSoonBadge}
                cardCta={copy.cardCta}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 flex flex-row items-center justify-center gap-2 sm:gap-3"
        >
          <Link
            href="/studio/price"
            className="btn-outline inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-colors cursor-pointer min-w-[150px] sm:min-w-[210px]"
          >
            {t('calcPrice')}
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-outline inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-colors cursor-pointer min-w-[150px] sm:min-w-[210px]"
          >
            {t('freeConsultation')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
