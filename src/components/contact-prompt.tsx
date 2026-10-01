'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { locales } from '@/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Check, AlertTriangle, MessageCircle, ArrowUpRight, ArrowRight } from 'lucide-react';

const BUTTON_DELAY_MS = 15_000;
const AUTO_OPEN_DELAY_MS = 45_000;
const SPLIT_EASE = [0.32, 0.72, 0, 1] as const;

// Blog pages (list + articles) promote the Telegram channel; every other page
// shows the lead form. Each has its own dismissal key.
export function ContactPrompt() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  if (locales.some((locale) => locale === segments[0])) segments.shift();
  const isBlog = segments[0] === 'blog';

  return <PagePrompt key={isBlog ? 'blog' : 'contact'} isBlog={isBlog} />;
}

function PagePrompt({ isBlog }: { isBlog: boolean }) {
  const storageKey = isBlog ? 'katov_blog_telegram_prompt_seen' : 'katov_contact_prompt_seen';
  const t = useTranslations('contact');
  const telegram = useTranslations('blogTelegramPrompt');
  const [shown, setShown] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPulsing, setButtonPulsing] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  // 15s timer + session dedup — show the floating button first
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(storageKey) === '1') return;

    const timer = setTimeout(() => setButtonVisible(true), BUTTON_DELAY_MS);
    return () => clearTimeout(timer);
  }, [storageKey]);

  // Auto-open once, 45 seconds after the button timer started.
  useEffect(() => {
    if (!buttonVisible || shown || !buttonPulsing) return;

    const timer = setTimeout(() => {
      setShown(true);
      setButtonPulsing(false);
    }, AUTO_OPEN_DELAY_MS - BUTTON_DELAY_MS);
    return () => clearTimeout(timer);
  }, [buttonVisible, shown, buttonPulsing]);

  const handleOpen = () => {
    setButtonPulsing(false);
    setShown(true);
  };

  const handleClose = useCallback(() => {
    sessionStorage.setItem(storageKey, '1');
    setShown(false);
  }, [storageKey]);

  // Lock background scroll while the modal is open — otherwise a mobile
  // pull-to-refresh gesture on the page behind it reloads the tab, which
  // looks like the modal closed itself without the X button.
  useEffect(() => {
    if (!shown) return;
    // Lenis drives wheel scrolling itself, so it has to be paused as well
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.body.style.overflow = original;
      lenis?.start();
    };
  }, [shown, lenis]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: '+998 ' + formData.phone,
          order: { type: 'CTA modal' },
        }),
      });
      if (response.ok) {
        sessionStorage.setItem(storageKey, '1');
        setSubmitted(true);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            aria-label={isBlog ? telegram('openButton') : t('prompt.openButton')}
            title={isBlog ? telegram('openButton') : t('prompt.openButton')}
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
            <span className="relative">{isBlog ? <Send size={22} /> : <MessageCircle size={22} />}</span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shown && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000]"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
        )}
        {shown && isBlog && (
          <motion.div
            key="telegram"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={telegram('title')}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Split card: inverted brand panel on the left, same family as the form modal */}
            <div
              className="relative grid w-full max-w-[600px] overflow-hidden rounded-3xl shadow-2xl pointer-events-auto sm:grid-cols-[0.8fr_1.2fr]"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-fg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="relative flex min-h-[140px] items-center justify-center overflow-hidden"
                style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
              >
                {/* Large outlined plane as a background mark, not a small inline icon */}
                <Send
                  aria-hidden="true"
                  strokeWidth={0.6}
                  className="absolute h-56 w-56 -right-10 -bottom-12 opacity-20"
                />
                <span className="relative text-4xl font-black tracking-tighter">KATOV</span>
              </div>
              <div className="relative p-7">
                <button
                  onClick={handleClose}
                  aria-label={t('prompt.close')}
                  title={t('prompt.close')}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-70"
                  style={{
                    color: 'var(--color-fg)',
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                  }}
                >
                  <X size={18} />
                </button>
                <h2 className="pr-8 text-2xl font-semibold tracking-tight leading-tight">
                  {telegram('title')}
                </h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">{telegram('subtitle')}</p>
                <a
                  href="https://t.me/katovuz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                >
                  {telegram('subscribe')}
                  <ArrowUpRight size={16} />
                </a>
                <p className="mt-3 text-center text-xs text-muted">{telegram('newTab')}</p>
              </div>
            </div>
          </motion.div>
        )}
        {shown && !isBlog && (
          <div
            key="form"
            role="dialog"
            aria-modal="true"
            aria-label={t('prompt.title')}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Split card: opens like a horizontal slit, inverted info panel on the left */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto grid md:grid-cols-[1fr_1.2fr] rounded-[28px] shadow-2xl pointer-events-auto"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-fg)',
                border: '1px solid var(--color-border)',
              }}
              initial={{ clipPath: 'inset(50% 0% 50% 0% round 28px)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
              exit={{
                clipPath: 'inset(50% 0% 50% 0% round 28px)',
                transition: { duration: 0.4, ease: SPLIT_EASE },
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <div
                className="relative p-7 sm:p-9 flex flex-col overflow-hidden"
                style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
              >
                {/* Large brand mark as background, not a small inline icon */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -left-4 text-[120px] font-black tracking-tighter opacity-[0.07] select-none"
                >
                  KATOV
                </span>
                <motion.h2
                  className="relative text-2xl sm:text-3xl font-semibold tracking-tight leading-tight pr-10 md:pr-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: SPLIT_EASE }}
                >
                  {t('prompt.title')}
                </motion.h2>
                <ol className="relative mt-8 space-y-4">
                  {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                    <motion.li
                      key={step}
                      className="flex items-center gap-3 text-sm"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.4, ease: SPLIT_EASE }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{ border: '1px solid color-mix(in srgb, var(--color-bg) 35%, transparent)' }}
                      >
                        {i + 1}
                      </span>
                      {t(`prompt.${step}`)}
                    </motion.li>
                  ))}
                </ol>
              </div>
              <div className="relative p-7 sm:p-9">
                <button
                  onClick={handleClose}
                  aria-label={t('prompt.close')}
                  title={t('prompt.close')}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 hover:rotate-90"
                  style={{
                    color: 'var(--color-fg)',
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
                  }}
                >
                  <X size={18} />
                </button>
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <motion.div
                      className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
                      style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    >
                      <Check size={24} />
                    </motion.div>
                    <p className="text-lg font-bold">{t('prompt.successTitle')}</p>
                    <p className="text-sm text-muted mt-1">{t('prompt.successText')}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted mb-6 pr-10 leading-relaxed">{t('prompt.subtitle')}</p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            name: value.charAt(0).toUpperCase() + value.slice(1),
                          });
                        }}
                        onInvalid={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity(
                            t('form.validation.nameRequired')
                          );
                        }}
                        onInput={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity('');
                        }}
                        className="w-full px-4 py-3.5 rounded-2xl bg-transparent border transition-colors focus:outline-none focus:border-[var(--color-fg)]"
                        style={{ borderColor: 'var(--color-border)' }}
                        placeholder={t('form.namePlaceholder')}
                      />

                      <div
                        className="flex items-center rounded-2xl border overflow-hidden transition-colors focus-within:border-[var(--color-fg)]"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <span className="pl-4 py-3.5 shrink-0 opacity-60">
                          +998
                        </span>
                        <input
                          type="tel"
                          required
                          pattern="\d{2} \d{3} \d{2} \d{2}"
                          value={formData.phone}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                            let formatted = '';
                            if (digits.length > 0) formatted = digits.slice(0, 2);
                            if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
                            if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
                            if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
                            setFormData({ ...formData, phone: formatted });
                          }}
                          onInvalid={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.setCustomValidity(
                              target.value === ''
                                ? t('form.validation.phoneRequired')
                                : t('form.validation.phoneIncomplete')
                            );
                          }}
                          onInput={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity('');
                          }}
                          className="flex-1 min-w-0 px-3 py-3.5 bg-transparent focus:outline-none"
                          placeholder="33 888 01 33"
                        />
                      </div>

                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onInvalid={(e) => {
                          (e.target as HTMLTextAreaElement).setCustomValidity(
                            t('form.validation.messageRequired')
                          );
                        }}
                        onInput={(e) => {
                          (e.target as HTMLTextAreaElement).setCustomValidity('');
                        }}
                        className="w-full px-4 py-3.5 rounded-2xl bg-transparent border transition-colors focus:outline-none focus:border-[var(--color-fg)] resize-none"
                        style={{ borderColor: 'var(--color-border)' }}
                        placeholder={t('form.messagePlaceholder')}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full flex items-center justify-center gap-2 px-5 py-4 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{
                          backgroundColor: 'var(--color-fg)',
                          color: 'var(--color-bg)',
                        }}
                      >
                        {isSubmitting ? (
                          t('form.sending')
                        ) : (
                          <>
                            {t('form.submit')}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-center gap-2 text-[12px] sm:text-sm text-muted text-center"
                          >
                            <AlertTriangle size={14} className="shrink-0" />
                            {t('toast.error')}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
