'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown } from 'lucide-react';

const plans = [
  { id: 'minimal', price: 270, features: 6 },
  { id: 'standart', price: 870, features: 7 },
  { id: 'individual', price: 2700, features: 7 },
];

export function Services() {
  const t = useTranslations('services');
  const pt = useTranslations('pricing');
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
    <section id="services" className="section-padding bg-section">
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
        </motion.div>

        {/* Desktop Cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="text-xl font-semibold mb-3">
                {pt(`${plan.id}.name`)}
              </h3>
              <p className="text-sm mb-2 text-muted">
                {pt(`${plan.id}.description`)}
              </p>
              <p className="text-sm mb-6 text-muted opacity-80">
                {pt(`${plan.id}.description2`)}
              </p>

              <div className="mb-6">
                <ul className="space-y-2.5">
                  {Array.from({ length: plan.features }).map((_, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                      <span>{pt(`${plan.id}.feature${i + 1}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <span className="text-xl font-bold">${plan.price.toLocaleString()}</span>
                  <span className="text-xl ml-0.5 font-bold">{pt('from')}</span>
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
                  className="btn-outline inline-block py-2 px-6 text-center text-sm font-medium rounded-full cursor-pointer"
                >
                  {pt('cta')}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl p-6 cursor-pointer"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
              onClick={() => handleCardClick(plan.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {pt(`${plan.id}.name`)}
                  </h3>
                  <p className="text-xs text-muted">
                    {pt(`${plan.id}.shortDesc`)}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="text-base font-bold">${plan.price.toLocaleString()}</span>
                    <span className="text-base ml-0.5 font-bold">{pt('from')}</span>
                  </div>
                  <ChevronDown size={20} className="opacity-50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description below cards */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-base sm:text-lg max-w-2xl mx-auto text-center mt-10"
        >
          {t('description')}
        </motion.p>

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
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-1 rounded-full hover:opacity-70 transition-opacity"
                        style={{
                          backgroundColor: 'var(--color-fg)',
                          color: 'var(--color-bg)',
                        }}
                      >
                        <X size={18} />
                      </button>

                      <h3 className="text-xl font-semibold mb-3">
                        {pt(`${plan.id}.name`)}
                      </h3>
                      <p className="text-sm mb-2 text-muted">
                        {pt(`${plan.id}.description`)}
                      </p>
                      <p className="text-sm mb-5 text-muted opacity-80">
                        {pt(`${plan.id}.description2`)}
                      </p>

                      <div className="mb-5">
                        <p className="text-sm font-medium mb-3">{pt('includes')}</p>
                        <ul className="space-y-2.5">
                          {Array.from({ length: plan.features }).map((_, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                              <span>{pt(`${plan.id}.feature${i + 1}`)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <div>
                          <span className="text-lg font-bold">${plan.price.toLocaleString()}</span>
                          <span className="text-lg ml-0.5 font-bold">{pt('from')}</span>
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
                          className="btn-outline inline-block py-2 px-6 text-center text-sm font-medium rounded-full cursor-pointer"
                        >
                          {pt('cta')}
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
