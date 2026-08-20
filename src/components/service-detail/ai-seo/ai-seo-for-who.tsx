'use client';

import { motion, type Variants } from 'framer-motion';
import type { ServiceLocalizedContent } from '@/data/services';

interface AiSeoForWhoProps {
  content: ServiceLocalizedContent;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function AiSeoForWho({ content }: AiSeoForWhoProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">{content.forWhoTitle}</h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {content.forWho.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl p-5"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <div className="text-3xl font-bold opacity-25 mb-3 leading-none">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-base font-semibold mb-1.5 leading-snug">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
