'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { IoLogoInstagram } from 'react-icons/io5';
import { PiTelegramLogo } from 'react-icons/pi';
import { siteConfig } from '@/config/site';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isHomePage = pathname === `/${locale}` || pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close menu on scroll
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as unknown as EventListener);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="header-animate transition-all duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: 'none',
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 sm:h-20 relative">
          <a
            href={`/${locale}`}
            onClick={(e) => {
              e.preventDefault();
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                router.push(`/${locale}`);
              }
            }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight uppercase cursor-pointer"
          >
            <span className="logo-icon text-2xl sm:text-3xl cursor-pointer" style={{ color: '#f5f5f5' }}>|&lt;</span>
            <span className="cursor-pointer" style={{ color: '#f5f5f5' }}>{siteConfig.name}</span>
          </a>

          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {siteConfig.navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isHomePage) {
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      router.push(`/${locale}${item.href}`);
                    }
                  }}
                  className="text-sm font-medium nav-link cursor-pointer"
                >
                  {t(item.key)}
                </a>
              ) : (
                <a
                  key={item.key}
                  href={`/${locale}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isHomePage) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      router.push(`/${locale}`);
                    }
                  }}
                  className="text-sm font-medium nav-link cursor-pointer"
                >
                  {t(item.key)}
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-0.5">
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
              className="lg:hidden border-t"
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
                    {item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          if (isHomePage) {
                            const element = document.querySelector(item.href);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            router.push(`/${locale}${item.href}`);
                          }
                        }}
                        className="py-3 text-base font-medium nav-link text-right block cursor-pointer"
                      >
                        {t(item.key)}
                      </a>
                    ) : (
                      <a
                        href={`/${locale}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          if (isHomePage) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            router.push(`/${locale}`);
                          }
                        }}
                        className="py-3 text-base font-medium nav-link text-right block cursor-pointer"
                      >
                        {t(item.key)}
                      </a>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: siteConfig.navigation.length * 0.05 }}
                  className="flex items-center justify-end gap-0.5 pt-4 mt-2 border-t w-full"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <a
                    href={siteConfig.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 cursor-pointer transition-colors hover:text-white"
                    style={{ color: '#f5f5f5' }}
                    aria-label="Telegram"
                  >
                    <PiTelegramLogo size={20} />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 cursor-pointer transition-colors hover:text-white"
                    style={{ color: '#f5f5f5' }}
                    aria-label="Instagram"
                  >
                    <IoLogoInstagram size={20} />
                  </a>
                  <a
                    href="tel:+998338880133"
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:text-white"
                    style={{ color: '#f5f5f5' }}
                  >
                    <Phone size={18} />
                    <span>+998 33 888 01 33</span>
                  </a>
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
