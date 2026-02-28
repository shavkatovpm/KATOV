'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { FolderCheck, CalendarDays, Headset, CircleCheckBig, PenTool, ShieldCheck, Target, Users } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';
import CardSwap, { Card } from '@/components/ui/card-swap';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};


function CounterValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  const animate = useCallback(() => {
    const duration = 1500;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, suffix]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-3xl font-bold leading-none mb-3">
      {isInView ? display : `0${suffix}`}
    </div>
  );
}

export function About() {
  const t = useTranslations('about');

  const [cardSize, setCardSize] = useState({ w: 300, h: 260, dist: 20, vDist: 50 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        const cardW = w - 64; // har tomondan 32px masofa
        const cardH = Math.round(cardW * 0.65);
        setCardSize({ w: cardW, h: cardH, dist: 15, vDist: 40 });
      } else {
        setCardSize({ w: 300, h: 260, dist: 20, vDist: 50 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label'), icon: FolderCheck },
    { value: t('stat2Value'), label: t('stat2Label'), icon: CalendarDays },
    { value: t('stat3Value'), label: t('stat3Label'), icon: Headset },
    { value: t('stat4Value'), label: t('stat4Label'), icon: CircleCheckBig },
  ];

  const approaches = [
    { title: t('step1Title'), desc: t('step1Desc'), icon: PenTool },
    { title: t('step2Title'), desc: t('step2Desc'), icon: ShieldCheck },
    { title: t('step3Title'), desc: t('step3Desc'), icon: Target },
    { title: t('step4Title'), desc: t('step4Desc'), icon: Users },
  ];

  return (
    <section
      id="about"
      className="section-padding md:h-screen md:flex md:items-center md:py-12 lg:py-16"
    >
      <div className="container-custom w-full">
        <div className="max-w-3xl md:max-w-6xl mx-auto">
          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted text-base sm:text-lg md:text-lg lg:text-xl mb-10 md:mb-12 leading-relaxed text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t('description1')}
            <br className="md:hidden" />
            {t('description2') ? ` ${t('description2')}` : ' '}
            <br className="hidden md:block" />
            {` ${t('description3')}`}
          </motion.p>

          {/* Desktop: Stats left + CardSwap right | Mobile: stacked */}
          <div className="md:flex md:items-center md:gap-8">
            {/* Stats Grid — mobile: 2x2 full width, desktop: 2x2 left side */}
            <motion.div
              className="grid grid-cols-2 gap-3 md:gap-4 mb-16 md:mb-0 md:w-1/2 md:shrink-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    className="about-stat-card card p-4 sm:p-5 md:px-6 md:py-10 relative overflow-hidden text-center"
                    variants={fadeUp}
                  >
                    <Icon
                      strokeWidth={0.8}
                      className="absolute top-2 left-2 opacity-[0.15] pointer-events-none size-10 sm:size-14 md:size-16"
                    />
                    <div className="relative z-10">
                      <CounterValue value={stat.value} />
                      <div className="text-muted text-xs sm:text-sm">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Approach Section — mobile: below stats, desktop: right side */}
            <div className="md:w-1/2">
              <div className="relative h-[400px] sm:h-[420px] md:h-[480px] overflow-hidden flex items-center justify-center">
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
                  {approaches.map((item, i) => {
                    const ApproachIcon = item.icon;
                    return (
                      <Card key={i} className="p-3 sm:p-4 md:p-5 flex flex-col">
                        <h3 className="text-base sm:text-lg md:text-lg font-bold mb-1">
                          {item.title}
                        </h3>
                        <div className="flex-1 flex items-center justify-center">
                          <ApproachIcon strokeWidth={1} className="size-20 sm:size-24 md:size-20" />
                        </div>
                        <p className="text-muted text-sm sm:text-base md:text-xs leading-relaxed line-clamp-4">
                          {item.desc}
                        </p>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
