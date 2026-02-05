'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function Header() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay: 1.75 }}
      className="transition-all duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: 'none',
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight uppercase"
          >
            <span className="logo-icon text-2xl sm:text-3xl" style={{ color: '#dddddd' }}>|&lt;</span>
            <span style={{ color: '#dddddd' }}>{siteConfig.name}</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium nav-link"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 flex flex-col justify-center items-center w-10 h-10"
            aria-label="Menu"
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-6 h-0.5 bg-current mb-1.5"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
                scaleX: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-6 h-0.5 bg-current mb-1.5"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-6 h-0.5 bg-current"
            />
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex flex-col items-end gap-1 pt-4 pb-6">
                {siteConfig.navigation.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="py-3 text-base font-medium nav-link text-right block"
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: siteConfig.navigation.length * 0.05 }}
                  className="flex items-center gap-3 pt-4 mt-2 border-t w-full justify-end"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
