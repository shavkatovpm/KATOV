'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n/config';

const STORAGE_KEY = 'katov_contact_prompt_seen';
const DELAY_MS = 30_000;

const TG_BOT = siteConfig.social.support; // https://t.me/katovuz_bot
const PHONE_HREF = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;
const EMAIL_HREF = `mailto:${siteConfig.contact.email}`;

type Tab = 'phone' | 'tg' | 'email';

interface TabCopy {
  label: string;
  title: string;
  sub: string;
  primary: string;
}

interface Copy {
  closeLabel: string;
  tabs: Record<Tab, TabCopy>;
}

const COPY: Record<Locale, Copy> = {
  uz: {
    closeLabel: 'Yopish',
    tabs: {
      phone: {
        label: "Qo'ng'iroq",
        title: siteConfig.contact.phone,
        sub: 'Ish vaqti: 09:00–20:00 (dush–shanba)',
        primary: "Qo'ng'iroq qilish",
      },
      tg: {
        label: 'Telegram',
        title: '@katovuz_bot',
        sub: "Telegram'da yozing — bir necha daqiqada javob beramiz",
        primary: "Telegram'da ochish",
      },
      email: {
        label: 'Email',
        title: siteConfig.contact.email,
        sub: "Batafsil ma'lumot uchun — email orqali yozing",
        primary: 'Email yozish',
      },
    },
  },
  ru: {
    closeLabel: 'Закрыть',
    tabs: {
      phone: {
        label: 'Звонок',
        title: siteConfig.contact.phone,
        sub: 'Часы работы: 09:00–20:00 (пн–сб)',
        primary: 'Позвонить',
      },
      tg: {
        label: 'Telegram',
        title: '@katovuz_bot',
        sub: 'Напишите нам в Telegram — ответим в течение нескольких минут',
        primary: 'Открыть в Telegram',
      },
      email: {
        label: 'Email',
        title: siteConfig.contact.email,
        sub: 'Для подробной информации — напишите на email',
        primary: 'Написать на email',
      },
    },
  },
  en: {
    closeLabel: 'Close',
    tabs: {
      phone: {
        label: 'Call',
        title: siteConfig.contact.phone,
        sub: 'Hours: 09:00–20:00 (Mon–Sat)',
        primary: 'Call now',
      },
      tg: {
        label: 'Telegram',
        title: '@katovuz_bot',
        sub: "Write us on Telegram — we'll reply within minutes",
        primary: 'Open in Telegram',
      },
      email: {
        label: 'Email',
        title: siteConfig.contact.email,
        sub: 'For detailed inquiries — write us by email',
        primary: 'Send email',
      },
    },
  },
};

const TAB_ORDER: Tab[] = ['phone', 'tg', 'email'];
const TAB_ICONS: Record<Tab, typeof Phone> = {
  phone: Phone,
  tg: Send,
  email: Mail,
};
const TAB_HREFS: Record<Tab, string> = {
  phone: PHONE_HREF,
  tg: TG_BOT,
  email: EMAIL_HREF,
};

interface ContactPromptProps {
  locale: Locale;
}

export function ContactPrompt({ locale }: ContactPromptProps) {
  const [shown, setShown] = useState(false);
  const [tab, setTab] = useState<Tab>('phone');
  const [mounted, setMounted] = useState(false);
  const copy = COPY[locale];

  useEffect(() => setMounted(true), []);

  // 30s timer + session dedup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const timer = setTimeout(() => setShown(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setShown(false);
  };

  // Mark seen when user clicks an action
  const handleAction = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setShown(false);
  };

  // Escape to close
  useEffect(() => {
    if (!shown) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shown]);

  if (!mounted) return null;

  const activeCopy = copy.tabs[tab];
  const activeHref = TAB_HREFS[tab];
  const isExternal = activeHref.startsWith('http');

  return createPortal(
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onClick={handleClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="absolute bottom-0 left-0 right-0"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="mx-auto px-4 sm:px-0 max-w-md">
              <div
                className="rounded-t-3xl shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderBottom: 'none',
                }}
              >
                <div className="pt-3 pb-1.5">
                  <div
                    className="w-10 h-1 rounded-full mx-auto"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 25%, transparent)' }}
                  />
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <div
                    className="grid grid-cols-3 p-1 rounded-2xl mt-3 mb-4"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)' }}
                  >
                    {TAB_ORDER.map((id) => {
                      const Icon = TAB_ICONS[id];
                      const isActive = tab === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setTab(id)}
                          className="relative flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] sm:text-[13px] font-semibold transition-colors"
                          style={{ color: isActive ? 'var(--color-bg)' : 'var(--color-fg)' }}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="katov-contact-tab-bg"
                              className="absolute inset-0 rounded-xl"
                              style={{ backgroundColor: 'var(--color-fg)' }}
                              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                            />
                          )}
                          <Icon size={13} className="relative" />
                          <span className="relative">{copy.tabs[id].label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="text-base sm:text-lg font-bold text-center break-all">
                        {activeCopy.title}
                      </p>
                      <p className="text-[12px] sm:text-sm text-muted text-center mt-1 mb-4 leading-relaxed">
                        {activeCopy.sub}
                      </p>
                      <a
                        href={activeHref}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={handleAction}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                      >
                        <span className="font-semibold text-[13px] sm:text-sm">
                          {activeCopy.primary}
                        </span>
                        <ArrowRight size={15} />
                      </a>
                    </motion.div>
                  </AnimatePresence>

                  <button
                    onClick={handleClose}
                    className="w-full text-center text-[12px] sm:text-sm text-muted hover:opacity-70 mt-3 sm:mt-4 py-2"
                  >
                    {copy.closeLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
