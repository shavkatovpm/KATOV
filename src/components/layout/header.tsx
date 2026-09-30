'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { IoLogoInstagram } from 'react-icons/io5';
import { PiTelegramLogo } from 'react-icons/pi';
import { siteConfig } from '@/config/site';
import { LanguageSwitcher, LanguageSegment } from '@/components/ui/language-switcher';
import { RainLogo } from '@/components/ui/logo-animations';
import { NAVIGATION_START } from '@/components/page-transition';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MenuButton } from '@/components/ui/menu-button';
import { localizedPath } from '@/lib/urls';
import { locales, type Locale } from '@/i18n/config';

// Mobile menu uses its own order (desktop nav order stays as defined in siteConfig)
const MOBILE_NAV_ORDER = ['seo', 'aiSeo', 'saytYaratish', 'ads', 'services', 'contact', 'blog'];
const mobileNavigation = MOBILE_NAV_ORDER.flatMap(
  (key) => siteConfig.navigation.find((item) => item.key === key) ?? []
);

export function Header() {
  const tNav = useTranslations('nav');
  // Navbar shows a shorter label for /sayt-yaratish; footer keeps the full one
  const t = (key: string) => tNav(key === 'saytYaratish' ? 'saytYaratishShort' : key);
  const tContact = useTranslations('contact');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const homeHref = localizedPath(locale) || '/';

  const isHomePage = pathname === `/${locale}` || pathname === '/';

  // Current path without the locale prefix, e.g. /ru/blog/post → /blog/post
  const segments = pathname.split('/');
  const barePath = locales.includes(segments[1] as Locale)
    ? `/${segments.slice(2).join('/')}`
    : pathname;
  // A section stays active on its inner pages too (/blog → /blog/post)
  const isActive = (href: string) =>
    href.startsWith('/') && href !== '/' && (barePath === href || barePath.startsWith(`${href}/`));

  // Nav links: close the mobile menu, then scroll or navigate
  const goTo = (href: string) => {
    setIsOpen(false);
    if (href === '/') {
      if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
      else router.push(homeHref);
    } else if (href.startsWith('#')) {
      if (isHomePage) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      else router.push(localizedPath(locale, href));
    } else {
      router.push(localizedPath(locale, href));
    }
  };

  // "Leave a request": home and service pages each have their own #contact
  // form, so use the one on this page and fall back to the home page's
  const goToRequestForm = () => {
    setIsOpen(false);
    const form = document.querySelector('#contact');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
    else router.push(localizedPath(locale, '#contact'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close menu on scroll
      if (isOpen) {
        setIsOpen(false);
      }
    };
    // A reload mid-page restores the scroll position without a scroll event
    const initial = requestAnimationFrame(() => setIsScrolled(window.scrollY > 50));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', handleScroll);
    };
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
      className="header-animate"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        color: 'var(--color-nav-fg)',
        transition: 'color 0.3s',
      }}
    >
      <div className="nav-shell" data-scrolled={isScrolled}>
        <div className="container-custom">
          <nav
            className={`flex items-center justify-between relative ${
              isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
            }`}
          >
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

            <div className="hidden lg:flex items-center gap-0 xl:gap-2 w-max whitespace-nowrap absolute left-1/2 -translate-x-1/2">
              {siteConfig.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.key}
                    href={item.href === '/' ? homeHref : localizedPath(locale, item.href)}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(item.href);
                    }}
                    aria-current={active ? 'page' : undefined}
                    className="relative px-3 py-1.5 rounded-full text-sm font-medium nav-link cursor-pointer whitespace-nowrap"
                  >
                    {active && (
                      // Shared layoutId: the pill slides from the old section to the new one
                      <motion.span
                        layoutId="nav-active-pill"
                        className="nav-active-pill absolute inset-0 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t(item.key)}</span>
                  </a>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-0.5">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            <MenuButton open={isOpen} onClick={() => setIsOpen(!isOpen)} className="lg:hidden" />
          </nav>
        </div>
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
              // Light enough that the glass menu above it still reads as glass
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              WebkitBackdropFilter: 'blur(3px)',
              backdropFilter: 'blur(3px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu — floating glass card under the navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Without a key AnimatePresence loses track of this child across
            // a route change and never finishes the exit, leaving the menu
            // frozen open over the new page.
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="nav-menu lg:hidden"
          >
            <div className="flex flex-col">
              {mobileNavigation.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href === '/' ? homeHref : localizedPath(locale, item.href)}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.035, ease: [0.4, 0, 0.2, 1] }}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="nav-menu-link flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[11px] tabular-nums opacity-40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[17px] font-medium">{t(item.key)}</span>
                  </span>
                  <ArrowUpRight size={16} className="opacity-40" />
                </motion.a>
              ))}
            </div>

            <div className="mx-2 my-2 h-px" style={{ backgroundColor: 'var(--nav-glass-border)' }} />

            {/* Telegram / Instagram + theme / language — one row */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-0.5">
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 cursor-pointer transition-opacity hover:opacity-70"
                  aria-label="Telegram"
                >
                  <PiTelegramLogo size={20} />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 cursor-pointer transition-opacity hover:opacity-70"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram size={20} />
                </a>
              </div>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <LanguageSegment />
              </div>
            </div>

            <button
              type="button"
              onClick={goToRequestForm}
              className="mt-2 flex w-full items-center justify-center gap-2 h-12 rounded-full text-[15px] font-semibold cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-nav-fg)', color: 'var(--color-bg)' }}
            >
              {tContact('prompt.openButton')}
              <ArrowUpRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
