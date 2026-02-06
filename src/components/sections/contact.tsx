'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Bot } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Open Telegram with pre-filled message
    const telegramMessage = encodeURIComponent(
      `Salom! Men ${formData.name}.\n\nTelefon: ${formData.phone}\n\nXabar: ${formData.message}`
    );
    window.open(`https://t.me/katov_uz?text=${telegramMessage}`, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const phoneLabel = t('phone');

  const contactLinks = [
    {
      icon: MessageCircle,
      label: 'Telegram',
      value: siteConfig.contact.telegram,
      href: siteConfig.social.telegram,
    },
    {
      icon: Bot,
      label: 'Telegram Bot',
      value: '@katov_bot',
      href: 'https://t.me/katov_bot',
    },
    {
      icon: Send,
      label: 'Instagram',
      value: '@katov.uz',
      href: siteConfig.social.instagram,
    },
    {
      icon: Phone,
      label: phoneLabel,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-section">
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

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('tel') ? undefined : '_blank'}
                  rel={link.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:opacity-70"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  >
                    <link.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted">{link.label}</p>
                    <p className="font-medium">{link.value}</p>
                  </div>
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-[#767676]"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-transparent transition-colors focus:outline-none focus:border-[#767676]"
                  style={{ border: '1px solid var(--color-border)' }}
                  placeholder={t('form.phonePlaceholder')}
                />
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
                ) : submitted ? (
                  t('form.sent')
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
    </section>
  );
}
