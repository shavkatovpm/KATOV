'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Send, AlertTriangle, Globe, Bot, Search, Database } from 'lucide-react';
import { Link } from '@/i18n/routing';

const serviceConfig: Record<string, { icon: typeof Globe; price: number; suffix: string }> = {
  website: { icon: Globe, price: 300, suffix: '' },
  telegram: { icon: Bot, price: 400, suffix: '' },
  seo: { icon: Search, price: 300, suffix: '/oy' },
  crm: { icon: Database, price: 1000, suffix: '' },
};

const validSlugs = ['website', 'crm', 'telegram', 'seo'];

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('servicePage');
  const ct = useTranslations('contact');

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!validSlugs.includes(slug)) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center py-20">
          <h1 className="text-3xl font-bold mb-4">404</h1>
          <Link href="/#services" className="btn-outline inline-block py-2 px-6 rounded-full">
            {t('back')}
          </Link>
        </div>
      </section>
    );
  }

  const config = serviceConfig[slug];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setError(false);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: '+998 ' + formData.phone,
          order: {
            type: t(`${slug}.heroTitle`),
            price: `${config.price}+${config.suffix}`,
          },
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
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

  return (
    <>
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-muted hover:opacity-80 transition-opacity mb-10"
            >
              <ArrowLeft size={16} />
              {t('back')}
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon size={32} className="opacity-70" />
              <span className="text-lg font-bold">${config.price}+{config.suffix}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t(`${slug}.heroTitle`)}
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-3xl leading-relaxed">
              {t(`${slug}.heroDescription`)}
            </p>
          </motion.div>

          {/* Detail Cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 className="text-base font-semibold mb-2">
                  {t(`${slug}.detail${i}Title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(`${slug}.detail${i}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Why Us + Process */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Why Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6">{t(`${slug}.whyTitle`)}</h2>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 opacity-60" />
                    <span className="text-sm leading-relaxed">{t(`${slug}.why${i}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6">{t('processTitle')}</h2>
              <ol className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: 'var(--color-fg)',
                        color: 'var(--color-bg)',
                      }}
                    >
                      {i}
                    </span>
                    <span className="text-sm leading-relaxed pt-1">{t(`${slug}.process${i}`)}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{t('orderTitle')}</h2>
            <p className="text-sm text-muted mb-6">{t('orderDescription')}</p>

            {/* Service badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
            >
              <Icon size={14} />
              {t(`${slug}.heroTitle`)} — ${config.price}+{config.suffix}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {ct('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setFormData({ ...formData, name: capitalized });
                  }}
                  onInvalid={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity(ct('form.validation.nameRequired'));
                  }}
                  onInput={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-muted"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={ct('form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {ct('form.phone')}
                </label>
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <span className="pl-4 py-3 bg-transparent" style={{ color: 'var(--color-fg)' }}>
                    +998
                  </span>
                  <input
                    type="tel"
                    id="phone"
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
                      if (target.value === '') {
                        target.setCustomValidity(ct('form.validation.phoneRequired'));
                      } else {
                        target.setCustomValidity(ct('form.validation.phoneIncomplete'));
                      }
                    }}
                    onInput={(e) => {
                      (e.target as HTMLInputElement).setCustomValidity('');
                    }}
                    className="flex-1 px-4 py-3 bg-transparent transition-colors focus:outline-none"
                    placeholder="33 888 01 33"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {ct('form.message')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onInvalid={(e) => {
                    (e.target as HTMLTextAreaElement).setCustomValidity(ct('form.validation.messageRequired'));
                  }}
                  onInput={(e) => {
                    (e.target as HTMLTextAreaElement).setCustomValidity('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-muted resize-none"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={ct('form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-full font-medium transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  color: 'var(--color-bg)',
                }}
              >
                {isSubmitting ? (
                  ct('form.sending')
                ) : (
                  <>
                    {ct('form.submit')}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Toast Notification */}
      {mounted && createPortal(
        <AnimatePresence>
          {(submitted || error) && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] sm:w-auto px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-fg)',
                border: '1px solid var(--color-border)',
              }}
            >
              {submitted ? (
                <>
                  <Check size={18} className="shrink-0 opacity-70" />
                  <span className="font-medium">{ct('toast.success')}</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="shrink-0 opacity-70" />
                  <span className="font-medium">{ct('toast.error')}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
