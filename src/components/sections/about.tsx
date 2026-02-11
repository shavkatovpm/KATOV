'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated text component with blur effect - words stay together
function AnimatedText({
  text,
  className,
  startDelay = 0,
  charDelay = 0.02,
  isInView
}: {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
  isInView: boolean;
}) {
  // Split text into words, keeping track of character index for delays
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <span className={className}>
      {words.map((word, wordIndex) => {
        const wordStartIndex = charIndex;
        charIndex += word.length + 1; // +1 for space

        return (
          <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.3,
                  delay: startDelay + (wordStartIndex + i) * charDelay,
                  ease: 'easeOut'
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.15,
                  delay: startDelay + (wordStartIndex + word.length) * charDelay,
                  ease: 'easeOut'
                }}
                style={{ display: 'inline-block' }}
              >
                {'\u00A0'}
              </motion.span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function About() {
  const t = useTranslations('about');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);

  // Wait for hero animation to complete before allowing other About animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation duration: slower on mobile (25% slower)
  const borderDuration = isMobile ? 2.55 : 2;

  // Combined condition: animate only when in view AND hero animation is complete
  const canAnimate = isInView && heroComplete;

  const title = t('title');
  const description = t('description');
  const description2 = t('description2');
  const featuresTitle = t('featuresTitle');
  const feature4 = t('feature4');
  const featuresIntro = t('featuresIntro');
  const bulletFeatures = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature5'),
    t('feature6'),
  ];

  // Calculate delays - title animates separately, other elements start from 0 when scrolled into view
  const descDelay = 0;
  const desc2Delay = descDelay + description.length * 0.004 + 0.025;
  const featuresTitleDelay = desc2Delay + description2.length * 0.004 + 0.025;
  const feature4Delay = featuresTitleDelay + featuresTitle.length * 0.005 + 0.025;
  const featuresIntroDelay = feature4Delay + feature4.length * 0.005 + 0.025;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding md:min-h-screen md:flex md:items-center"
    >
      <div className="container-custom w-full">
        <div className="max-w-3xl md:max-w-6xl mx-auto relative">
          {/* Animated borders that draw from top to bottom when section is in view */}
          <motion.div
            className="absolute -left-4 sm:-left-6 md:-left-8 top-0 bottom-0 w-px pointer-events-none"
            style={{ backgroundColor: '#dddddd' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={canAnimate ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: borderDuration, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute -right-4 sm:-right-6 md:-right-8 top-0 bottom-0 w-px pointer-events-none"
            style={{ backgroundColor: '#dddddd' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={canAnimate ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: borderDuration, ease: 'easeOut' }}
          />
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16 text-center">
            {title}
          </h2>

          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-12 md:mb-20 leading-relaxed text-left">
            <AnimatedText text={description} startDelay={descDelay} charDelay={0.004} isInView={canAnimate} />
            {' '}
            <AnimatedText text={description2} startDelay={desc2Delay} charDelay={0.004} isInView={canAnimate} />
          </p>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-6 md:mb-10 text-left">
            <AnimatedText text={featuresTitle} startDelay={featuresTitleDelay} charDelay={0.005} isInView={canAnimate} />
          </p>

          <div className="mb-8 md:mb-12 text-left">
            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              <AnimatedText text={feature4} startDelay={feature4Delay} charDelay={0.005} isInView={canAnimate} />
            </span>
          </div>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-4 md:mb-6 text-left">
            <AnimatedText text={featuresIntro} startDelay={featuresIntroDelay} charDelay={0.005} isInView={canAnimate} />
          </p>

          <div className="flex flex-col gap-2 md:gap-3 text-left">
            {bulletFeatures.map((feat, i) => {
              const prevChars = bulletFeatures.slice(0, i).reduce((sum, f) => sum + f.length, 0);
              const bulletDelay = featuresIntroDelay + featuresIntro.length * 0.005 + 0.025 + prevChars * 0.0075 + i * 0.025;
              return (
                <span key={i} className="flex items-center gap-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                  <motion.span
                    className="text-muted"
                    initial={{ opacity: 0 }}
                    animate={canAnimate ? { opacity: 1 } : {}}
                    transition={{ delay: bulletDelay }}
                  >
                    •
                  </motion.span>
                  <AnimatedText text={feat} startDelay={bulletDelay} charDelay={0.0075} isInView={canAnimate} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
