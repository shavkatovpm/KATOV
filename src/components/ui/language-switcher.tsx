'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { FlagIcon } from '@/components/ui/flag-icon';

function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  return (newLocale: Locale) => {
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || '/');
  };
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const goToLocale = useSwitchLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    goToLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={localeNames[locale]}
        aria-expanded={isOpen}
        className="group flex items-center gap-1.5 px-3 py-2 text-sm font-medium cursor-pointer transition-colors hover:text-white"
        style={{ color: 'var(--color-nav-fg)' }}
      >
        <FlagIcon
          locale={locale}
          className="transition-transform duration-300 group-hover:rotate-[20deg] group-hover:scale-110"
        />
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 p-1 rounded-xl shadow-lg min-w-[160px] z-50"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left cursor-pointer transition-colors hover:bg-white/5 hover:text-white ${
                locale === loc ? 'font-medium' : ''
              }`}
              style={{ color: 'var(--color-nav-fg)' }}
            >
              <FlagIcon
                locale={loc}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="flex-1 text-sm">{localeNames[loc]}</span>
              {locale === loc && <Check size={14} className="opacity-70" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Flag segmented control — used in the mobile menu. */
export function LanguageSegment() {
  const locale = useLocale() as Locale;
  const goToLocale = useSwitchLocale();
  const pillId = useId();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-1"
      style={{ border: '1px solid var(--color-border)' }}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => loc !== locale && goToLocale(loc)}
          aria-label={localeNames[loc]}
          aria-pressed={locale === loc}
          className="relative flex items-center justify-center w-9 h-8 rounded-full cursor-pointer"
        >
          {locale === loc && (
            <motion.span
              layoutId={pillId}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'rgba(127, 127, 127, 0.22)' }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <FlagIcon
            locale={loc}
            className={`relative transition-opacity ${locale === loc ? 'opacity-100' : 'opacity-45'}`}
          />
        </button>
      ))}
    </div>
  );
}
