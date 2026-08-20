'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogoInstagram } from 'react-icons/io5';
import { PiTelegramLogo } from 'react-icons/pi';
import { siteConfig } from '@/config/site';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { RainLogo } from '@/components/ui/logo-animations';
import { NAVIGATION_START } from '@/components/page-transition';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { localizedPath } from '@/lib/urls';
import type { Locale } from '@/i18n/config';

// Mobile menu uses its own order (desktop nav order stays as defined in siteConfig)
const MOBILE_NAV_ORDER = ['seo', 'aiSeo', 'saytYaratish', 'services', 'portfolio', 'contact', 'blog'];
const mobileNavigation = MOBILE_NAV_ORDER.flatMap(
  (key) => siteConfig.navigation.find((item) => item.key === key) ?? []
);

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const homeHref = localizedPath(locale) || '/';

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

  // The header outlives the route, so the open menu would otherwise stay up
  // over the new page. The links' own onClick can't do this any more —
  // PageTransition takes the click over to run its exit animation first — and
  // closing on a pathname change lands inside React's route transition, where
  // the menu's exit animation never plays and it just freezes open.
  useEffect(() => {
    const close = () => setIsOpen(false);
    document.addEventListener(NAVIGATION_START, close);
    return () => document.removeEventListener(NAVIGATION_START, close);
  }, []);

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
        backgroundColor: 'var(--color-nav-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: 'none',
        color: 'var(--color-nav-fg)',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 sm:h-20 relative">
          <a
            href={homeHref}
            onClick={(e) => {
              e.preventDefault();
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                router.push(homeHref);
              }
            }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight uppercase cursor-pointer"
          >
            <RainLogo
              className="h-9 sm:h-10 w-auto shrink-0"
              color="var(--color-nav-fg)"
              // Same look as the test page, not the same numbers: the mark is
              // ~6x smaller there, so the defaults would put the glyphs at
              // under 2px. These keep glyphs, spacing and outline at the same
              // on-screen size the large version has.
              columns={3}
              rowHeight={253}
              fontSize={205}
              strokeWidth={30}
            />
            <span className="cursor-pointer" style={{ color: 'var(--color-nav-fg)' }}>{siteConfig.name}</span>
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
                      router.push(localizedPath(locale, item.href));
                    }
                  }}
                  className="text-sm font-medium nav-link cursor-pointer"
                >
                  {t(item.key)}
                </a>
              ) : item.href === '/' ? (
                <a
                  key={item.key}
                  href={homeHref}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isHomePage) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      router.push(homeHref);
                    }
                  }}
                  className="text-sm font-medium nav-link cursor-pointer"
                >
                  {t(item.key)}
                </a>
              ) : (
                <a
                  key={item.key}
                  href={localizedPath(locale, item.href)}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(localizedPath(locale, item.href));
                  }}
                  className="text-sm font-medium nav-link cursor-pointer"
                >
                  {t(item.key)}
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-0.5">
            <ThemeToggle />
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
              // Without a key AnimatePresence loses track of this child across
              // a route change and never finishes the exit, leaving the menu
              // frozen open over the new page.
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex flex-col items-end gap-1 pt-4 pb-6">
                {mobileNavigation.map((item, index) => (
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
                            router.push(localizedPath(locale, item.href));
                          }
                        }}
                        className="py-3 text-base font-medium nav-link text-right block cursor-pointer"
                      >
                        {t(item.key)}
                      </a>
                    ) : item.href === '/' ? (
                      <a
                        href={homeHref}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          if (isHomePage) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            router.push(homeHref);
                          }
                        }}
                        className="py-3 text-base font-medium nav-link text-right block cursor-pointer"
                      >
                        {t(item.key)}
                      </a>
                    ) : (
                      <a
                        href={localizedPath(locale, item.href)}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          router.push(localizedPath(locale, item.href));
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
                  transition={{ duration: 0.3, delay: mobileNavigation.length * 0.05 }}
                  className="flex flex-col gap-3 pt-4 mt-2 border-t w-full"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {/* Telegram / Instagram + theme / language — one row */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-0.5">
                      <a
                        href={siteConfig.social.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 cursor-pointer transition-colors hover:text-white"
                        style={{ color: 'var(--color-nav-fg)' }}
                        aria-label="Telegram"
                      >
                        <PiTelegramLogo size={20} />
                      </a>
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 cursor-pointer transition-colors hover:text-white"
                        style={{ color: 'var(--color-nav-fg)' }}
                        aria-label="Instagram"
                      >
                        <IoLogoInstagram size={20} />
                      </a>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <ThemeToggle />
                      <LanguageSwitcher />
                    </div>
                  </div>

                  {/* Phone number — full width, last element */}
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                    className="block w-full text-center py-3 rounded-lg text-base font-medium tracking-wide cursor-pointer transition-colors hover:text-white whitespace-nowrap"
                    style={{
                      color: 'var(--color-nav-fg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu backdrop — darkens everything below the open navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="lg:hidden"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
