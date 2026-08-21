'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import CardSwap, { Card } from '@/components/ui/card-swap';
import { iconMap } from '../icon-map';
import type { ServiceLocalizedContent } from '@/data/services';
import type { Locale } from '@/i18n/config';

interface AdsHighlightsProps {
  content: ServiceLocalizedContent;
  basePrice: number;
  locale: Locale;
}

const copy: Record<
  Locale,
  { title: string; lead: string; deliverablesLabel: string; firstResultValue: string; firstResultLabel: string; monthlyValue: string; monthlyLabel: string; priceLabel: string }
> = {
  uz: {
    title: 'Raqamlar aniq, byudjet nazoratda',
    lead: "Google Ads'da ham qancha to'layotganingiz va reklama qachon natija berishi aniq bo'lishi kerak.",
    deliverablesLabel: 'paket punktlari',
    firstResultValue: '2–4 kun',
    firstResultLabel: 'birinchi trafik',
    monthlyValue: 'Har oy',
    monthlyLabel: 'optimizatsiya',
    priceLabel: "boshlang'ich narx",
  },
  ru: {
    title: 'Цифры точны, бюджет под контролем',
    lead: 'В Google Ads тоже должно быть ясно, сколько вы платите и когда реклама начнёт работать.',
    deliverablesLabel: 'пунктов пакета',
    firstResultValue: '2–4 дня',
    firstResultLabel: 'первый трафик',
    monthlyValue: 'Каждый месяц',
    monthlyLabel: 'оптимизация',
    priceLabel: 'стартовая цена',
  },
  en: {
    title: 'Clear numbers, budget under control',
    lead: "Google Ads should be just as clear about what you're spending and when it starts working.",
    deliverablesLabel: 'package items',
    firstResultValue: '2–4 days',
    firstResultLabel: 'first traffic',
    monthlyValue: 'Every month',
    monthlyLabel: 'optimization',
    priceLabel: 'starting price',
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  const animate = useCallback(() => {
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return <span ref={ref}>{display}</span>;
}

export function AdsHighlights({ content, basePrice, locale }: AdsHighlightsProps) {
  const t = copy[locale];
  const [cardSize, setCardSize] = useState({ w: 350, h: 260, dist: 20, vDist: 50 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const next =
        w < 640
          ? { w: w - 64, h: Math.round((w - 64) * 0.68), dist: 10, vDist: 40 }
          : { w: 350, h: 260, dist: 20, vDist: 50 };
      setCardSize((prev) =>
        prev.w === next.w && prev.h === next.h && prev.dist === next.dist && prev.vDist === next.vDist
          ? prev
          : next
      );
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="section-padding md:py-20 lg:py-24">
      <div className="container-custom w-full">
        <div className="max-w-3xl md:max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-balance"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t.title}
          </motion.h2>

          <motion.p
            className="text-muted text-base sm:text-lg md:text-xl mb-8 md:mb-10 leading-relaxed text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-14 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {content.benefits.map((benefit) => {
              const BenefitIcon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <BenefitIcon size={16} className="opacity-70" />
                  {benefit.title}
                </motion.div>
              );
            })}
          </motion.div>

          <div className="md:flex md:items-center md:gap-8">
            <motion.div
              className="grid grid-cols-2 gap-3 md:gap-4 mb-16 md:mb-0 md:w-1/2 md:shrink-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div className="about-stat-card card p-4 sm:p-5 md:px-6 md:py-10 text-center" variants={fadeUp}>
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-3">
                  $<AnimatedNumber value={basePrice} />
                </div>
                <div className="text-muted text-xs sm:text-sm">{t.priceLabel}</div>
              </motion.div>

              <motion.div className="about-stat-card card p-4 sm:p-5 md:px-6 md:py-10 text-center" variants={fadeUp}>
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-3">
                  <AnimatedNumber value={content.deliverables.length} />
                </div>
                <div className="text-muted text-xs sm:text-sm">{t.deliverablesLabel}</div>
              </motion.div>

              <motion.div className="about-stat-card card p-4 sm:p-5 md:px-6 md:py-10 text-center" variants={fadeUp}>
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-3">
                  {t.firstResultValue}
                </div>
                <div className="text-muted text-xs sm:text-sm">{t.firstResultLabel}</div>
              </motion.div>

              <motion.div className="about-stat-card card p-4 sm:p-5 md:px-6 md:py-10 text-center" variants={fadeUp}>
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-3">
                  {t.monthlyValue}
                </div>
                <div className="text-muted text-xs sm:text-sm">{t.monthlyLabel}</div>
              </motion.div>
            </motion.div>

            <div className="md:w-1/2">
              <div className="mb-4 flex items-center justify-between md:justify-start md:gap-3">
                <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
                  {content.processTitle}
                </h3>
              </div>
              <div className="relative h-[400px] sm:h-[420px] md:h-[440px] overflow-hidden flex items-center justify-center pointer-events-none">
                <CardSwap
                  width={cardSize.w}
                  height={cardSize.h}
                  cardDistance={cardSize.dist}
                  verticalDistance={cardSize.vDist}
                  delay={4000}
                  pauseOnHover={false}
                  skewAmount={1.5}
                  easing="smooth"
                >
                  {content.process.map((step) => (
                    <Card key={step.step} className="p-4 sm:p-5 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                        >
                          {step.step}
                        </span>
                        <span className="text-xs text-muted">{step.duration}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-1.5">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-4">{step.description}</p>
                    </Card>
                  ))}
                </CardSwap>
              </div>
              <p className="text-center md:text-left text-xs text-muted mt-3">
                {content.processTotalDuration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
