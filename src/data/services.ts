import type { Locale } from '@/i18n/config';

export type IconName =
  | 'Rocket'
  | 'Building2'
  | 'ShoppingCart'
  | 'Bot'
  | 'Utensils'
  | 'RefreshCw'
  | 'Database'
  | 'Search'
  | 'Briefcase'
  | 'User'
  | 'LayoutDashboard'
  | 'Server'
  | 'Palette'
  | 'Zap'
  | 'Target'
  | 'CreditCard'
  | 'Smartphone'
  | 'Globe'
  | 'Code2'
  | 'Sparkles'
  | 'BarChart3'
  | 'ShieldCheck'
  | 'Mail'
  | 'Layers';

export interface ServiceBenefit {
  icon: IconName;
  title: string;
  description: string;
}

export interface ServiceForWho {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceLocalizedContent {
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  benefits: ServiceBenefit[];
  forWhoTitle: string;
  forWho: ServiceForWho[];
  deliverablesTitle: string;
  deliverables: string[];
  processTitle: string;
  processTotalDuration: string;
  process: ServiceProcessStep[];
  whyUsTitle: string;
  whyUs: string[];
  portfolioTitle: string;
  faqTitle: string;
  faq: ServiceFAQItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  breadcrumbServices: string;
  priceLabel: string;
  priceSuffix?: string;
}

export interface ServiceData {
  slug: string;
  icon: IconName;
  basePrice: number;
  priceSuffix: string;
  demand: 1 | 2 | 3 | 4 | 5;
  content: Record<Locale, ServiceLocalizedContent>;
}

export const servicesData: Record<string, ServiceData> = {
  'landing-page': {
    slug: 'landing-page',
    icon: 'Rocket',
    basePrice: 270,
    priceSuffix: '',
    demand: 5,
    content: {
      uz: {
        title: 'Landing Page Yaratish — Narxi va Misollar',
        metaDescription:
          'Konversiyaga yo\'naltirilgan landing page yaratish — Next.js 16, mobile-first, Lighthouse 95+. 5–10 kun, $270 dan. Click/Payme integratsiya tayyor.',
        h1: 'Landing Page Yaratish: 5–10 Kunda Konversiyali Sayt',
        heroSubtitle:
          'Sotuvchi, tezkor va SEO-mos landing\'lar. Next.js 16 asosida, mobil va dark mode tayyor.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Tezkor',
            description: 'Lighthouse 95+, FCP < 1.5s — har 1 soniya tezlik = 7% konversiya o\'sishi.',
          },
          {
            icon: 'Target',
            title: 'Konversiyali',
            description: 'Tahlil asosidagi UX, A/B test tayyor, lead form va aniq CTA.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme',
            description: 'O\'zbekiston to\'lov tizimlari integratsiyasi tayyor keladi.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Startaplar',
            description: 'Birinchi mahsulot yoki xizmatni sotish, MVP test va birinchi lead\'larni yig\'ish.',
          },
          {
            title: 'B2B xizmat ko\'rsatuvchilar',
            description: 'Konsultatsiya, audit yoki murakkab xizmatlar uchun lead capture sahifasi.',
          },
          {
            title: 'Kurs va mentorlar',
            description: 'Onlayn kurs, marafon yoki shaxsiy mentorlikka ro\'yxatga olish funnel.',
          },
          {
            title: 'Brand va mahsulot launch',
            description: 'Yangi mahsulot, kitob, event yoki kampaniya uchun fokuslangan sahifa.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Maxsus UI/UX dizayn (Figma\'da, template emas)',
          'Unikal kod — Next.js 16 + React 19',
          'Mobile-first responsive (320px–4K)',
          'Lighthouse 95+ (Performance / SEO / Accessibility)',
          'Click va Payme to\'lov integratsiyasi (kerak bo\'lsa)',
          'Lead form + email/Telegram bildirishnoma',
          'Google Analytics 4 + Microsoft Clarity',
          'Texnik SEO bazasi (meta, schema, sitemap, robots)',
          'Vercel deploy + domen ulash',
          'Ishga tushgandan keyin 1 oy bepul support',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '5–10 ish kuni',
        process: [
          {
            step: 1,
            title: 'Brief va strategiya',
            description: 'Bizneing, target audience va asosiy maqsadlarni aniqlaymiz. Raqobatchi tahlili.',
            duration: '1 kun',
          },
          {
            step: 2,
            title: 'UI/UX dizayn',
            description: 'Figma\'da prototip — ikkala revizyon kiradi. Siz tasdiqlaganidan keyin development.',
            duration: '2–3 kun',
          },
          {
            step: 3,
            title: 'Development',
            description: 'Kod, animatsiya, integratsiya (to\'lov, analytics, form). Test environment\'da ko\'rasiz.',
            duration: '2–4 kun',
          },
          {
            step: 4,
            title: 'Launch va polish',
            description: 'Domen ulash, Lighthouse audit, SEO tekshiruvi, ishga tushirish va qabul.',
            duration: '1 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Lighthouse 95+ ko\'rsatkichi kafolat — har bir landing\'imizda',
          'Zamonaviy stack: Next.js 16, React 19, Tailwind 4 (template emas)',
          '3 til (uz/ru/en) tayyor — agar kerak bo\'lsa, narx o\'zgarmaydi',
          'Microsoft Clarity bilan foydalanuvchi xulqi monitoring',
          '10+ muvaffaqiyatli loyiha (Darslinker, Getolog, Uzbektype va boshqalar)',
          'Yopiq narx — $270 dan, qo\'shimcha to\'lov yo\'q',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Landing page yaratish narxi qancha turadi?',
            answer:
              'KATOV\'da landing page narxi $270 dan boshlanadi. Aniq narx funksiyalar va integratsiyalar soniga qarab belgilanadi: oddiy lead-capture landing $270–$400, to\'lov integratsiyasi bilan $400–$700, murakkab funnel va animatsiyalar bilan $700–$1200. Brief jarayonida aniq narx beriladi va keyin o\'zgarmaydi.',
          },
          {
            question: 'Landing page necha kunda tayyor bo\'ladi?',
            answer:
              'Standart muddat — 5–10 ish kuni. Bunga brief (1 kun), UI/UX dizayn (2–3 kun), development va integratsiya (2–4 kun), launch (1 kun) kiradi. Tezroq variant: oddiy landing 3–5 kunda ham yetkazib beriladi.',
          },
          {
            question: 'Domen va hosting alohida to\'lanadimi?',
            answer:
              'Hosting (Vercel) bepul plan\'da KATOV tomonidan sozlanadi va ulanadi. Domen (.uz, .com va h.k.) sizning nomingizga ro\'yxat qilinadi — bu yillik to\'lov ($10–$30/yil .uz uchun), to\'g\'ridan-to\'g\'ri ro\'yxatchilarga to\'lanadi. Domen sizning egaligingizda qoladi.',
          },
          {
            question: 'Click va Payme integratsiyasi tayyor keladimi?',
            answer:
              'Ha, agar kerak bo\'lsa. Click va Payme merchant API\'lari integratsiya qilinadi: mijoz sayt orqali to\'lov qiladi, sizga avtomatik tasdiq keladi. Buning uchun sizning Click va Payme merchant akkauntingiz bo\'lishi kerak (yoki KATOV qo\'lga olishida yordam beradi).',
          },
          {
            question: 'Keyin o\'zim tahrir qila olamanmi (kontent yangilash)?',
            answer:
              'Ha. Landing\'da admin panel (sodda CMS) qo\'shilishi mumkin — matnlar, rasmlar, narxlarni o\'zingiz tahrirlaysiz, kod bilmasdan. Bu opsion: agar kontent kam o\'zgaradigan bo\'lsa, admin panel yo\'q (narxda arzonroq), tahrir kerak bo\'lganda KATOV o\'zi qiladi (bepul support davrida).',
          },
          {
            question: 'Mobil va dark mode tayyor keladimi?',
            answer:
              'Ha, har bir landing 320px (mobil) dan 4K\'gacha to\'liq responsiv. Dark va light mode toggle\'i ikkalasi ham tayyor (siz xohlasangiz, faqat bittasini qoldirish ham mumkin). Lighthouse mobile va desktop ikkalasida 95+ kafolatlanadi.',
          },
        ],
        ctaTitle: 'Landing\'ingiz uchun bepul brief',
        ctaSubtitle:
          'Ma\'lumotlarni qoldiring, 1 ish kuni ichida bog\'lanamiz. Brief bepul, hech qanday majburiyat yo\'q.',
        ctaPrimary: 'Loyihani boshlash',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Создание Landing Page — Цена и Сроки',
        metaDescription:
          'Создание landing page с фокусом на конверсию — Next.js 16, mobile-first, Lighthouse 95+. 5–10 дней, от $270. Интеграция Click и Payme готова.',
        h1: 'Создание Landing Page: Конверсионный Сайт за 5–10 Дней',
        heroSubtitle:
          'Продающие, быстрые и SEO-оптимизированные landing на Next.js 16. Мобильная и тёмная темы готовы.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Быстрый',
            description: 'Lighthouse 95+, FCP < 1.5с — каждая секунда скорости = +7% конверсии.',
          },
          {
            icon: 'Target',
            title: 'Конверсионный',
            description: 'UX на основе аналитики, готовность к A/B тестам, lead-форма и чёткий CTA.',
          },
          {
            icon: 'CreditCard',
            title: 'Click и Payme',
            description: 'Интеграция платёжных систем Узбекистана готова из коробки.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Стартапы',
            description: 'Продажа первого продукта или услуги, MVP-тест и сбор первых лидов.',
          },
          {
            title: 'B2B сервисы',
            description: 'Lead capture для консультаций, аудитов и сложных услуг.',
          },
          {
            title: 'Курсы и менторы',
            description: 'Воронка регистрации на онлайн-курс, марафон или личное менторство.',
          },
          {
            title: 'Запуск бренда или продукта',
            description: 'Фокус-страница для нового продукта, книги, события или кампании.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Индивидуальный UI/UX дизайн (Figma, не шаблон)',
          'Уникальный код — Next.js 16 + React 19',
          'Mobile-first адаптив (320px–4K)',
          'Lighthouse 95+ (Performance / SEO / Accessibility)',
          'Интеграция Click и Payme (при необходимости)',
          'Lead-форма + email/Telegram уведомления',
          'Google Analytics 4 + Microsoft Clarity',
          'Техническая SEO-база (meta, schema, sitemap, robots)',
          'Деплой на Vercel + подключение домена',
          'Бесплатная поддержка 1 месяц после запуска',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '5–10 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Бриф и стратегия',
            description: 'Определяем бизнес, целевую аудиторию и ключевые цели. Анализ конкурентов.',
            duration: '1 день',
          },
          {
            step: 2,
            title: 'UI/UX дизайн',
            description: 'Прототип в Figma — две правки включены. После вашего согласования — разработка.',
            duration: '2–3 дня',
          },
          {
            step: 3,
            title: 'Разработка',
            description: 'Код, анимации, интеграции (оплаты, аналитика, формы). Покажем на тестовом окружении.',
            duration: '2–4 дня',
          },
          {
            step: 4,
            title: 'Запуск и полировка',
            description: 'Подключение домена, Lighthouse-аудит, SEO-проверка, запуск и приёмка.',
            duration: '1 день',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Гарантия Lighthouse 95+ — на каждом нашем landing',
          'Современный стек: Next.js 16, React 19, Tailwind 4 (не шаблоны)',
          '3 языка (uz/ru/en) готовы — при необходимости, без доп. стоимости',
          'Поведенческая аналитика с Microsoft Clarity',
          '10+ успешных проектов (Darslinker, Getolog, Uzbektype и др.)',
          'Фиксированная цена — от $270, без скрытых доплат',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит создание landing page?',
            answer:
              'В KATOV landing page начинается от $270. Точная цена зависит от функций и интеграций: простой lead-capture $270–$400, с платёжной интеграцией $400–$700, со сложной воронкой и анимациями $700–$1200. Точная цена фиксируется на этапе брифа и не меняется.',
          },
          {
            question: 'За сколько дней готов landing page?',
            answer:
              'Стандартный срок — 5–10 рабочих дней: бриф (1 день), UI/UX (2–3 дня), разработка (2–4 дня), запуск (1 день). Ускоренный вариант: простой landing — за 3–5 дней.',
          },
          {
            question: 'Домен и хостинг оплачиваются отдельно?',
            answer:
              'Хостинг (Vercel) настраивает и подключает KATOV на бесплатном плане. Домен (.uz, .com и др.) регистрируется на ваше имя — это годовая оплата ($10–$30/год для .uz), напрямую регистраторам. Домен остаётся в вашем владении.',
          },
          {
            question: 'Интеграция Click и Payme включена?',
            answer:
              'Да, если нужно. Интегрируем merchant API Click и Payme: клиент оплачивает через сайт, вам приходит подтверждение. Нужны ваши merchant-аккаунты Click и Payme (или KATOV поможет их оформить).',
          },
          {
            question: 'Смогу ли я сам редактировать контент позже?',
            answer:
              'Да. По желанию добавляем простую CMS (admin panel) — вы сами правите тексты, картинки и цены без кода. Это опция: если контент редко меняется, можно без admin panel (дешевле), а правки делает KATOV в рамках бесплатной поддержки.',
          },
          {
            question: 'Готова ли мобильная и тёмная тема?',
            answer:
              'Да, каждый landing адаптивен от 320px (мобайл) до 4K. Светлая и тёмная темы переключаются (можно оставить только одну). Lighthouse 95+ гарантирован и на мобильных, и на десктопе.',
          },
        ],
        ctaTitle: 'Бесплатный бриф для вашего landing',
        ctaSubtitle:
          'Оставьте данные — свяжемся в течение 1 рабочего дня. Бриф бесплатный, без обязательств.',
        ctaPrimary: 'Начать проект',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Landing Page Development — Price & Timeline',
        metaDescription:
          'Conversion-focused landing page development — Next.js 16, mobile-first, Lighthouse 95+. 5–10 days, from $270. Click & Payme integration ready.',
        h1: 'Landing Page Development: Conversion-Ready Site in 5–10 Days',
        heroSubtitle:
          'High-performing, fast, SEO-optimized landings on Next.js 16. Mobile and dark mode out of the box.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Fast',
            description: 'Lighthouse 95+, FCP < 1.5s — every second of load time = +7% conversion.',
          },
          {
            icon: 'Target',
            title: 'Conversion-focused',
            description: 'Analytics-driven UX, A/B-test ready, lead form and clear CTA.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme',
            description: 'Uzbekistan payment systems integration ready out of the box.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Startups',
            description: 'Selling your first product or service, MVP testing, and capturing initial leads.',
          },
          {
            title: 'B2B services',
            description: 'Lead capture for consulting, audits, and complex service offerings.',
          },
          {
            title: 'Courses & mentors',
            description: 'Registration funnel for online courses, marathons, or personal mentoring.',
          },
          {
            title: 'Brand & product launches',
            description: 'Focused page for a new product, book, event, or campaign.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Custom UI/UX design (in Figma, not a template)',
          'Unique code — Next.js 16 + React 19',
          'Mobile-first responsive (320px–4K)',
          'Lighthouse 95+ (Performance / SEO / Accessibility)',
          'Click & Payme payment integration (if needed)',
          'Lead form + email/Telegram notifications',
          'Google Analytics 4 + Microsoft Clarity',
          'Technical SEO foundation (meta, schema, sitemap, robots)',
          'Vercel deploy + domain connection',
          '1 month free support after launch',
        ],
        processTitle: 'Process',
        processTotalDuration: '5–10 business days',
        process: [
          {
            step: 1,
            title: 'Brief & strategy',
            description: 'We identify your business, target audience and key goals. Competitor research.',
            duration: '1 day',
          },
          {
            step: 2,
            title: 'UI/UX design',
            description: 'Figma prototype with two revisions included. Development starts after your approval.',
            duration: '2–3 days',
          },
          {
            step: 3,
            title: 'Development',
            description: 'Code, animations, integrations (payments, analytics, forms). Preview on staging.',
            duration: '2–4 days',
          },
          {
            step: 4,
            title: 'Launch & polish',
            description: 'Domain connection, Lighthouse audit, SEO check, go-live and handover.',
            duration: '1 day',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Lighthouse 95+ guarantee — on every landing we ship',
          'Modern stack: Next.js 16, React 19, Tailwind 4 (no templates)',
          '3 languages (uz/ru/en) ready — no extra cost if needed',
          'User behavior monitoring with Microsoft Clarity',
          '10+ successful projects (Darslinker, Getolog, Uzbektype, etc.)',
          'Fixed price — from $270, no hidden fees',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much does a landing page cost?',
            answer:
              'At KATOV, landing pages start from $270. The exact price depends on features and integrations: a simple lead-capture landing $270–$400, with payment integration $400–$700, with complex funnel and animations $700–$1200. The final price is locked during the brief and never changes.',
          },
          {
            question: 'How long does it take to build a landing page?',
            answer:
              'Standard timeline is 5–10 business days: brief (1 day), UI/UX design (2–3 days), development (2–4 days), launch (1 day). Express option: simple landing in 3–5 days.',
          },
          {
            question: 'Are domain and hosting charged separately?',
            answer:
              'Hosting (Vercel) is set up and connected by KATOV on the free plan. Domain (.uz, .com, etc.) is registered in your name — this is a yearly fee ($10–$30/year for .uz) paid directly to registrars. The domain stays under your ownership.',
          },
          {
            question: 'Are Click and Payme integrations included?',
            answer:
              'Yes, if needed. We integrate Click and Payme merchant APIs: customers pay via the site, you receive automatic confirmation. You\'ll need your own merchant accounts (or KATOV can help you set them up).',
          },
          {
            question: 'Can I edit the content myself later?',
            answer:
              'Yes. We can optionally add a simple CMS (admin panel) — edit text, images, and prices without code. It\'s optional: if content rarely changes, you can skip the admin panel (cheaper), and KATOV will make updates during the free support period.',
          },
          {
            question: 'Are mobile and dark mode included?',
            answer:
              'Yes, every landing is fully responsive from 320px (mobile) to 4K. Light and dark mode toggle is built in (you can keep just one if preferred). Lighthouse 95+ is guaranteed on both mobile and desktop.',
          },
        ],
        ctaTitle: 'Free brief for your landing page',
        ctaSubtitle:
          'Leave your details — we\'ll get back within 1 business day. The brief is free, no commitment.',
        ctaPrimary: 'Start project',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
};

export function getServiceData(slug: string, locale: Locale): { service: ServiceData; content: ServiceLocalizedContent } | null {
  const service = servicesData[slug];
  if (!service) return null;
  return { service, content: service.content[locale] };
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}

export interface ServiceCatalogCard {
  title: string;
  description: string;
}

export interface ServiceCatalogItem {
  slug: string;
  icon: IconName;
  basePrice: number;
  priceSuffix: string;
  demand: 1 | 2 | 3 | 4 | 5;
  card: Record<Locale, ServiceCatalogCard>;
}

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    slug: 'landing-page',
    icon: 'Rocket',
    basePrice: 270,
    priceSuffix: '',
    demand: 5,
    card: {
      uz: {
        title: 'Landing Page',
        description: 'Konversiyaga yo\'naltirilgan bir sahifali sayt — Next.js, Lighthouse 95+.',
      },
      ru: {
        title: 'Landing Page',
        description: 'Одностраничный сайт с фокусом на конверсию — Next.js, Lighthouse 95+.',
      },
      en: {
        title: 'Landing Page',
        description: 'Conversion-focused one-page site — Next.js, Lighthouse 95+.',
      },
    },
  },
  {
    slug: 'korporativ-sayt',
    icon: 'Building2',
    basePrice: 870,
    priceSuffix: '',
    demand: 5,
    card: {
      uz: {
        title: 'Korporativ sayt',
        description: 'Kompaniyangiz uchun professional veb-sayt — xizmatlar, portfolio, blog.',
      },
      ru: {
        title: 'Корпоративный сайт',
        description: 'Профессиональный сайт для компании — услуги, портфолио, блог.',
      },
      en: {
        title: 'Corporate Website',
        description: 'Professional website for your company — services, portfolio, blog.',
      },
    },
  },
  {
    slug: 'internet-dokon',
    icon: 'ShoppingCart',
    basePrice: 1700,
    priceSuffix: '',
    demand: 5,
    card: {
      uz: {
        title: 'Internet do\'kon',
        description: 'E-commerce platforma — Click, Payme, mahsulot katalogi va admin panel.',
      },
      ru: {
        title: 'Интернет-магазин',
        description: 'E-commerce платформа — Click, Payme, каталог товаров и админка.',
      },
      en: {
        title: 'E-commerce',
        description: 'E-commerce platform — Click, Payme, product catalog, admin panel.',
      },
    },
  },
  {
    slug: 'telegram-bot',
    icon: 'Bot',
    basePrice: 400,
    priceSuffix: '',
    demand: 5,
    card: {
      uz: {
        title: 'Telegram bot',
        description: 'Biznes uchun avtomatlashtirilgan bot — buyurtma, to\'lov, mijoz xizmati.',
      },
      ru: {
        title: 'Telegram-бот',
        description: 'Автоматизированный бот для бизнеса — заказы, оплата, поддержка.',
      },
      en: {
        title: 'Telegram Bot',
        description: 'Automated bot for business — orders, payments, customer support.',
      },
    },
  },
  {
    slug: 'restoran-sayti',
    icon: 'Utensils',
    basePrice: 600,
    priceSuffix: '',
    demand: 4,
    card: {
      uz: {
        title: 'Restoran sayti',
        description: 'Menu, QR-kod, onlayn buyurtma va stol bron qilish tizimi.',
      },
      ru: {
        title: 'Сайт ресторана',
        description: 'Меню, QR-код, онлайн-заказ и бронирование столиков.',
      },
      en: {
        title: 'Restaurant Website',
        description: 'Menu, QR code, online ordering and table reservations.',
      },
    },
  },
  {
    slug: 'sayt-redesign',
    icon: 'RefreshCw',
    basePrice: 500,
    priceSuffix: '',
    demand: 4,
    card: {
      uz: {
        title: 'Sayt redesign',
        description: 'Eski saytni zamonaviy ko\'rinishga — tezlik, mobile, SEO yangilanadi.',
      },
      ru: {
        title: 'Редизайн сайта',
        description: 'Современный вид старому сайту — скорость, mobile, SEO обновляются.',
      },
      en: {
        title: 'Website Redesign',
        description: 'Modernize legacy sites — speed, mobile, and SEO all refreshed.',
      },
    },
  },
  {
    slug: 'crm-tizimi',
    icon: 'Database',
    basePrice: 1000,
    priceSuffix: '',
    demand: 4,
    card: {
      uz: {
        title: 'CRM tizimi',
        description: 'Mijoz va sotuv boshqaruvi — bizneuingizga moslashtirilgan custom CRM.',
      },
      ru: {
        title: 'CRM-система',
        description: 'Управление клиентами и продажами — custom CRM под ваш бизнес.',
      },
      en: {
        title: 'CRM System',
        description: 'Customer and sales management — custom CRM tailored to your business.',
      },
    },
  },
  {
    slug: 'seo-xizmati',
    icon: 'Search',
    basePrice: 300,
    priceSuffix: '/oy',
    demand: 4,
    card: {
      uz: {
        title: 'SEO xizmati',
        description: 'Organik trafikni oshirish — texnik audit, kontent va kalit so\'zlar.',
      },
      ru: {
        title: 'SEO услуги',
        description: 'Рост органического трафика — техаудит, контент и ключевые слова.',
      },
      en: {
        title: 'SEO Services',
        description: 'Organic traffic growth — technical audit, content, and keyword strategy.',
      },
    },
  },
  {
    slug: 'erp-tizimi',
    icon: 'Layers',
    basePrice: 2500,
    priceSuffix: '',
    demand: 3,
    card: {
      uz: {
        title: 'ERP tizimi',
        description: 'Korxona avtomatlashtirish — moliya, ombor, HR bir tizimda.',
      },
      ru: {
        title: 'ERP-система',
        description: 'Автоматизация предприятия — финансы, склад, HR в одной системе.',
      },
      en: {
        title: 'ERP System',
        description: 'Enterprise automation — finance, inventory, HR in one platform.',
      },
    },
  },
  {
    slug: 'portfolio-sayt',
    icon: 'User',
    basePrice: 270,
    priceSuffix: '',
    demand: 3,
    card: {
      uz: {
        title: 'Portfolio sayt',
        description: 'Shaxsiy brending — mutaxassis, freelancer va kreator uchun.',
      },
      ru: {
        title: 'Портфолио-сайт',
        description: 'Личный бренд — для специалистов, фрилансеров и креаторов.',
      },
      en: {
        title: 'Portfolio Site',
        description: 'Personal brand — for specialists, freelancers, and creators.',
      },
    },
  },
  {
    slug: 'admin-panel',
    icon: 'LayoutDashboard',
    basePrice: 800,
    priceSuffix: '',
    demand: 3,
    card: {
      uz: {
        title: 'Admin panel',
        description: 'Custom dashboard — ma\'lumot, hisobot va boshqaruv bir joyda.',
      },
      ru: {
        title: 'Админ-панель',
        description: 'Custom dashboard — данные, отчёты и управление в одном месте.',
      },
      en: {
        title: 'Admin Panel',
        description: 'Custom dashboard — data, reports, and management in one place.',
      },
    },
  },
  {
    slug: 'hosting-support',
    icon: 'Server',
    basePrice: 50,
    priceSuffix: '/oy',
    demand: 3,
    card: {
      uz: {
        title: 'Hosting va support',
        description: 'KATOV loyihalari uchun oylik xizmat — deploy, monitoring, yangilanish.',
      },
      ru: {
        title: 'Хостинг и поддержка',
        description: 'Ежемесячный сервис для проектов KATOV — деплой, мониторинг, обновления.',
      },
      en: {
        title: 'Hosting & Support',
        description: 'Monthly service for KATOV-built projects — deploy, monitoring, updates.',
      },
    },
  },
  {
    slug: 'ui-ux-dizayn',
    icon: 'Palette',
    basePrice: 400,
    priceSuffix: '',
    demand: 3,
    card: {
      uz: {
        title: 'UI/UX dizayn',
        description: 'Figma\'da sayt va ilova dizayni — kodsiz, faqat vizual yechim.',
      },
      ru: {
        title: 'UI/UX дизайн',
        description: 'Дизайн сайтов и приложений в Figma — без кода, только визуал.',
      },
      en: {
        title: 'UI/UX Design',
        description: 'Web and app design in Figma — design-only, no code.',
      },
    },
  },
];

export interface ServicesIndexCopy {
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  comingSoonBadge: string;
  fromLabel: string;
  cardCta: string;
}

export const servicesIndexCopy: Record<Locale, ServicesIndexCopy> = {
  uz: {
    title: 'Xizmatlar — Web, Bot, CRM, ERP va Boshqalar',
    metaDescription:
      'KATOV xizmatlari: landing page, korporativ sayt, internet do\'kon, Telegram bot, CRM, ERP, SEO va boshqalar. $50 dan, 3 til (uz/ru/en).',
    h1: 'KATOV xizmatlari',
    subtitle:
      'Veb-sayt, bot, CRM va boshqa raqamli yechimlar — bitta jamoadan, real narxlar va shaffof jarayonda.',
    comingSoonBadge: 'Tez orada',
    fromLabel: 'dan',
    cardCta: 'Batafsil',
  },
  ru: {
    title: 'Услуги — Сайты, Боты, CRM, ERP и Другое',
    metaDescription:
      'Услуги KATOV: landing page, корпоративные сайты, интернет-магазины, Telegram-боты, CRM, ERP, SEO и др. От $50, 3 языка (uz/ru/en).',
    h1: 'Услуги KATOV',
    subtitle:
      'Сайты, боты, CRM и другие digital-решения — одной командой, с реальными ценами и прозрачным процессом.',
    comingSoonBadge: 'Скоро',
    fromLabel: 'от',
    cardCta: 'Подробнее',
  },
  en: {
    title: 'Services — Websites, Bots, CRM, ERP & More',
    metaDescription:
      'KATOV services: landing pages, corporate websites, e-commerce, Telegram bots, CRM, ERP, SEO and more. From $50, 3 languages (uz/ru/en).',
    h1: 'KATOV services',
    subtitle:
      'Websites, bots, CRM, and other digital solutions — from one team, with real pricing and a transparent process.',
    comingSoonBadge: 'Coming soon',
    fromLabel: 'from',
    cardCta: 'Details',
  },
};

export function getServicesCatalog(): Array<ServiceCatalogItem & { available: boolean }> {
  return servicesCatalog.map((item) => ({
    ...item,
    available: !!servicesData[item.slug],
  }));
}
