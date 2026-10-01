import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Bot, Instagram, Mail, Phone, Send } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { siteConfig } from '@/config/site';
import { localizedUrl, ogLocale } from '@/lib/urls';
import { Contact } from '@/components/sections/contact';

const copy: Record<
  Locale,
  {
    title: string;
    description: string;
    breadcrumb: string;
    home: string;
    h1: string;
    lead: string;
    labels: { phone: string; email: string; channel: string; bot: string; instagram: string };
    area: string;
  }
> = {
  uz: {
    title: 'Aloqa — sayt va SEO bo‘yicha bog‘lanish',
    description:
      'KATOV bilan bog‘lanish: telefon +998 33 888 01 33, Telegram, email. Sayt yaratish, SEO, AI SEO va Google Ads bo‘yicha ariza qoldiring — o‘zimiz bog‘lanamiz.',
    breadcrumb: 'Aloqa',
    home: 'Bosh sahifa',
    h1: 'KATOV bilan bog‘lanish',
    lead:
      'KATOV bilan telefon, Telegram yoki email orqali bog‘lanishingiz mumkin. Pastdagi formada ariza qoldirsangiz, loyihangiz bo‘yicha o‘zimiz bog‘lanamiz. Butun O‘zbekiston bo‘ylab onlayn ishlaymiz.',
    labels: { phone: 'Telefon', email: 'Email', channel: 'Telegram kanal', bot: 'Telegram bot (yordam)', instagram: 'Instagram' },
    area: 'Butun O‘zbekiston, onlayn',
  },
  ru: {
    title: 'Контакты — связаться по сайту и SEO',
    description:
      'Связаться с KATOV: телефон +998 33 888 01 33, Telegram, email. Оставьте заявку на создание сайта, SEO, AI SEO или Google Ads — мы свяжемся с вами.',
    breadcrumb: 'Контакты',
    home: 'Главная',
    h1: 'Связаться с KATOV',
    lead:
      'С KATOV можно связаться по телефону, в Telegram или по email. Оставьте заявку в форме ниже — мы сами свяжемся с вами по вашему проекту. Работаем онлайн по всему Узбекистану.',
    labels: { phone: 'Телефон', email: 'Email', channel: 'Telegram-канал', bot: 'Telegram-бот (поддержка)', instagram: 'Instagram' },
    area: 'Весь Узбекистан, онлайн',
  },
  en: {
    title: 'Contact — get in touch about websites and SEO',
    description:
      'Contact KATOV: phone +998 33 888 01 33, Telegram, email. Leave a request for website development, SEO, AI SEO or Google Ads — we will get back to you.',
    breadcrumb: 'Contact',
    home: 'Home',
    h1: 'Contact KATOV',
    lead:
      'You can reach KATOV by phone, Telegram or email. Leave a request in the form below and we will contact you about your project. We work online across Uzbekistan.',
    labels: { phone: 'Phone', email: 'Email', channel: 'Telegram channel', bot: 'Telegram bot (support)', instagram: 'Instagram' },
    area: 'All of Uzbekistan, online',
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) return {};
  const c = copy[locale as Locale];
  const canonical = localizedUrl(locale as Locale, '/contact');
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localizedUrl(loc, '/contact');
  languages['x-default'] = localizedUrl('uz', '/contact');

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical, languages },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonical,
      siteName: 'KATOV',
      locale: ogLocale(locale as Locale),
      type: 'website',
      images: [{ url: 'https://www.katov.uz/og-image.png', width: 1200, height: 1200, alt: 'KATOV' }],
    },
  };
}

const CARD = { backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' };

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as Locale;
  const c = copy[loc];
  const url = localizedUrl(loc, '/contact');
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

  const channels = [
    { icon: Phone, label: c.labels.phone, value: siteConfig.contact.phone, href: phoneHref },
    { icon: Mail, label: c.labels.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Send, label: c.labels.channel, value: '@katovuz', href: siteConfig.social.telegram },
    { icon: Bot, label: c.labels.bot, value: '@katovuz_bot', href: siteConfig.social.support },
    { icon: Instagram, label: c.labels.instagram, value: '@katov.uz', href: siteConfig.social.instagram },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: loc,
        isPartOf: { '@id': 'https://www.katov.uz/#website' },
        about: { '@id': 'https://www.katov.uz/#organization' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.home, item: localizedUrl(loc) },
          { '@type': 'ListItem', position: 2, name: c.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="section-padding pt-32 sm:pt-36 pb-0">
        <div className="container-custom max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted mb-6">
            <Link href="/" className="hover:underline">{c.home}</Link>
            <span className="mx-2">/</span>
            <span>{c.breadcrumb}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">{c.h1}</h1>
          <p data-aeo-speakable className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {c.lead}
          </p>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-2xl p-5 transition-opacity hover:opacity-80"
                  style={CARD}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                  >
                    <Icon size={19} />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{c.area}</p>
        </div>
      </section>

      <Contact />
    </>
  );
}
