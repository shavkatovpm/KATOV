'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceFAQProps {
  content: ServiceLocalizedContent;
}

export function ServiceFAQ({ content }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idPrefix = useId();

  return (
    <section id="faq" className="section-padding">
      <div className="container-custom max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.faqTitle}
        </h2>

        <div className="space-y-3">
          {content.faq.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${idPrefix}-faq-${i}`;
            const buttonId = `${idPrefix}-faq-btn-${i}`;

            return (
              <div
                key={item.question}
                className="rounded-2xl px-5 sm:px-6 py-4"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 cursor-pointer text-left"
                >
                  <h3 className="text-base sm:text-lg font-medium leading-snug">
                    {item.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="shrink-0 opacity-60 mt-0.5"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="pt-3 text-sm sm:text-base text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
