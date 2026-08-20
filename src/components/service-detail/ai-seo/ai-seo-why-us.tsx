'use client';

import { Check } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import type { ServiceLocalizedContent } from '@/data/services';

interface AiSeoWhyUsProps {
  content: ServiceLocalizedContent;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function splitLabel(item: string): [string, string | null] {
  const idx = item.indexOf(' — ');
  if (idx === -1) return [item, null];
  return [item.slice(0, idx), item.slice(idx + 3)];
}

export function AiSeoWhyUs({ content }: AiSeoWhyUsProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">{content.whyUsTitle}</h2>

        <motion.ul
          className="grid sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {content.whyUs.map((item) => {
            const [label, detail] = splitLabel(item);
            return (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl p-4"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
              >
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                >
                  <Check size={14} />
                </span>
                <span className="text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold">{label}</span>
                  {detail && <span className="text-muted"> — {detail}</span>}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
