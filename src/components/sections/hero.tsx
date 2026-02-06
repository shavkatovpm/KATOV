'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const blurTexts = [
  'Ishonchli website',
  'Minimalistik dizayn',
  'Zamonaviy dastur',
  'Raqamli yechimlar',
  'Yoqimli interfeys',
];

export function Hero() {
  const t = useTranslations('hero');
  const [textIndex, setTextIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showOtherElements, setShowOtherElements] = useState(false);
  const title = t('title');

  useEffect(() => {
    // "Ishonchli website" (index 0) stays 30% longer
    const duration = textIndex === 0 ? 5850 : 4500;
    const timeout = setTimeout(() => {
      setTextIndex((prev) => (prev + 1) % blurTexts.length);
    }, duration);
    return () => clearTimeout(timeout);
  }, [textIndex]);

  // Typewriter effect - starts when "Katov" animation completes (0.75s delay + 0.5s duration = 1.25s)
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setShowTypewriter(true);
    }, 1250);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!showTypewriter) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= title.length) {
        setDisplayedTitle(title.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Show other elements 1 second after typewriter completes
        setTimeout(() => {
          setShowOtherElements(true);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [showTypewriter, title]);

  // Calculate visible characters with their indices
  const visibleChars = displayedTitle.split('').map((char, i) => ({
    char,
    index: i,
    isNew: i === displayedTitle.length - 1,
  }));

  return (
    <section className="relative py-32 sm:py-40 md:py-48 lg:py-56">
      <div className="container-custom text-center">
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2 uppercase"
        >
          {t('name')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={showOtherElements ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          className="h-20 sm:h-24 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-creative text-[#dddddd]"
            >
              {blurTexts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div
          className="mb-20 h-10 sm:h-12 flex items-center justify-center relative mt-4"
          style={{
            backgroundColor: '#000000',
            boxShadow: '0 -8px 12px 8px #000000',
            zIndex: 50
          }}
        >
          <span
            className="text-2xl sm:text-3xl md:text-4xl font-script inline-block"
            style={{ color: '#767676' }}
          >
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{
                  opacity: index < displayedTitle.length ? 1 : 0,
                  filter: index < displayedTitle.length ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.3 }}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={showOtherElements ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-outline inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full transition-colors cursor-pointer"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
