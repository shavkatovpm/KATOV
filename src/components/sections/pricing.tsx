'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown } from 'lucide-react';

const plans = [
  { id: 'minimal', price: 270, features: 6, popular: false },
  { id: 'standart', price: 870, features: 7, popular: true },
  { id: 'individual', price: 1700, features: 7, popular: false },
];

export function Pricing() {
  const t = useTranslations('pricing');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (planId: string) => {
    if (window.innerWidth < 1024) {
      setExpandedCard(expandedCard === planId ? null : planId);
    }
  };

  const closeModal = () => {
    setExpandedCard(null);
  };

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            {t('title')}
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Desktop Cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, borderColor: plan.popular ? '#dddddd' : 'var(--color-border)' }}
              whileInView={{ opacity: 1 }}
              animate={plan.popular ? {
                borderColor: ['#dddddd', '#767676', '#dddddd'],
              } : {}}
              viewport={{ once: true }}
              transition={plan.popular ? {
                opacity: { duration: 0.6, delay: index * 0.1 },
                borderColor: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              } : { duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                color: plan.popular ? 'var(--color-bg)' : 'inherit',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: plan.popular ? undefined : 'var(--color-border)',
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-medium rounded-full"
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
                >
                  {t('popular')}
                </div>
              )}

              <h3 className="text-xl font-semibold mb-3">
                {t(`${plan.id}.name`)}
              </h3>
              <p className="text-sm mb-2 text-muted" style={plan.popular ? { color: 'inherit', opacity: 0.8 } : undefined}>
                {t(`${plan.id}.description`)}
              </p>
              <p className="text-sm mb-6 text-muted" style={plan.popular ? { color: 'inherit', opacity: 0.8 } : undefined}>
                {t(`${plan.id}.description2`)}
              </p>

              <div className="mb-6">
                <p className="text-sm font-medium mb-3">{t('includes')}</p>
                <ul className="space-y-2.5">
                  {Array.from({ length: plan.features }).map((_, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                      <span>{t(`${plan.id}.feature${i + 1}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6" style={{ borderTop: `1px solid ${plan.popular ? 'rgba(0,0,0,0.1)' : 'var(--color-border)'}` }}>
                <div className="mb-5">
                  <span className="text-4xl font-bold">${plan.price.toLocaleString()}</span>
                  <span
                    className="text-sm ml-1"
                    style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
                  >
                    {t('from')}
                  </span>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full py-3 text-center text-base font-medium rounded-full transition-opacity hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundColor: plan.popular ? 'var(--color-bg)' : 'var(--color-fg)',
                    color: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                  }}
                >
                  {t('cta')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, borderColor: plan.popular ? '#dddddd' : 'var(--color-border)' }}
              whileInView={{ opacity: 1 }}
              animate={plan.popular ? {
                borderColor: ['#dddddd', '#767676', '#dddddd'],
              } : {}}
              viewport={{ once: true }}
              transition={plan.popular ? {
                opacity: { duration: 0.6, delay: index * 0.1 },
                borderColor: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              } : { duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl p-6 cursor-pointer"
              style={{
                backgroundColor: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                color: plan.popular ? 'var(--color-bg)' : 'inherit',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: plan.popular ? undefined : 'var(--color-border)',
              }}
              onClick={() => handleCardClick(plan.id)}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
                >
                  {t('popular')}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {t(`${plan.id}.name`)}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
                  >
                    {t(`${plan.id}.shortDesc`)}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="text-2xl font-bold">${plan.price.toLocaleString()}</span>
                    <span
                      className="text-xs ml-1"
                      style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
                    >
                      {t('from')}
                    </span>
                  </div>
                  <ChevronDown size={20} className="opacity-50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Modal */}
        <AnimatePresence>
          {expandedCard && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 z-50 lg:hidden"
                onClick={closeModal}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50 lg:hidden max-h-[85vh] overflow-y-auto"
              >
                {(() => {
                  const plan = plans.find(p => p.id === expandedCard);
                  if (!plan) return null;
                  return (
                    <div
                      className="relative rounded-2xl p-6"
                      style={{
                        backgroundColor: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                        color: plan.popular ? 'var(--color-bg)' : 'inherit',
                        border: `1px solid ${plan.popular ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-1 rounded-full hover:opacity-70 transition-opacity"
                        style={{
                          backgroundColor: plan.popular ? 'var(--color-bg)' : 'var(--color-fg)',
                          color: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                        }}
                      >
                        <X size={18} />
                      </button>

                      <h3 className="text-xl font-semibold mb-3">
                        {t(`${plan.id}.name`)}
                      </h3>
                      <p className="text-sm mb-2 text-muted" style={plan.popular ? { color: 'inherit', opacity: 0.8 } : undefined}>
                        {t(`${plan.id}.description`)}
                      </p>
                      <p className="text-sm mb-5 text-muted" style={plan.popular ? { color: 'inherit', opacity: 0.8 } : undefined}>
                        {t(`${plan.id}.description2`)}
                      </p>

                      <div className="mb-5">
                        <p className="text-sm font-medium mb-3">{t('includes')}</p>
                        <ul className="space-y-2.5">
                          {Array.from({ length: plan.features }).map((_, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                              <span>{t(`${plan.id}.feature${i + 1}`)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5" style={{ borderTop: `1px solid ${plan.popular ? 'rgba(0,0,0,0.1)' : 'var(--color-border)'}` }}>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">${plan.price.toLocaleString()}</span>
                          <span
                            className="text-sm ml-1"
                            style={{ opacity: plan.popular ? 0.7 : 1, color: plan.popular ? 'inherit' : 'var(--color-muted)' }}
                          >
                            {t('from')}
                          </span>
                        </div>

                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            closeModal();
                            const element = document.querySelector('#contact');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="block w-full py-3 text-center text-base font-medium rounded-full transition-opacity hover:opacity-90 cursor-pointer"
                          style={{
                            backgroundColor: plan.popular ? 'var(--color-bg)' : 'var(--color-fg)',
                            color: plan.popular ? 'var(--color-fg)' : 'var(--color-bg)',
                          }}
                        >
                          {t('cta')}
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
