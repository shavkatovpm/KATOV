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
          'Sotuvchi landing page yaratish — zamonaviy texnologiya, mobilga mos. 5–10 kun, $270 dan. Click va Payme to\'lov integratsiyasi.',
        h1: 'Landing Page Yaratish: 5–10 Kunda Sotuvchi Sayt',
        heroSubtitle:
          'Sotuvchi, tezkor va SEO-mos landing\'lar. Zamonaviy texnologiya bilan, mobilga mos.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Tezkor',
            description: 'Sayt tez ochiladi — bu mijoz qoldirib ketishini kamaytiradi va sotuvni oshiradi.',
          },
          {
            icon: 'Target',
            title: 'Sotuvchi',
            description: 'Dizayn mijozni so\'rov yuborishga yo\'naltiradi — raqamlar asosida qurilgan.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme',
            description: 'O\'zbekiston to\'lov tizimlari integratsiyasi.',
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
          'Maxsus UI/UX dizayn',
          'Mobile-first responsive (telefonga moslashuvchan)',
          'Click va Payme to\'lov integratsiyasi (kerak bo\'lsa)',
          'So\'rov formasi + email/Telegram bildirishnoma',
          'Analitika integratsiyasi (Google)',
          'Texnik SEO bazasi',
          'Saytni ishga tushirish va domen ulash',
          'Ishga tushgandan keyin 1 oy bepul support',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '5–10 ish kuni',
        process: [
          {
            step: 1,
            title: 'Konsultatsiya va strategiya',
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
            description: 'Kod, animatsiya, integratsiya (to\'lov, analytics, form).',
            duration: '2–4 kun',
          },
          {
            step: 4,
            title: 'Ishga tushirish',
            description: 'Domen ulash, SEO tekshiruvi va saytni ishga tushirish.',
            duration: '1 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Googleda topda chiqish va sotuvni oshirish uchun moslashish',
          'Eng mos va zamonaviy texnologiyalar',
          '3 til (uz/ru/en) tayyor — agar kerak bo\'lsa, narx o\'zgarmaydi',
          'Saytingizni o\'zingiz nazorat qila olasiz',
          '10+ muvaffaqiyatli loyiha (Darslinker, Getolog, Uzbektype va boshqalar)',
          'Shaffof narx',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Landing page yaratish narxi qancha turadi?',
            answer:
              'KATOV\'da landing page narxi $270 dan boshlanadi. Aniq narx funksiyalar va integratsiyalar soniga qarab belgilanadi: oddiy so\'rov formasi bilan landing $270–$400, to\'lov integratsiyasi bilan $400–$700, murakkab sotuv yo\'li va animatsiyalar bilan $700–$1200. Konsultatsiya jarayonida aniq narx beriladi va keyin o\'zgarmaydi.',
          },
          {
            question: 'Landing page necha kunda tayyor bo\'ladi?',
            answer:
              'Standart muddat — 5–10 ish kuni. Bunga konsultatsiya (1 kun), UI/UX dizayn (2–3 kun), kod va integratsiya (2–4 kun), ishga tushirish (1 kun) kiradi. Tezroq variant: oddiy landing 3–5 kunda ham yetkazib beriladi.',
          },
          {
            question: 'Domen va hosting alohida to\'lanadimi?',
            answer:
              'Hosting KATOV tomonidan sozlanadi va ulanadi — qo\'shimcha to\'lovsiz. Domen (.uz, .com va h.k.) sizning nomingizga ro\'yxat qilinadi — bu yillik to\'lov ($10–$30/yil .uz uchun), to\'g\'ridan-to\'g\'ri ro\'yxatchilarga to\'lanadi. Domen sizning egaligingizda qoladi.',
          },
          {
            question: 'Click va Payme integratsiyasi tayyor keladimi?',
            answer:
              'Ha, agar kerak bo\'lsa. Click va Payme merchant API\'lari integratsiya qilinadi: mijoz sayt orqali to\'lov qiladi, sizga avtomatik tasdiq keladi. Buning uchun sizning Click va Payme merchant akkauntingiz bo\'lishi kerak (yoki KATOV qo\'lga olishida yordam beradi).',
          },
          {
            question: 'Keyin o\'zim tahrir qila olamanmi (kontent yangilash)?',
            answer:
              'Landing\'da admin panel yo\'q. Kontent yangilash kerak bo\'lsa, KATOV o\'zi qiladi — bepul support davrida bepul, keyinchalik kelishilgan narxda.',
          },
          {
            question: 'Sayt telefonda yaxshi ko\'rinadimi?',
            answer:
              'Ha, har bir landing telefon va boshqa qurilmalarda to\'liq mos ishlaydi. Google\'ning sifat testidan ham yuqori baho oladi.',
          },
        ],
        ctaTitle: 'Landing\'ingiz uchun bepul konsultatsiya',
        ctaSubtitle:
          'Ma\'lumotlarni qoldiring, 1 ish kuni ichida bog\'lanamiz. Konsultatsiya bepul, hech qanday majburiyat yo\'q.',
        ctaPrimary: 'Loyihani boshlash',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Создание Landing Page — Цена и Сроки',
        metaDescription:
          'Создание продающего landing page — современные технологии, адаптация под мобильные. 5–10 дней, от $270. Интеграция Click и Payme.',
        h1: 'Создание Landing Page: Продающий Сайт за 5–10 Дней',
        heroSubtitle:
          'Продающие, быстрые и SEO-оптимизированные landing. Современные технологии, адаптация под мобильные.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Быстрый',
            description: 'Сайт грузится быстро — это снижает уход посетителей и повышает продажи.',
          },
          {
            icon: 'Target',
            title: 'Продающий',
            description: 'Дизайн направляет клиента к отправке заявки — построен на данных, а не на догадках.',
          },
          {
            icon: 'CreditCard',
            title: 'Click и Payme',
            description: 'Интеграция платёжных систем Узбекистана.',
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
          'Индивидуальный UI/UX дизайн',
          'Mobile-first адаптив (под мобильные)',
          'Интеграция Click и Payme (при необходимости)',
          'Форма заявки + уведомления на email/Telegram',
          'Интеграция аналитики (Google)',
          'Техническая SEO-база',
          'Запуск сайта и подключение домена',
          'Бесплатная поддержка 1 месяц после запуска',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '5–10 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Консультация и стратегия',
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
            description: 'Код, анимации, интеграции (оплаты, аналитика, формы).',
            duration: '2–4 дня',
          },
          {
            step: 4,
            title: 'Запуск',
            description: 'Подключение домена, SEO-проверка и запуск.',
            duration: '1 день',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Топ в Google и адаптация под рост продаж',
          'Современные и подходящие технологии',
          '3 языка (uz/ru/en) готовы — при необходимости, без доп. стоимости',
          'Вы сами контролируете свой сайт',
          '10+ успешных проектов (Darslinker, Getolog, Uzbektype и др.)',
          'Прозрачная цена',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит создание landing page?',
            answer:
              'В KATOV landing page начинается от $270. Точная цена зависит от функций и интеграций: простая форма заявки $270–$400, с платёжной интеграцией $400–$700, со сложной воронкой продаж и анимациями $700–$1200. Точная цена фиксируется на этапе консультации и не меняется.',
          },
          {
            question: 'За сколько дней готов landing page?',
            answer:
              'Стандартный срок — 5–10 рабочих дней: консультация (1 день), UI/UX (2–3 дня), разработка (2–4 дня), запуск (1 день). Ускоренный вариант: простой landing — за 3–5 дней.',
          },
          {
            question: 'Домен и хостинг оплачиваются отдельно?',
            answer:
              'Хостинг настраивает и подключает KATOV — без дополнительных платежей. Домен (.uz, .com и др.) регистрируется на ваше имя — это годовая оплата ($10–$30/год для .uz), напрямую регистраторам. Домен остаётся в вашем владении.',
          },
          {
            question: 'Интеграция Click и Payme включена?',
            answer:
              'Да, если нужно. Интегрируем merchant API Click и Payme: клиент оплачивает через сайт, вам приходит подтверждение. Нужны ваши merchant-аккаунты Click и Payme (или KATOV поможет их оформить).',
          },
          {
            question: 'Смогу ли я сам редактировать контент позже?',
            answer:
              'У landing нет admin panel. Если нужно обновить контент, KATOV делает это сам — бесплатно во время поддержки, дальше по согласованной цене.',
          },
          {
            question: 'Хорошо ли сайт смотрится на телефоне?',
            answer:
              'Да, каждый landing полностью адаптирован под телефон и другие устройства. Google также оценивает качество сайта высоко.',
          },
        ],
        ctaTitle: 'Бесплатная консультация для вашего landing',
        ctaSubtitle:
          'Оставьте данные — свяжемся в течение 1 рабочего дня. Консультация бесплатная, без обязательств.',
        ctaPrimary: 'Начать проект',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Landing Page Development — Price & Timeline',
        metaDescription:
          'Sales-focused landing page development — modern technology, mobile-friendly. 5–10 days, from $270. Click & Payme integration.',
        h1: 'Landing Page Development: Sales-Ready Site in 5–10 Days',
        heroSubtitle:
          'High-performing, fast, SEO-optimized landings. Modern technology, mobile-friendly.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Fast',
            description: 'Site loads fast — this reduces bounce and lifts sales.',
          },
          {
            icon: 'Target',
            title: 'Sales-focused',
            description: 'Design guides the visitor to send a request — built on data, not guesses.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme',
            description: 'Uzbekistan payment systems integration.',
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
          'Custom UI/UX design',
          'Mobile-first responsive (mobile-friendly)',
          'Click & Payme payment integration (if needed)',
          'Request form + email/Telegram notifications',
          'Analytics integration (Google)',
          'Technical SEO foundation',
          'Site launch & domain connection',
          '1 month free support after launch',
        ],
        processTitle: 'Process',
        processTotalDuration: '5–10 business days',
        process: [
          {
            step: 1,
            title: 'Consultation & strategy',
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
            description: 'Code, animations, integrations (payments, analytics, forms).',
            duration: '2–4 days',
          },
          {
            step: 4,
            title: 'Launch',
            description: 'Domain connection, SEO check, and go-live.',
            duration: '1 day',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Top Google rankings and conversion-tuned for sales',
          'Modern, fit-for-purpose technology',
          '3 languages (uz/ru/en) ready — no extra cost if needed',
          'You stay in control of your own site',
          '10+ successful projects (Darslinker, Getolog, Uzbektype, etc.)',
          'Transparent pricing',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much does a landing page cost?',
            answer:
              'At KATOV, landing pages start from $270. The exact price depends on features and integrations: a simple request form $270–$400, with payment integration $400–$700, with complex sales funnel and animations $700–$1200. The final price is locked during the consultation and never changes.',
          },
          {
            question: 'How long does it take to build a landing page?',
            answer:
              'Standard timeline is 5–10 business days: consultation (1 day), UI/UX design (2–3 days), development (2–4 days), launch (1 day). Express option: simple landing in 3–5 days.',
          },
          {
            question: 'Are domain and hosting charged separately?',
            answer:
              'Hosting is set up and connected by KATOV — no extra fees. Domain (.uz, .com, etc.) is registered in your name — this is a yearly fee ($10–$30/year for .uz) paid directly to registrars. The domain stays under your ownership.',
          },
          {
            question: 'Are Click and Payme integrations included?',
            answer:
              'Yes, if needed. We integrate Click and Payme merchant APIs: customers pay via the site, you receive automatic confirmation. You\'ll need your own merchant accounts (or KATOV can help you set them up).',
          },
          {
            question: 'Can I edit the content myself later?',
            answer:
              'Landings don\'t include an admin panel. KATOV handles content updates — free during the support period, then at an agreed price.',
          },
          {
            question: 'Does the site look good on mobile?',
            answer:
              'Yes, every landing is fully responsive on phones and other devices. It also scores well on Google\'s quality tests.',
          },
        ],
        ctaTitle: 'Free consultation for your landing page',
        ctaSubtitle:
          'Leave your details — we\'ll get back within 1 business day. The consultation is free, no commitment.',
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
        description: 'Sotuvchi bir sahifali sayt — tezkor va Google\'da yaxshi ko\'rinadi.',
      },
      ru: {
        title: 'Landing Page',
        description: 'Одностраничный продающий сайт — быстрый и хорошо ранжируется в Google.',
      },
      en: {
        title: 'Landing Page',
        description: 'Sales-focused one-page site — fast and Google-friendly.',
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
        description: 'Onlayn savdo sayti — Click va Payme to\'lov, mahsulot katalogi, buyurtmalarni boshqarish.',
      },
      ru: {
        title: 'Интернет-магазин',
        description: 'Сайт онлайн-продаж — оплата Click и Payme, каталог товаров, управление заказами.',
      },
      en: {
        title: 'E-commerce',
        description: 'Online store — Click and Payme payments, product catalog, order management.',
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
        description: 'Mijoz va sotuv boshqaruvi tizimi — biznesingizning ehtiyojiga moslashtirib quramiz.',
      },
      ru: {
        title: 'CRM-система',
        description: 'Управление клиентами и продажами — собираем под ваш бизнес индивидуально.',
      },
      en: {
        title: 'CRM System',
        description: 'Customer and sales management — built around your business needs.',
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
    basePrice: 1000,
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
        description: 'Biznes ma\'lumotlarini boshqarish tizimi — mahsulot, mijoz va hisobotlar bir joyda.',
      },
      ru: {
        title: 'Админ-панель',
        description: 'Система управления данными бизнеса — товары, клиенты и отчёты в одном месте.',
      },
      en: {
        title: 'Admin Panel',
        description: 'Business data management system — products, customers, and reports in one place.',
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
        description: 'KATOV qurgan loyihalar uchun oylik xizmat — sayt doim ishlaydi, kontentni yangilab beramiz.',
      },
      ru: {
        title: 'Хостинг и поддержка',
        description: 'Ежемесячный сервис для проектов KATOV — сайт работает стабильно, обновляем контент за вас.',
      },
      en: {
        title: 'Hosting & Support',
        description: 'Monthly service for KATOV-built projects — your site stays up, content updates handled.',
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
        description: 'Sayt va ilova vizual dizayni — Figma\'da, kodsiz. Boshqa kompaniya kod yozadi.',
      },
      ru: {
        title: 'UI/UX дизайн',
        description: 'Визуальный дизайн сайтов и приложений — в Figma, без кода. Программирует другая команда.',
      },
      en: {
        title: 'UI/UX Design',
        description: 'Visual design for web and apps — in Figma, no code. Another team handles coding.',
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
