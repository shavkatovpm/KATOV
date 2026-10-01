import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { getServicesCatalog, servicePath } from '@/data/services';
import { localizedUrl, ogLocale } from '@/lib/urls';

// Entity page for E-E-A-T and AI answer engines: who KATOV is, stated plainly.
// Facts only from what the site already states (founded 2024, catalog prices,
// portfolio, brand rules) — no invented numbers.

const FEATURED = ['sayt-yaratish', 'seo-xizmati', 'aeo-xizmati', 'google-ads-xizmati', 'telegram-bot', 'crm-tizimi'];

const PORTFOLIO = [
  { name: 'Darslinker', url: 'https://darslinker.uz' },
  { name: 'Getolog', url: 'https://getolog.uz' },
  { name: 'StarsJoy', url: 'https://starsjoy.uz' },
  { name: 'Unumly', url: 'https://unumly.uz' },
  { name: 'Uzbektype', url: 'https://uzbektype.uz' },
  { name: 'Yuzinchi', url: 'https://yuzinchi.uz' },
];

const copy: Record<
  Locale,
  {
    title: string;
    description: string;
    breadcrumb: string;
    home: string;
    h1: string;
    lead: string;
    facts: { value: string; label: string }[];
    servicesTitle: string;
    allServices: string;
    principlesTitle: string;
    principles: { title: string; text: string }[];
    portfolioTitle: string;
    portfolioCta: string;
    ctaTitle: string;
    ctaButton: string;
  }
> = {
  uz: {
    title: 'Biz haqimizda — IT agentlik: sayt, SEO va AI SEO',
    description:
      'KATOV — 2024-yildan ishlayotgan O‘zbekistondagi IT agentlik: sayt yaratish, SEO, AI SEO, Google Ads, Telegram bot va CRM. Ochiq narxlar, 3 til, individual yondashuv.',
    breadcrumb: 'Biz haqimizda',
    home: 'Bosh sahifa',
    h1: 'KATOV haqida',
    lead:
      'KATOV — 2024-yilda tashkil etilgan O‘zbekistondagi IT xizmatlar agentligi. Biz biznes uchun sayt yaratamiz, uni Google va AI qidiruvda (ChatGPT, Perplexity) topiladigan qilamiz, Google Ads yuritamiz, Telegram bot, CRM va ERP tizimlarini ishlab chiqamiz. Saytlar o‘zbek, rus va ingliz tillarida bo‘lishi mumkin.',
    facts: [
      { value: '2024', label: 'tashkil etilgan yil' },
      { value: '10+', label: 'topshirilgan loyiha' },
      { value: '3', label: 'til: o‘zbek, rus, ingliz' },
      { value: '$270', label: 'dan boshlanadigan narx' },
    ],
    servicesTitle: 'Nima qilamiz',
    allServices: 'Barcha xizmatlar',
    principlesTitle: 'Qanday ishlaymiz',
    principles: [
      { title: 'Yolg‘on va’da yo‘q', text: 'Google’da 1-o‘rinni kafolatlamaymiz va bajara olmaydigan ishni va’da qilmaymiz.' },
      { title: 'Shablon emas', text: 'Har bir sayt biznesning o‘z vazifasi asosida quriladi.' },
      { title: 'Ochiq narx', text: 'Boshlang‘ich narxlar saytda yozilgan, yakuniy narx ish hajmi kelishilgach aniqlanadi.' },
      { title: 'Ishga tushirgandan keyin ham', text: 'Saytni topshirgach, yangilash va texnik yordam bo‘yicha birga ishlashni davom ettiramiz.' },
    ],
    portfolioTitle: 'Loyihalarimizdan',
    portfolioCta: 'Portfolioni ko‘rish',
    ctaTitle: 'Loyihangiz haqida gaplashamizmi?',
    ctaButton: 'Bog‘lanish',
  },
  ru: {
    title: 'О нас — IT-агентство: сайты, SEO и AI SEO',
    description:
      'KATOV — IT-агентство в Узбекистане с 2024 года: создание сайтов, SEO, AI SEO, Google Ads, Telegram-боты и CRM. Открытые цены, 3 языка, индивидуальный подход.',
    breadcrumb: 'О нас',
    home: 'Главная',
    h1: 'О KATOV',
    lead:
      'KATOV — IT-агентство в Узбекистане, основанное в 2024 году. Мы создаём сайты для бизнеса, делаем их заметными в Google и AI-поиске (ChatGPT, Perplexity), ведём Google Ads, разрабатываем Telegram-ботов, CRM и ERP. Сайты могут быть на узбекском, русском и английском.',
    facts: [
      { value: '2024', label: 'год основания' },
      { value: '10+', label: 'сданных проектов' },
      { value: '3', label: 'языка: узбекский, русский, английский' },
      { value: '$270', label: 'стартовая цена' },
    ],
    servicesTitle: 'Что мы делаем',
    allServices: 'Все услуги',
    principlesTitle: 'Как мы работаем',
    principles: [
      { title: 'Без ложных обещаний', text: 'Не гарантируем 1-е место в Google и не обещаем того, что не сможем выполнить.' },
      { title: 'Не шаблон', text: 'Каждый сайт строится под конкретную задачу бизнеса.' },
      { title: 'Открытые цены', text: 'Стартовые цены указаны на сайте, итоговая — после согласования объёма работ.' },
      { title: 'И после запуска', text: 'После сдачи сайта продолжаем работать вместе: обновления и техническая поддержка.' },
    ],
    portfolioTitle: 'Наши проекты',
    portfolioCta: 'Смотреть портфолио',
    ctaTitle: 'Обсудим ваш проект?',
    ctaButton: 'Связаться',
  },
  en: {
    title: 'About us — IT agency: websites, SEO and AI SEO',
    description:
      'KATOV is an IT agency in Uzbekistan working since 2024: website development, SEO, AI SEO, Google Ads, Telegram bots and CRM. Open pricing, 3 languages, custom approach.',
    breadcrumb: 'About',
    home: 'Home',
    h1: 'About KATOV',
    lead:
      'KATOV is an IT services agency in Uzbekistan, founded in 2024. We build websites for businesses, make them findable in Google and AI search (ChatGPT, Perplexity), run Google Ads, and develop Telegram bots, CRM and ERP systems. Sites can be in Uzbek, Russian and English.',
    facts: [
      { value: '2024', label: 'founded' },
      { value: '10+', label: 'projects delivered' },
      { value: '3', label: 'languages: Uzbek, Russian, English' },
      { value: '$270', label: 'starting price' },
    ],
    servicesTitle: 'What we do',
    allServices: 'All services',
    principlesTitle: 'How we work',
    principles: [
      { title: 'No false promises', text: 'We do not guarantee the #1 spot in Google or promise work we cannot deliver.' },
      { title: 'Not a template', text: 'Every site is built around the specific job it has to do for the business.' },
      { title: 'Open pricing', text: 'Starting prices are on the site; the final price is set once the scope is agreed.' },
      { title: 'After launch, too', text: 'Once the site is handed over we keep working together on updates and technical support.' },
    ],
    portfolioTitle: 'From our projects',
    portfolioCta: 'View portfolio',
    ctaTitle: 'Shall we talk about your project?',
    ctaButton: 'Get in touch',
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
  const canonical = localizedUrl(locale as Locale, '/about');
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localizedUrl(loc, '/about');
  languages['x-default'] = localizedUrl('uz', '/about');

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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as Locale;
  const c = copy[loc];
  const url = localizedUrl(loc, '/about');
  const catalog = getServicesCatalog().filter((item) => FEATURED.includes(item.slug));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: loc,
        isPartOf: { '@id': 'https://www.katov.uz/#website' },
        mainEntity: { '@id': 'https://www.katov.uz/#organization' },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-aeo-speakable]'] },
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

      <section className="section-padding pt-32 sm:pt-36">
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

          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {c.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl p-5" style={CARD}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold">{fact.value}</span>
                  <span className="block text-sm text-muted mt-1">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">{c.servicesTitle}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {catalog.map((item) => (
              <li key={item.slug}>
                <Link href={servicePath(item.slug)} className="group flex h-full flex-col rounded-2xl p-5 transition-colors" style={CARD}>
                  <span className="font-semibold group-hover:underline underline-offset-4">{item.card[loc].title}</span>
                  <span className="text-sm text-muted mt-2 leading-relaxed">{item.card[loc].description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4">
            {c.allServices} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">{c.principlesTitle}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.principles.map((p) => (
              <li key={p.title} className="rounded-2xl p-6" style={CARD}>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">{c.portfolioTitle}</h2>
          <ul className="flex flex-wrap gap-3">
            {PORTFOLIO.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                  style={CARD}
                >
                  {p.name} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
          <Link href="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4">
            {c.portfolioCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom max-w-5xl">
          <div
            className="rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{c.ctaTitle}</h2>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
            >
              {c.ctaButton} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
