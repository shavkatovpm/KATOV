'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Check, AlertTriangle, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'katov_contact_prompt_seen';
const BUTTON_DELAY_MS = 15_000;
const AUTO_OPEN_DELAY_MS = 30_000;

export function ContactPrompt() {
  const t = useTranslations('contact');
  const [shown, setShown] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPulsing, setButtonPulsing] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => setMounted(true), []);

  // 15s timer + session dedup — show the floating button first
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const timer = setTimeout(() => setButtonVisible(true), BUTTON_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // If the button is ignored, auto-open the modal once at the 30s mark
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

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setShown(false);
  };

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
        sessionStorage.setItem(STORAGE_KEY, '1');
        setSubmitted(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setShown(false), 2500);
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
            aria-label={t('prompt.openButton')}
            title={t('prompt.openButton')}
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
            <MessageCircle size={22} className="relative" />
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
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              role="dialog"
              aria-modal="true"
              className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-md pointer-events-auto">
                <div
                  className="relative rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
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

                  <div className="px-5 sm:px-6 pt-14 pb-5 sm:pb-6">
                    {submitted ? (
                      <div className="flex flex-col items-center text-center py-6">
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                          style={{
                            backgroundColor: 'var(--color-fg)',
                            color: 'var(--color-bg)',
                          }}
                        >
                          <Check size={22} />
                        </div>
                        <p className="text-lg font-bold">{t('prompt.successTitle')}</p>
                        <p className="text-sm text-muted mt-1">{t('prompt.successText')}</p>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl sm:text-2xl font-bold pr-8">{t('prompt.title')}</h2>
                        <p className="text-[13px] sm:text-sm text-muted mt-1.5 mb-5 leading-relaxed">
                          {t('prompt.subtitle')}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3.5">
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
                            className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-muted"
                            style={{ border: '1px solid var(--color-border)' }}
                            placeholder={t('form.namePlaceholder')}
                          />

                          <div
                            className="flex items-center rounded-xl overflow-hidden"
                            style={{ border: '1px solid var(--color-border)' }}
                          >
                            <span className="pl-4 py-3 shrink-0" style={{ color: 'var(--color-fg)' }}>
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
                              className="flex-1 min-w-0 px-3 py-3 bg-transparent transition-colors focus:outline-none"
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
                            className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-muted resize-none"
                            style={{ border: '1px solid var(--color-border)' }}
                            placeholder={t('form.messagePlaceholder')}
                          />

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-semibold text-[13px] sm:text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
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
                                <Send size={15} />
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
