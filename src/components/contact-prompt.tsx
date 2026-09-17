'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ArrowUpRight } from 'lucide-react';

const BUTTON_DELAY_MS = 15_000;
const AUTO_OPEN_DELAY_MS = 45_000;
const STORAGE_KEY = 'katov_telegram_prompt_seen';

export function ContactPrompt() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  if (locales.some((locale) => locale === segments[0])) segments.shift();
  const isBlog = segments[0] === 'blog';

  return <PagePrompt key={isBlog ? 'blog' : 'contact'} isBlog={isBlog} />;
}

function PagePrompt({ isBlog }: { isBlog: boolean }) {
  const autoOpenDelay = isBlog ? 30_000 : AUTO_OPEN_DELAY_MS;
  const t = useTranslations('contact');
  const telegram = useTranslations('blogTelegramPrompt');
  const [shown, setShown] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPulsing, setButtonPulsing] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 15s timer + session dedup — show the floating button first
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const timer = setTimeout(() => setButtonVisible(true), BUTTON_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Auto-open once: 30 seconds on blog pages, 45 seconds elsewhere.
  useEffect(() => {
    if (!buttonVisible || shown || !buttonPulsing) return;

    const timer = setTimeout(() => {
      setShown(true);
      setButtonPulsing(false);
    }, autoOpenDelay - BUTTON_DELAY_MS);
    return () => clearTimeout(timer);
  }, [buttonVisible, shown, buttonPulsing, autoOpenDelay]);

  const handleOpen = () => {
    setButtonPulsing(false);
    setShown(true);
  };

  const handleClose = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setShown(false);
  }, []);

  // Lock background scroll while the modal is open — otherwise a mobile
  // pull-to-refresh gesture on the page behind it reloads the tab, which
  // looks like the modal closed itself without the X button.
  useEffect(() => {
    if (!shown) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [shown]);

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {buttonVisible && !shown && (
          <motion.button
            key="contact-prompt-button"
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            onClick={handleOpen}
            aria-label={telegram('openButton')}
            title={telegram('openButton')}
            className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl"
            style={{
              backgroundColor: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            {buttonPulsing && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--color-fg)' }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <span className="relative">
              <Send size={22} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label={telegram('title')}
              className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-sm pointer-events-auto">
                <div
                  className="relative rounded-3xl shadow-2xl"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    onClick={handleClose}
                    aria-label={t('prompt.close')}
                    title={t('prompt.close')}
                    className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-70"
                    style={{
                      color: 'var(--color-fg)',
                      backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
                    }}
                  >
                    <X size={18} />
                  </button>

                  <div className="px-6 pt-8 pb-6 text-center">
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                    >
                      <Send size={20} strokeWidth={1.8} />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold leading-tight tracking-tight">
                      {telegram('title')}
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      {telegram('subtitle')}
                    </p>

                    <div
                      className="my-5 flex items-center gap-3 rounded-2xl border p-3 text-left"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)' }}
                      >
                        <Send size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">KATOV</p>
                        <p className="text-xs text-muted">@katovuz</p>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)' }}
                      >
                        {telegram('channel')}
                      </span>
                    </div>

                    <a
                      href="https://t.me/katovuz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                    >
                      {telegram('subscribe')}
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                    <p className="mt-3 text-xs text-muted">{telegram('newTab')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
