'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { FolderCheck, CalendarDays, Headset, CircleCheckBig } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';

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

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
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
    <div ref={ref} className="text-2xl sm:text-3xl md:text-3xl font-bold leading-none mb-0.5">
      {isInView ? display : `0${suffix}`}
    </div>
  );
}

export function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label'), icon: FolderCheck },
    { value: t('stat2Value'), label: t('stat2Label'), icon: CalendarDays },
    { value: t('stat3Value'), label: t('stat3Label'), icon: Headset },
    { value: t('stat4Value'), label: t('stat4Label'), icon: CircleCheckBig },
  ];

  const approaches = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
    { title: t('step4Title'), desc: t('step4Desc') },
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
            {t('description3')}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12"
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
                  className="about-stat-card card p-4 sm:p-5 md:p-6 relative overflow-hidden text-center"
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

          {/* Approach Section */}
          <motion.p
            className="text-muted text-sm sm:text-base md:text-base mb-5 md:mb-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t('processTitle')}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {approaches.map((item, i) => (
              <motion.div
                key={i}
                className="card p-4 sm:p-5 md:p-6"
                variants={fadeLeft}
              >
                <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-1.5 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
