'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated text component with blur effect
function AnimatedText({
  text,
  className,
  startDelay = 0,
  charDelay = 0.02
}: {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.15,
            delay: startDelay + index * charDelay,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function About() {
  const t = useTranslations('about');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const title = t('title');
  const description = t('description');
  const description2 = t('description2');
  const featuresTitle = t('featuresTitle');
  const feature4 = t('feature4');
  const feature1 = t('feature1');
  const feature2 = t('feature2');
  const feature3 = t('feature3');

  // Calculate delays based on previous text lengths
  // Title animates first, then other text follows after title completes
  const titleDelay = 0;
  const titleDuration = title.length * 0.03 + 0.15; // Total time for title to complete
  const descDelay = titleDuration + 0.3; // Wait for title to finish + buffer
  const desc2Delay = descDelay + description.length * 0.015 + 0.1;
  const featuresTitleDelay = desc2Delay + description2.length * 0.015 + 0.2;
  const feature4Delay = featuresTitleDelay + featuresTitle.length * 0.02 + 0.1;
  const featuresRowDelay = feature4Delay + feature4.length * 0.02 + 0.1;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding md:min-h-screen md:flex md:items-center"
    >
      <div className="container-custom w-full">
        <div className="max-w-3xl md:max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16 md:text-center">
            <AnimatedText text={title} startDelay={titleDelay} charDelay={0.03} />
          </h2>

          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-6 md:mb-8 leading-relaxed text-left">
            <AnimatedText text={description} startDelay={descDelay} charDelay={0.015} />
          </p>

          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-12 md:mb-20 leading-relaxed text-left">
            <AnimatedText text={description2} startDelay={desc2Delay} charDelay={0.015} />
          </p>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-6 md:mb-10 text-left">
            <AnimatedText text={featuresTitle} startDelay={featuresTitleDelay} charDelay={0.02} />
          </p>

          <div className="mb-4 md:mb-8 text-left">
            <span className="text-base sm:text-lg md:text-2xl lg:text-3xl">
              <AnimatedText text={feature4} startDelay={feature4Delay} charDelay={0.02} />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: featuresRowDelay }}
            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 text-left"
          >
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl">
              <span className="text-muted md:hidden">•</span>
              <AnimatedText text={feature1} startDelay={featuresRowDelay} charDelay={0.02} />
            </span>
            <motion.span
              className="hidden md:inline text-muted mx-6 md:text-xl lg:text-2xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: featuresRowDelay + feature1.length * 0.02 }}
            >
              •
            </motion.span>
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl">
              <span className="text-muted md:hidden">•</span>
              <AnimatedText text={feature2} startDelay={featuresRowDelay + feature1.length * 0.02 + 0.05} charDelay={0.02} />
            </span>
            <motion.span
              className="hidden md:inline text-muted mx-6 md:text-xl lg:text-2xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: featuresRowDelay + (feature1.length + feature2.length) * 0.02 + 0.1 }}
            >
              •
            </motion.span>
            <span className="flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl">
              <span className="text-muted md:hidden">•</span>
              <AnimatedText text={feature3} startDelay={featuresRowDelay + (feature1.length + feature2.length) * 0.02 + 0.15} charDelay={0.02} />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
