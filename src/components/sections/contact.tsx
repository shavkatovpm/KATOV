'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Bot, Instagram, Send, Check, AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Custom Telegram icon (minimal style)
const TelegramIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error('Form submission error:', result.error);
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Phone,
      value: '+998 33 888 01 33',
      href: 'tel:+998338880133',
    },
    {
      icon: Bot,
      value: t('telegramBot'),
      href: 'https://t.me/katovuz_bot',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/katov.uz',
      label: 'Instagram',
    },
    {
      icon: TelegramIcon,
      href: 'https://t.me/katovuz',
      label: 'Telegram',
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            {t('title')}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto font-script text-muted">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <p className="text-muted text-base sm:text-lg mb-8">
              {t('description')}
            </p>

            <div className="space-y-3">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.value}
                  href={link.href}
                  target={link.href.startsWith('tel') ? undefined : '_blank'}
                  rel={link.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="footer-link flex items-center gap-3 py-2"
                >
                  <link.icon size={18} />
                  <span>{link.value}</span>
                </motion.a>
              ))}

              {/* Social links with labels */}
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="footer-link flex items-center gap-3 py-2"
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    // Auto-capitalize first letter
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setFormData({ ...formData, name: capitalized });
                  }}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity(t('form.validation.nameRequired'));
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-[#767676]"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t('form.phone')}
                </label>
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <span className="pl-4 py-3 bg-transparent" style={{ color: '#dddddd' }}>
                    +998
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    required
                    pattern="\d{2} \d{3} \d{2} \d{2}"
                    value={formData.phone}
                    onChange={(e) => {
                      // Only allow numbers and format as XX XXX XX XX
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
                        target.setCustomValidity(t('form.validation.phoneRequired'));
                      } else {
                        target.setCustomValidity(t('form.validation.phoneIncomplete'));
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity('');
                    }}
                    className="flex-1 px-4 py-3 bg-transparent transition-colors focus:outline-none"
                    placeholder="33 888 01 33"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onInvalid={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.setCustomValidity(t('form.validation.messageRequired'));
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.setCustomValidity('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-[#767676] resize-none"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={t('form.messagePlaceholder')}
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
                  t('form.sending')
                ) : (
                  <>
                    {t('form.submit')}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      {mounted && createPortal(
        <AnimatePresence>
          {(submitted || error) && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            >
              {submitted ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check size={18} className="text-white" />
                  </div>
                  <span className="font-medium">{t('toast.success')}</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertTriangle size={18} className="text-white" />
                  </div>
                  <span className="font-medium">{t('toast.error')}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
