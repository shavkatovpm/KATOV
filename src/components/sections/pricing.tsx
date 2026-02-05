'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  { id: 'starter', price: 500, features: 5, popular: false },
  { id: 'business', price: 1500, features: 6, popular: true },
  { id: 'enterprise', price: 3000, features: 7, popular: false },
];

export function Pricing() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="section-padding bg-section">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl p-6 sm:p-8"
              style={{
                backgroundColor: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                color: plan.popular ? 'var(--color-bg)' : 'inherit',
                border: `1px solid ${plan.popular ? 'var(--color-fg)' : 'var(--color-border)'}`,
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs sm:text-sm font-medium rounded-full"
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
                >
                  {t('popular')}
                </div>
              )}

              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {t(`${plan.id}.name`)}
              </h3>
              <p
                className="text-xs sm:text-sm mb-5"
                style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
              >
                {t(`${plan.id}.description`)}
              </p>

              <div className="mb-5">
                <span className="text-3xl sm:text-4xl font-bold">${plan.price}</span>
                <span
                  className="text-xs sm:text-sm ml-1"
                  style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
                >
                  {t('from')}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {Array.from({ length: plan.features }).map((_, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                    <Check size={16} className="mt-0.5 shrink-0" />
                    <span>{t(`${plan.id}.feature${i + 1}`)}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className="block w-full py-3 text-center text-sm sm:text-base font-medium rounded-full transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: plan.popular ? 'var(--color-bg)' : 'var(--color-fg)',
                  color: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                }}
              >
                {t('cta')}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
