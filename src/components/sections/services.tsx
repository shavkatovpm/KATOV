'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Globe, Bot, Search, Database } from 'lucide-react';
import { Link } from '@/i18n/routing';

const services = [
  { id: 'website', features: 4, icon: Globe, price: 300, suffix: '' },
  { id: 'seo', features: 4, icon: Search, price: 300, suffix: '/oy' },
  { id: 'telegram', features: 4, icon: Bot, price: 400, suffix: '' },
  { id: 'crm', features: 4, icon: Database, price: 1000, suffix: '' },
];

export function Services() {
  const t = useTranslations('services');
  const pt = useTranslations('pricing');

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

        {/* 4-Card Grid: 2x2 on mobile, 4 columns on desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} href={`/service/${service.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-2xl p-5 lg:p-6 flex flex-col h-full group border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-[border-color] duration-300"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <Icon size={28} className="opacity-70" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base lg:text-lg font-semibold mb-2">
                    {pt(`${service.id}.name`)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs lg:text-sm text-muted mb-4 leading-relaxed">
                    {pt(`${service.id}.description`)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {Array.from({ length: service.features }).map((_, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs lg:text-sm">
                        <Check size={14} className="mt-0.5 shrink-0 opacity-60" />
                        <span>{pt(`${service.id}.feature${i + 1}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <div>
                      <span className="text-base lg:text-lg font-bold">${service.price}+</span>
                      {service.suffix && (
                        <span className="text-xs text-muted">{service.suffix}</span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs lg:text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                      {pt('cta')}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Buttons */}
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
