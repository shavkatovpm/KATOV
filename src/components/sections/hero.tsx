'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
  const title = t('title');

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % blurTexts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [showTypewriter, title]);

  // Calculate visible characters with their indices
  const visibleChars = displayedTitle.split('').map((char, i) => ({
    char,
    index: i,
    isNew: i === displayedTitle.length - 1,
  }));

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container-custom text-center">
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2 uppercase"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 1.75 }}
          className="text-muted text-lg sm:text-xl lg:text-3xl mb-2 whitespace-pre-line"
        >
          {t('greeting')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 1.75 }}
          className="mb-2 h-16 sm:h-20 flex items-center justify-center relative"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-creative absolute"
              style={{ color: '#dddddd' }}
            >
              {blurTexts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="mb-2 h-10 sm:h-12 flex items-center justify-center">
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
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 1.75 }}
        >
          <Link
            href="#services"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full transition-opacity"
          >
            {t('cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
