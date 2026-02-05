'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isOpen && (
          <div
            className="lg:hidden pb-6 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex flex-col gap-1 pt-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-base font-medium nav-link"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div
                className="flex items-center gap-3 pt-4 mt-2 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
