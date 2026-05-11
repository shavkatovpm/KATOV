'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Send, Check, AlertTriangle } from 'lucide-react';
import { iconMap } from './icon-map';
import type { IconName, ServiceLocalizedContent } from '@/data/services';

interface ServiceContactFormProps {
  serviceTitle: string;
  serviceIcon: IconName;
  basePrice: number;
  priceSuffix: string;
  content: ServiceLocalizedContent;
}

export function ServiceContactForm({
  serviceTitle,
  serviceIcon,
  basePrice,
  priceSuffix,
  content,
}: ServiceContactFormProps) {
  const ct = useTranslations('contact');
  const ServiceIcon = iconMap[serviceIcon];

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
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
          order: {
            type: serviceTitle,
            price: `$${basePrice}+${priceSuffix}`,
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
    <section id="contact" className="section-padding">
      <div className="container-custom max-w-2xl">
        <div
          className="rounded-2xl p-6 sm:p-10"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{content.ctaTitle}</h2>
          <p className="text-sm text-muted mb-6">{content.ctaSubtitle}</p>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              backgroundColor: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            <ServiceIcon size={14} />
            {serviceTitle} — ${basePrice}+{priceSuffix}
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
                  (e.target as HTMLInputElement).setCustomValidity(
                    ct('form.validation.nameRequired')
                  );
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
                  (e.target as HTMLTextAreaElement).setCustomValidity(
                    ct('form.validation.messageRequired')
                  );
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
        </div>
      </div>

      {mounted &&
        createPortal(
          submitted || error ? (
            <div
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
            </div>
          ) : null,
          document.body
        )}
    </section>
  );
}
