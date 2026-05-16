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
  'internet-dokon': {
    slug: 'internet-dokon',
    icon: 'ShoppingCart',
    basePrice: 1700,
    priceSuffix: '',
    demand: 5,
    content: {
      uz: {
        title: 'Internet Do\'kon Yaratish — Click, Payme, Yetkazib Berish',
        metaDescription:
          'Internet do\'kon yaratish — mahsulot katalogi, Click va Payme to\'lov, buyurtma boshqaruvi. 15–25 kun, $1700 dan. Onlayn savdoni boshlang.',
        h1: 'Internet Do\'kon Yaratish: Onlayn Savdoni Boshlash',
        heroSubtitle:
          'Mahsulot katalogi, Click va Payme to\'lov, buyurtmalarni boshqarish — onlayn savdoning hammasi bitta saytda.',
        benefits: [
          {
            icon: 'CreditCard',
            title: 'Click va Payme ulab beriladi',
            description:
              'KATOV ulaydi: mijoz sayt orqali to\'lov qiladi va pul sizning hisobingizga avtomatik tushadi.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'Buyurtmalar bir joyda',
            description:
              'Admin panelda har bir buyurtma ko\'rinadi: kim sotib oldi, qaysi mahsulot, qancha to\'ladi, qaysi statusda.',
          },
          {
            icon: 'Smartphone',
            title: 'Telefonda mukammal',
            description:
              'Mijoz katalogni telefonda ko\'radi, mahsulotni tanlaydi va shu yerda to\'laydi.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Brand va magazinlar',
            description:
              'O\'z mahsulotingizni onlayn sotib, Instagram\'dagi savdoni kengaytirish va do\'kon ochish.',
          },
          {
            title: 'Distributorlar',
            description:
              'Ulgurji savdo, hamkorlar uchun katalog va buyurtma qabul qilish tizimi.',
          },
          {
            title: 'Restoran va kulinariya',
            description:
              'Onlayn buyurtma va yetkazib berish — taom katalogi, savatcha va to\'lov.',
          },
          {
            title: 'Xizmat ko\'rsatuvchilar',
            description:
              'Onlayn kurs, paket, mahsulotni saytda sotish va to\'lov yig\'ish.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Mahsulot katalogi — kategoriyalar, filtr, qidiruv',
          'Mahsulot sahifasi — rasm, tavsif, narx, qoldiq',
          'Savatcha va checkout (buyurtma berish jarayoni)',
          'Click va Payme to\'lov integratsiyasi',
          'Yetkazib berish hududlari va narxlari sozlash',
          'Buyurtmalar admin paneli — status, tarix, hisobotlar',
          'Mahsulot va qoldiq boshqaruvi',
          'Email va Telegram bildirishnomalari (yangi buyurtma, to\'lov)',
          'Telefon va boshqa qurilmalarga moslashuv',
          '3 til (uz/ru/en) tayyor — qo\'shimcha narxsiz',
          'Saytni ishga tushirish va domen ulash',
          '1 oy bepul support',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '15–25 ish kuni',
        process: [
          {
            step: 1,
            title: 'Konsultatsiya va strategiya',
            description:
              'Mahsulot turlari, kategoriyalar, to\'lov va yetkazib berish shartlari. Click/Payme akkauntlar mavjudligi.',
            duration: '2 kun',
          },
          {
            step: 2,
            title: 'UI/UX dizayn',
            description:
              'Katalog, mahsulot, savatcha, checkout va admin panel — Figma\'da dizayn. Ikki revizyon.',
            duration: '5–7 kun',
          },
          {
            step: 3,
            title: 'Development',
            description:
              'Kod, to\'lov integratsiyasi (Click + Payme), admin panel, bildirishnomalar.',
            duration: '7–14 kun',
          },
          {
            step: 4,
            title: 'Ishga tushirish',
            description:
              'Domen ulash, mahsulot ma\'lumotlarini yuklash, to\'lov test, rasmiy ishga tushirish.',
            duration: '1–2 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Click va Payme — O\'zbekiston to\'lov tizimlarini KATOV o\'zi ulab beradi',
          'Admin panel orqali mahsulot, narx va qoldiqni o\'zingiz boshqarasiz',
          '3 til (uz/ru/en) tayyor — qo\'shimcha narxsiz',
          'Sayt Google va Yandex\'da chiqishi uchun tayyor — texnik SEO bazasi',
          '10+ muvaffaqiyatli loyiha (Darslinker, Getolog, Uzbektype va boshqalar)',
          'Shaffof narx — $1700 dan, qo\'shimcha to\'lov yo\'q',
          'Ishga tushgandan keyin 1 oy bepul support',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Internet do\'kon yaratish qancha turadi?',
            answer:
              'KATOV\'da internet do\'kon $1700 dan boshlanadi. Standart paket: katalog (200 gacha mahsulot), savatcha, Click va Payme to\'lov, admin panel va 3 til. Murakkab loyihalar (ko\'p kategoriyalar, integratsiyalar, custom funksiyalar) $2500–$5000 oralig\'ida. Aniq narx konsultatsiyada belgilanadi va keyin o\'zgarmaydi.',
          },
          {
            question: 'Internet do\'kon necha kunda tayyor bo\'ladi?',
            answer:
              'Standart muddat — 15–25 ish kuni. Konsultatsiya (2 kun), dizayn (5–7 kun), kod va to\'lov integratsiyasi (7–14 kun), ishga tushirish (1–2 kun). Mahsulotlar soni va integratsiyalar muddatga ta\'sir qiladi.',
          },
          {
            question: 'Click va Payme\'ni qanday qo\'shamiz?',
            answer:
              'KATOV Click va Payme merchant API\'lariga integratsiya qiladi — mijoz sayt orqali to\'lov qiladi, sizga avtomatik tasdiq keladi. Sizning Click va Payme merchant akkauntingiz bo\'lishi kerak. Agar yo\'q bo\'lsa, KATOV ularni ochishda yordam beradi.',
          },
          {
            question: 'Mahsulotlarni qanday qo\'shaman va boshqaraman?',
            answer:
              'Admin panel orqali — yangi mahsulot qo\'shish, rasm yuklash, narx va qoldiq yangilash, kategoriyalar yaratish. Kod yozish kerak emas. Buyurtmalar ham shu yerda ko\'rinadi: kim, qachon, qancha — barchasi statistika bilan.',
          },
          {
            question: 'Yetkazib berish va manzil qanday ishlaydi?',
            answer:
              'Yetkazib berish hududlari (masalan Toshkent ichida, viloyatlar, butun O\'zbekiston) admin panel orqali sozlanadi — har birining narxi va vaqti alohida. Mijoz checkout\'da hududni tanlaydi va narx avtomatik hisoblanadi. Hududsiz "olib ketish" varianti ham mumkin.',
          },
          {
            question: 'Telegram orqali bildirishnoma keladimi?',
            answer:
              'Ha. Har yangi buyurtma, to\'lov tasdiqi yoki muhim hodisa Telegram\'ga (sizning shaxsiy yoki ish guruhingizga) avtomatik kelishi mumkin. Bu boshqa funksiyalardan ortda emas, narxga qo\'shimcha emas.',
          },
        ],
        ctaTitle: 'Internet do\'kon uchun bepul konsultatsiya',
        ctaSubtitle:
          'Ma\'lumotlarni qoldiring, 1 ish kuni ichida bog\'lanamiz. Konsultatsiya bepul, hech qanday majburiyat yo\'q.',
        ctaPrimary: 'Loyihani boshlash',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Разработка Интернет-Магазина — Под Ключ',
        metaDescription:
          'Разработка интернет-магазина — каталог, Click и Payme, управление заказами. 15–25 дней, от $1700. Запустите онлайн-продажи.',
        h1: 'Разработка Интернет-Магазина: Запустить Онлайн-Продажи',
        heroSubtitle:
          'Каталог товаров, оплата Click и Payme, управление заказами — всё для онлайн-продаж в одном сайте.',
        benefits: [
          {
            icon: 'CreditCard',
            title: 'Подключаем Click и Payme',
            description:
              'KATOV подключает: клиент оплачивает через сайт, деньги поступают на ваш счёт автоматически.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'Заказы в одном месте',
            description:
              'В админ-панели виден каждый заказ: кто купил, какой товар, сколько оплатил, в каком статусе.',
          },
          {
            icon: 'Smartphone',
            title: 'Идеально на телефоне',
            description:
              'Клиент смотрит каталог с телефона, выбирает товар и сразу оплачивает.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Бренды и магазины',
            description:
              'Продавайте свой товар онлайн, выходите за рамки Instagram и открывайте свой магазин.',
          },
          {
            title: 'Дистрибьюторы',
            description:
              'Оптовая продажа, каталог и приём заказов для партнёров.',
          },
          {
            title: 'Рестораны и кулинария',
            description:
              'Онлайн-заказ и доставка — каталог блюд, корзина и оплата.',
          },
          {
            title: 'Сервисные компании',
            description:
              'Онлайн-курсы, пакеты, цифровые продукты — продаёте и принимаете оплату прямо на сайте.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Каталог товаров — категории, фильтры, поиск',
          'Карточка товара — фото, описание, цена, остаток',
          'Корзина и оформление заказа',
          'Интеграция Click и Payme',
          'Зоны и стоимость доставки',
          'Админ-панель заказов — статус, история, отчёты',
          'Управление товарами и остатками',
          'Уведомления на email и Telegram (новый заказ, оплата)',
          'Адаптация под телефоны и другие устройства',
          '3 языка (uz/ru/en) — без доп. стоимости',
          'Запуск сайта и подключение домена',
          'Бесплатная поддержка 1 месяц',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '15–25 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Консультация и стратегия',
            description:
              'Типы товаров, категории, условия оплаты и доставки. Наличие аккаунтов Click/Payme.',
            duration: '2 дня',
          },
          {
            step: 2,
            title: 'UI/UX дизайн',
            description:
              'Каталог, товар, корзина, оформление и админ-панель — дизайн в Figma. Две правки.',
            duration: '5–7 дней',
          },
          {
            step: 3,
            title: 'Разработка',
            description:
              'Код, интеграция оплаты (Click + Payme), админ-панель, уведомления.',
            duration: '7–14 дней',
          },
          {
            step: 4,
            title: 'Запуск',
            description:
              'Подключение домена, загрузка товаров, тестирование оплаты, официальный запуск.',
            duration: '1–2 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Click и Payme — платёжные системы Узбекистана подключаем сами',
          'Через админ-панель сами управляете товарами, ценами и остатками',
          '3 языка (uz/ru/en) — без доп. стоимости',
          'Сайт готов к продвижению в Google и Yandex — техническая SEO-база',
          '10+ успешных проектов (Darslinker, Getolog, Uzbektype и др.)',
          'Прозрачная цена — от $1700, без скрытых доплат',
          'Бесплатная поддержка 1 месяц после запуска',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит разработка интернет-магазина?',
            answer:
              'В KATOV интернет-магазин начинается от $1700. Стандартный пакет: каталог (до 200 товаров), корзина, оплата Click и Payme, админ-панель и 3 языка. Для сложных проектов (много категорий, интеграции, кастом) — $2500–$5000. Точная цена фиксируется на этапе консультации и не меняется.',
          },
          {
            question: 'За сколько дней готов интернет-магазин?',
            answer:
              'Стандартный срок — 15–25 рабочих дней. Консультация (2 дня), дизайн (5–7 дней), код и платёжная интеграция (7–14 дней), запуск (1–2 дня). Количество товаров и интеграции влияют на срок.',
          },
          {
            question: 'Как подключаются Click и Payme?',
            answer:
              'KATOV интегрирует merchant API Click и Payme — клиент оплачивает через сайт, вам приходит автоматическое подтверждение. Нужны ваши merchant-аккаунты Click и Payme. Если их нет — KATOV поможет оформить.',
          },
          {
            question: 'Как добавлять и управлять товарами?',
            answer:
              'Через админ-панель — добавить новый товар, загрузить фото, обновить цену и остаток, создать категории. Код не нужен. Здесь же видны заказы: кто, когда, сколько — со статистикой.',
          },
          {
            question: 'Как работает доставка и адреса?',
            answer:
              'Зоны доставки (например по Ташкенту, по регионам, по всему Узбекистану) настраиваются в админ-панели — у каждой своя цена и срок. Клиент выбирает зону на оформлении, цена считается автоматически. Можно также вариант "самовывоз".',
          },
          {
            question: 'Приходят ли уведомления в Telegram?',
            answer:
              'Да. Каждый новый заказ, подтверждение оплаты и важное событие может приходить в Telegram (личный или рабочий чат) автоматически. Это входит в пакет — без доплаты.',
          },
        ],
        ctaTitle: 'Бесплатная консультация по интернет-магазину',
        ctaSubtitle:
          'Оставьте данные — свяжемся в течение 1 рабочего дня. Консультация бесплатная, без обязательств.',
        ctaPrimary: 'Начать проект',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'E-commerce Website Development — Click & Payme',
        metaDescription:
          'E-commerce website development — product catalog, Click and Payme payments, order management. 15–25 days, from $1700. Start selling online.',
        h1: 'E-commerce Website: Start Selling Online',
        heroSubtitle:
          'Product catalog, Click and Payme payments, and order management — everything you need to sell online in one site.',
        benefits: [
          {
            icon: 'CreditCard',
            title: 'We connect Click & Payme',
            description:
              'KATOV sets it up: customers pay through the site and funds land in your account automatically.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'Orders in one place',
            description:
              'The admin panel shows every order: who bought, which product, how much they paid, and the status.',
          },
          {
            icon: 'Smartphone',
            title: 'Perfect on mobile',
            description:
              'Customers browse the catalog on their phone, pick a product, and pay on the spot.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Brands & retailers',
            description:
              'Sell your products online, scale past Instagram, and run your own store.',
          },
          {
            title: 'Distributors',
            description:
              'Wholesale, partner-facing catalogs, and an order intake system.',
          },
          {
            title: 'Restaurants & food businesses',
            description:
              'Online ordering and delivery — menu, cart, and payments built in.',
          },
          {
            title: 'Service providers',
            description:
              'Online courses, packages, digital products — sell and collect payments on the site.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Product catalog — categories, filters, search',
          'Product page — images, description, price, stock',
          'Cart and checkout',
          'Click and Payme payment integration',
          'Delivery zones and pricing',
          'Order admin panel — status, history, reports',
          'Product and stock management',
          'Email and Telegram notifications (new order, payment)',
          'Mobile and other-device friendly',
          '3 languages (uz/ru/en) — no extra cost',
          'Site launch and domain connection',
          '1 month free support',
        ],
        processTitle: 'Process',
        processTotalDuration: '15–25 business days',
        process: [
          {
            step: 1,
            title: 'Consultation & strategy',
            description:
              'Product types, categories, payment and delivery conditions. Whether you already have Click/Payme accounts.',
            duration: '2 days',
          },
          {
            step: 2,
            title: 'UI/UX design',
            description:
              'Catalog, product, cart, checkout, and admin panel — designed in Figma. Two rounds of revisions.',
            duration: '5–7 days',
          },
          {
            step: 3,
            title: 'Development',
            description:
              'Code, payment integration (Click + Payme), admin panel, notifications.',
            duration: '7–14 days',
          },
          {
            step: 4,
            title: 'Launch',
            description:
              'Domain connection, product upload, payment testing, official launch.',
            duration: '1–2 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Click and Payme — we connect Uzbekistan payment systems for you',
          'You manage products, pricing, and stock via the admin panel',
          '3 languages (uz/ru/en) ready — no extra cost',
          'Google and Yandex-ready out of the box — technical SEO foundation',
          '10+ successful projects (Darslinker, Getolog, Uzbektype, etc.)',
          'Transparent pricing — from $1700, no hidden fees',
          '1 month free support after launch',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much does an e-commerce website cost?',
            answer:
              'At KATOV, e-commerce websites start from $1700. The standard package includes catalog (up to 200 products), cart, Click and Payme payments, admin panel, and 3 languages. Complex projects (many categories, integrations, custom features) run $2500–$5000. The final price is locked during the consultation and never changes.',
          },
          {
            question: 'How long does an e-commerce site take?',
            answer:
              'Standard timeline is 15–25 business days: consultation (2 days), design (5–7 days), code and payment integration (7–14 days), launch (1–2 days). Product count and integrations affect the timeline.',
          },
          {
            question: 'How are Click and Payme connected?',
            answer:
              'KATOV integrates Click and Payme merchant APIs — customers pay through the site, you get automatic confirmation. You\'ll need your own Click and Payme merchant accounts. If you don\'t have them, KATOV can help you set them up.',
          },
          {
            question: 'How do I add and manage products?',
            answer:
              'Through the admin panel — add new products, upload photos, update price and stock, create categories. No code needed. Orders also appear here: who, when, how much — with statistics.',
          },
          {
            question: 'How does delivery and address work?',
            answer:
              'Delivery zones (e.g. within Tashkent, across regions, all of Uzbekistan) are configured in the admin panel — each with its own price and timing. Customers select a zone at checkout and the price is calculated automatically. A "pickup" option is also possible.',
          },
          {
            question: 'Do Telegram notifications work?',
            answer:
              'Yes. Every new order, payment confirmation, and important event can be sent to Telegram (your personal or team chat) automatically. It\'s included in the package — no extra cost.',
          },
        ],
        ctaTitle: 'Free consultation for your e-commerce site',
        ctaSubtitle:
          'Leave your details — we\'ll get back within 1 business day. The consultation is free, no commitment.',
        ctaPrimary: 'Start project',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
  'korporativ-sayt': {
    slug: 'korporativ-sayt',
    icon: 'Building2',
    basePrice: 870,
    priceSuffix: '',
    demand: 5,
    content: {
      uz: {
        title: 'Korporativ Sayt Yaratish — $870 dan',
        metaDescription:
          'Korporativ sayt yaratish — kompaniyangiz uchun ko\'p sahifali professional sayt. 3 til, admin panel, $870 dan. 10–20 kunda tayyor.',
        h1: 'Korporativ Sayt Yaratish: Kompaniyangiz Uchun To\'liq Yechim',
        heroSubtitle:
          'Kompaniyangizni onlayn taqdim etadigan ko\'p sahifali sayt — xizmatlar, jamoa, portfolio va aloqa bir joyda.',
        benefits: [
          {
            icon: 'ShieldCheck',
            title: 'Ishonch quradi',
            description:
              'Yaxshi qilingan sayt mijozda kompaniyangizga ishonch tug\'diradi — bu sotuvni tezlashtiradi.',
          },
          {
            icon: 'Search',
            title: 'Google\'da topiladi',
            description:
              'SEO bazasi bilan keladi — mijozlar Google orqali sizning kompaniyangizni qidirib topadi.',
          },
          {
            icon: 'Sparkles',
            title: 'O\'zingiz boshqarasiz',
            description:
              'Admin panel orqali matn, rasm va xizmatlarni o\'zingiz yangilaysiz — har safar bizga murojaat qilmasdan.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'O\'rta va katta biznes',
            description:
              'Kompaniyangizni to\'liq taqdim etish, xizmatlar va jamoa haqida ma\'lumot, ishonchli imidj qurish.',
          },
          {
            title: 'Xizmat ko\'rsatuvchi kompaniyalar',
            description:
              'Yuridik, hisob-kitob, IT, marketing, qurilish va boshqa professional xizmatlar uchun.',
          },
          {
            title: 'Ishlab chiqaruvchi va distributorlar',
            description:
              'Mahsulot katalogi, hamkorlar uchun ma\'lumot va B2B savdo so\'rovlari uchun.',
          },
          {
            title: 'Tashkilot va fondlar',
            description:
              'Loyiha, missiya, jamoa va yangiliklarni mijoz va hamkorlarga taqdim etish.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Bosh sahifa — kompaniya, asosiy xizmatlar va aloqa',
          '"Biz haqimizda" sahifa — kompaniya tarixi, qadriyatlar, jamoa',
          'Xizmatlar sahifasi (har birini batafsil ham qilish mumkin)',
          'Portfolio yoki holatlar sahifasi',
          'Yangiliklar yoki blog bo\'limi',
          'Aloqa sahifasi — xarita, telefon, forma',
          'Telefon va boshqa qurilmalarga moslashuv',
          'Admin panel — kontentni o\'zingiz yangilaysiz',
          '3 til (uz/ru/en) tayyor — qo\'shimcha narxsiz',
          'Saytni ishga tushirish va domen ulash',
          '1 oy bepul support',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '10–20 ish kuni',
        process: [
          {
            step: 1,
            title: 'Konsultatsiya va strategiya',
            description:
              'Kompaniya, mijoz va asosiy maqsadlarni aniqlaymiz. Qaysi sahifalar, qaysi xizmatlar ko\'rsatiladi.',
            duration: '2 kun',
          },
          {
            step: 2,
            title: 'UI/UX dizayn',
            description:
              'Har sahifa Figma\'da dizayn qilinadi. Ikki bosqichli revizyon kiradi.',
            duration: '4–6 kun',
          },
          {
            step: 3,
            title: 'Development',
            description:
              'Kod, kontent integratsiyasi, admin panel sozlash. 3 til kerak bo\'lsa shu yerda quriladi.',
            duration: '5–10 kun',
          },
          {
            step: 4,
            title: 'Ishga tushirish',
            description:
              'Domen ulash, SEO tekshiruvi va saytni rasmiy ishga tushirish.',
            duration: '1–2 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          '3 til (uz/ru/en) tayyor — qo\'shimcha narxsiz',
          'Admin panel orqali matn va rasmlarni o\'zingiz yangilaysiz',
          'Saytni Google\'da chiqarish uchun tayyor — texnik SEO bazasi bilan',
          '10+ muvaffaqiyatli loyiha (Darslinker, Getolog, Uzbektype va boshqalar)',
          'Shaffof narx — $870 dan, qo\'shimcha to\'lov yo\'q',
          'Ishga tushgandan keyin 1 oy bepul support',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Korporativ sayt yaratish narxi qancha turadi?',
            answer:
              'KATOV\'da korporativ sayt narxi $870 dan boshlanadi. Bu standart paket: bosh sahifa, biz haqimizda, xizmatlar, portfolio, blog va aloqa sahifalari, admin panel va 3 til (uz/ru/en). Murakkab loyihalar uchun (ko\'p xizmatlar, custom funksiyalar, integratsiyalar) $1200–$2500 oralig\'ida. Aniq narx konsultatsiyada belgilanadi va keyin o\'zgarmaydi.',
          },
          {
            question: 'Korporativ sayt necha kunda tayyor bo\'ladi?',
            answer:
              'Standart muddat — 10–20 ish kuni. Konsultatsiya (2 kun), UI/UX dizayn (4–6 kun), development (5–10 kun), ishga tushirish (1–2 kun). Tezroq variant — 7–10 kun (oddiy kontent va 4–5 sahifa bilan).',
          },
          {
            question: 'Sayt necha sahifadan iborat bo\'ladi?',
            answer:
              'Standart paketda 6–8 sahifa: bosh sahifa, biz haqimizda, xizmatlar, portfolio/holatlar, blog yoki yangiliklar, aloqa, va 1–2 qo\'shimcha (masalan jamoa, narxlar). Qo\'shimcha sahifalar yoki har xizmat uchun alohida sahifa kerak bo\'lsa, narxga ta\'sir qiladi.',
          },
          {
            question: 'Admin panel orqali nima qilolaman?',
            answer:
              'Admin panel sodda — matnlarni tahrirlash, rasm yuklash, xizmatlar va blog yangiliklari qo\'shish, aloqa ma\'lumotlarini yangilash. Kod yozish kerak emas. Murakkab o\'zgartirishlar kerak bo\'lsa, KATOV qiladi (support davrida bepul).',
          },
          {
            question: '3 til (uz/ru/en) qo\'shimcha narxdami?',
            answer:
              'Yo\'q. Standart paketda 3 til parallel keladi — narx o\'zgarmaydi. Sizga faqat har tilda kontent berish kerak (yoki tarjima kerak bo\'lsa, kelishilgan narxda KATOV qiladi).',
          },
          {
            question: 'Kontentni KATOV yozadimi yoki men taqdim etishim kerak?',
            answer:
              'Standart paketda kontent (matn, rasm, xizmat tavsifi) siz tomondan beriladi. Agar kerak bo\'lsa, KATOV kontent strategiyasi va asosiy matnlarni yozib bera oladi — bu alohida xizmat sifatida narxlanadi.',
          },
        ],
        ctaTitle: 'Korporativ sayt uchun bepul konsultatsiya',
        ctaSubtitle:
          'Ma\'lumotlarni qoldiring, 1 ish kuni ichida bog\'lanamiz. Konsultatsiya bepul, hech qanday majburiyat yo\'q.',
        ctaPrimary: 'Loyihani boshlash',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Разработка Корпоративного Сайта — от $870',
        metaDescription:
          'Разработка корпоративного сайта — многостраничный сайт для компании. 3 языка, админ-панель, от $870. Готов за 10–20 дней.',
        h1: 'Корпоративный Сайт: Полное Решение для Вашей Компании',
        heroSubtitle:
          'Многостраничный сайт, представляющий вашу компанию онлайн — услуги, команда, портфолио и контакты в одном месте.',
        benefits: [
          {
            icon: 'ShieldCheck',
            title: 'Строит доверие',
            description:
              'Качественный сайт вызывает у клиента доверие к компании — это ускоряет продажи.',
          },
          {
            icon: 'Search',
            title: 'Находят через Google',
            description:
              'Идёт с SEO-базой — клиенты находят вашу компанию через поиск Google.',
          },
          {
            icon: 'Sparkles',
            title: 'Управляете сами',
            description:
              'Через админ-панель сами обновляете тексты, фото и услуги — без обращений к нам.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Средний и крупный бизнес',
            description:
              'Полное представление компании, информация об услугах и команде, формирование имиджа.',
          },
          {
            title: 'Сервисные компании',
            description:
              'Юриспруденция, бухгалтерия, IT, маркетинг, строительство и другие профессиональные услуги.',
          },
          {
            title: 'Производители и дистрибьюторы',
            description:
              'Каталог продукции, информация для партнёров и заявки B2B-продаж.',
          },
          {
            title: 'Организации и фонды',
            description:
              'Представление проектов, миссии, команды и новостей клиентам и партнёрам.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Главная страница — компания, основные услуги и контакты',
          'Страница «О нас» — история, ценности, команда',
          'Страница услуг (каждую можно вынести отдельно)',
          'Портфолио или раздел кейсов',
          'Новости или блог',
          'Контакты — карта, телефон, форма',
          'Адаптация под телефоны и другие устройства',
          'Админ-панель — обновляете контент сами',
          '3 языка (uz/ru/en) готовы — без доп. стоимости',
          'Запуск сайта и подключение домена',
          'Бесплатная поддержка 1 месяц',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '10–20 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Консультация и стратегия',
            description:
              'Определяем компанию, клиента и ключевые цели. Какие страницы, какие услуги показываются.',
            duration: '2 дня',
          },
          {
            step: 2,
            title: 'UI/UX дизайн',
            description:
              'Каждая страница в Figma. Включены две правки.',
            duration: '4–6 дней',
          },
          {
            step: 3,
            title: 'Разработка',
            description:
              'Код, интеграция контента, настройка админ-панели. Если нужно — 3 языка собираем здесь.',
            duration: '5–10 дней',
          },
          {
            step: 4,
            title: 'Запуск',
            description:
              'Подключение домена, SEO-проверка и официальный запуск.',
            duration: '1–2 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          '3 языка (uz/ru/en) готовы — без доп. стоимости',
          'Через админ-панель сами обновляете тексты и фото',
          'Сайт готов к продвижению в Google — техническая SEO-база',
          '10+ успешных проектов (Darslinker, Getolog, Uzbektype и др.)',
          'Прозрачная цена — от $870, без скрытых доплат',
          'Бесплатная поддержка 1 месяц после запуска',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит разработка корпоративного сайта?',
            answer:
              'В KATOV корпоративный сайт начинается от $870. Это стандартный пакет: главная, о нас, услуги, портфолио, блог и контакты, админ-панель и 3 языка (uz/ru/en). Для сложных проектов (много услуг, кастомные функции, интеграции) — $1200–$2500. Точная цена фиксируется на этапе консультации и не меняется.',
          },
          {
            question: 'За сколько дней готов корпоративный сайт?',
            answer:
              'Стандартный срок — 10–20 рабочих дней: консультация (2 дня), UI/UX дизайн (4–6 дней), разработка (5–10 дней), запуск (1–2 дня). Ускоренный вариант — 7–10 дней (простой контент и 4–5 страниц).',
          },
          {
            question: 'Сколько страниц будет на сайте?',
            answer:
              'Стандартный пакет: 6–8 страниц — главная, о нас, услуги, портфолио/кейсы, блог или новости, контакты и 1–2 дополнительные (команда, цены). Если нужны отдельные страницы для каждой услуги или больше разделов, это влияет на цену.',
          },
          {
            question: 'Что можно делать через админ-панель?',
            answer:
              'Админ-панель простая — редактировать тексты, загружать фото, добавлять услуги и новости в блоге, обновлять контакты. Код не нужен. Сложные изменения делает KATOV (во время поддержки — бесплатно).',
          },
          {
            question: '3 языка (uz/ru/en) идут за доплату?',
            answer:
              'Нет. В стандартный пакет 3 языка входят без доплаты. От вас нужен контент на каждом языке (или мы переводим — это отдельная услуга по согласованной цене).',
          },
          {
            question: 'KATOV пишет контент или его предоставляю я?',
            answer:
              'В стандартном пакете контент (тексты, фото, описания услуг) предоставляете вы. Если нужно — KATOV напишет контент-стратегию и основные тексты, это отдельная услуга с отдельной ценой.',
          },
        ],
        ctaTitle: 'Бесплатная консультация по корпоративному сайту',
        ctaSubtitle:
          'Оставьте данные — свяжемся в течение 1 рабочего дня. Консультация бесплатная, без обязательств.',
        ctaPrimary: 'Начать проект',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Corporate Website Development — From $870',
        metaDescription:
          'Corporate website development — multi-page site for your company. 3 languages, admin panel, from $870. Ready in 10–20 days.',
        h1: 'Corporate Website: A Complete Solution for Your Company',
        heroSubtitle:
          'A multi-page site that presents your company online — services, team, portfolio, and contacts all in one place.',
        benefits: [
          {
            icon: 'ShieldCheck',
            title: 'Builds trust',
            description:
              'A well-built site earns customer trust in your company — that speeds up sales.',
          },
          {
            icon: 'Search',
            title: 'Found on Google',
            description:
              'Ships with an SEO foundation — customers find your company through Google search.',
          },
          {
            icon: 'Sparkles',
            title: 'You stay in control',
            description:
              'Update texts, images, and services yourself through the admin panel — no need to come back to us.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Mid-size and large business',
            description:
              'Present your company in full, share information about services and team, build a credible image.',
          },
          {
            title: 'Service companies',
            description:
              'Legal, accounting, IT, marketing, construction, and other professional services.',
          },
          {
            title: 'Manufacturers & distributors',
            description:
              'Product catalog, partner information, and B2B sales inquiries.',
          },
          {
            title: 'Organizations & foundations',
            description:
              'Present projects, mission, team, and news to customers and partners.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Home page — company, key services, and contacts',
          'About page — history, values, team',
          'Services page (each can be a dedicated page too)',
          'Portfolio or case studies',
          'News or blog section',
          'Contact page — map, phone, form',
          'Mobile and other-device friendly',
          'Admin panel — update content yourself',
          '3 languages (uz/ru/en) ready — no extra cost',
          'Site launch and domain connection',
          '1 month free support',
        ],
        processTitle: 'Process',
        processTotalDuration: '10–20 business days',
        process: [
          {
            step: 1,
            title: 'Consultation & strategy',
            description:
              'We identify the company, customer, and key goals. Which pages, which services to feature.',
            duration: '2 days',
          },
          {
            step: 2,
            title: 'UI/UX design',
            description:
              'Each page designed in Figma. Two rounds of revisions included.',
            duration: '4–6 days',
          },
          {
            step: 3,
            title: 'Development',
            description:
              'Code, content integration, admin panel setup. 3-language version built here if needed.',
            duration: '5–10 days',
          },
          {
            step: 4,
            title: 'Launch',
            description:
              'Domain connection, SEO check, and official go-live.',
            duration: '1–2 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          '3 languages (uz/ru/en) ready — no extra cost',
          'Update texts and images yourself via the admin panel',
          'Site is Google-ready out of the box — technical SEO foundation',
          '10+ successful projects (Darslinker, Getolog, Uzbektype, etc.)',
          'Transparent pricing — from $870, no hidden fees',
          '1 month free support after launch',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much does a corporate website cost?',
            answer:
              'At KATOV, corporate websites start from $870. This standard package includes: home, about, services, portfolio, blog, contact pages, admin panel, and 3 languages (uz/ru/en). For complex projects (many services, custom features, integrations), $1200–$2500. The final price is locked during the consultation and never changes.',
          },
          {
            question: 'How long does a corporate website take?',
            answer:
              'Standard timeline is 10–20 business days: consultation (2 days), UI/UX design (4–6 days), development (5–10 days), launch (1–2 days). Express option: 7–10 days for simpler content and 4–5 pages.',
          },
          {
            question: 'How many pages will the site have?',
            answer:
              'Standard package: 6–8 pages — home, about, services, portfolio/cases, blog or news, contact, plus 1–2 extras (team, pricing). If you need dedicated pages for each service or more sections, it affects the price.',
          },
          {
            question: 'What can I do through the admin panel?',
            answer:
              'The admin panel is simple — edit text, upload photos, add services and blog posts, update contact information. No code needed. For complex changes, KATOV handles them (free during the support period).',
          },
          {
            question: 'Are 3 languages (uz/ru/en) charged extra?',
            answer:
              'No. The standard package includes 3 languages at no extra cost. You provide the content in each language (or we translate it — that\'s a separate service at an agreed price).',
          },
          {
            question: 'Does KATOV write the content or do I provide it?',
            answer:
              'In the standard package, you provide the content (text, photos, service descriptions). If you need it, KATOV can write content strategy and core texts — billed as a separate service.',
          },
        ],
        ctaTitle: 'Free consultation for your corporate website',
        ctaSubtitle:
          'Leave your details — we\'ll get back within 1 business day. The consultation is free, no commitment.',
        ctaPrimary: 'Start project',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
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
            question: 'Click va Payme to\'lov tizimi qanday qo\'shiladi?',
            answer:
              'KATOV Click va Payme to\'lov tizimini saytga ulab beradi (oldindan tayyor emas — har loyihada alohida sozlanadi). Mijoz sayt orqali to\'lov qiladi, sizga avtomatik tasdiq keladi. Buning uchun sizning Click va Payme merchant akkauntingiz bo\'lishi kerak (yo\'q bo\'lsa, KATOV ochishda yordam beradi).',
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
            question: 'Как подключается оплата Click и Payme?',
            answer:
              'KATOV подключает Click и Payme на проекте (заранее не "готовы" — настраиваем под каждый сайт). Клиент оплачивает через сайт, вам приходит подтверждение. Нужны ваши merchant-аккаунты Click и Payme (если их нет — KATOV поможет оформить).',
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
            question: 'How are Click and Payme payments connected?',
            answer:
              'KATOV connects Click and Payme on each project (they aren\'t "pre-built" — we set them up per site). Customers pay through the site and you get an automatic confirmation. You\'ll need your own Click and Payme merchant accounts (if you don\'t have them, KATOV can help set them up).',
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
