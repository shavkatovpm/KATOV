import type { Locale } from '@/i18n/config';

// Home page copy for the process / pricing / FAQ blocks. Every number here
// comes from the services catalog (src/data/services.ts) — keep them in sync
// when prices or timelines change there. llms.txt reads the process from here.

interface ProcessStep {
  title: string;
  text: string;
}

interface PriceTier {
  name: string;
  price: string;
  text: string;
  href: string;
}

export const homeProcess: Record<
  Locale,
  { title: string; steps: ProcessStep[]; pricingTitle: string; tiers: PriceTier[]; pricingNote: string; calcCta: string }
> = {
  uz: {
    title: 'Ish qanday boshlanadi',
    steps: [
      { title: 'Konsultatsiya', text: 'Biznesingiz, mijozlaringiz va saytdan kutayotgan natijangizni aniqlaymiz.' },
      { title: 'Dizayn', text: 'Sahifalar tuzilmasi va ko‘rinishini kelishamiz, 2 marta tuzatish kiradi.' },
      { title: 'Ishlab chiqish', text: 'Sayt quriladi, to‘lov va boshqa tizimlar ulanadi, hammasi tekshiriladi.' },
      { title: 'Ishga tushirish', text: 'Domenga ulaymiz, SEO sozlamalarini tekshiramiz va saytni topshiramiz.' },
    ],
    pricingTitle: 'Narxlar',
    tiers: [
      { name: 'Website', price: '$270 dan', text: 'Landing, korporativ yoki portfolio sayt, 5–15 kun', href: '/sayt-yaratish' },
      { name: 'SEO xizmati', price: '$300/oy dan', text: 'Texnik audit, kontent va kalit so‘zlar, birinchi natija 2–3 oyda', href: '/seo' },
      { name: 'Internet do‘kon', price: '$1700 dan', text: 'Katalog, Click va Payme to‘lov, buyurtmalar, 15–25 ish kuni', href: '/services/internet-dokon' },
    ],
    pricingNote: 'Narxlar boshlang‘ich, yakuniy narx loyiha hajmiga bog‘liq.',
    calcCta: 'Narxni hisoblash',
  },
  ru: {
    title: 'Как начинается работа',
    steps: [
      { title: 'Консультация', text: 'Разбираемся в вашем бизнесе, клиентах и в том, какой результат нужен от сайта.' },
      { title: 'Дизайн', text: 'Согласуем структуру и внешний вид страниц, 2 раунда правок включены.' },
      { title: 'Разработка', text: 'Собираем сайт, подключаем оплату и другие системы, всё тестируем.' },
      { title: 'Запуск', text: 'Подключаем домен, проверяем SEO-настройки и передаём сайт.' },
    ],
    pricingTitle: 'Цены',
    tiers: [
      { name: 'Сайт', price: 'от $270', text: 'Лендинг, корпоративный сайт или портфолио, 5–15 дней', href: '/sayt-yaratish' },
      { name: 'SEO-продвижение', price: 'от $300/мес', text: 'Технический аудит, контент и ключевые слова, первые результаты через 2–3 месяца', href: '/seo' },
      { name: 'Интернет-магазин', price: 'от $1700', text: 'Каталог, оплата Click и Payme, заказы, 15–25 рабочих дней', href: '/services/internet-dokon' },
    ],
    pricingNote: 'Цены стартовые, итоговая зависит от объёма проекта.',
    calcCta: 'Рассчитать цену',
  },
  en: {
    title: 'How a project starts',
    steps: [
      { title: 'Consultation', text: 'We learn your business, your customers and what the site needs to achieve.' },
      { title: 'Design', text: 'We agree on page structure and look; 2 rounds of revisions are included.' },
      { title: 'Development', text: 'We build the site, connect payments and other systems, and test everything.' },
      { title: 'Launch', text: 'We connect the domain, check SEO settings and hand the site over.' },
    ],
    pricingTitle: 'Pricing',
    tiers: [
      { name: 'Website', price: 'from $270', text: 'Landing, corporate or portfolio site, 5–15 days', href: '/sayt-yaratish' },
      { name: 'SEO service', price: 'from $300/mo', text: 'Technical audit, content and keywords, first results in 2–3 months', href: '/seo' },
      { name: 'Online store', price: 'from $1700', text: 'Catalog, Click and Payme payments, orders, 15–25 business days', href: '/services/internet-dokon' },
    ],
    pricingNote: 'Starting prices; the final price depends on the project scope.',
    calcCta: 'Estimate the price',
  },
};

export const homeFaq: Record<Locale, { faqTitle: string; faq: { question: string; answer: string }[] }> = {
  uz: {
    faqTitle: 'Ko‘p beriladigan savollar',
    faq: [
      {
        question: 'Sayt yaratish qancha turadi?',
        answer:
          'KATOV’da landing page va portfolio sayt $270 dan, korporativ sayt $870 dan, internet do‘kon $1700 dan boshlanadi. Yakuniy narx sahifalar soni, tillar va to‘lov kabi ulanishlarga bog‘liq. Taxminiy narxni saytdagi kalkulyatorda hisoblash mumkin.',
      },
      {
        question: 'Sayt necha kunda tayyor bo‘ladi?',
        answer:
          'Landing page odatda 5–10 ish kunida, korporativ sayt 10–20 ish kunida, internet do‘kon 15–25 ish kunida tayyor bo‘ladi. Muddat materiallar (matn, rasm) qanchalik tez berilishiga ham bog‘liq.',
      },
      {
        question: 'SEO natijasi qachon ko‘rinadi?',
        answer:
          'Google’da birinchi natijalar odatda 2–3 oyda, barqaror natija 6–12 oyda ko‘rinadi. AI qidiruv (ChatGPT, Perplexity) uchun birinchi natija 1–3 oyda kutiladi. Biz Google’da 1-o‘rinni kafolatlamaymiz — buni hech kim halol kafolatlay olmaydi.',
      },
      {
        question: 'Sayt qaysi tillarda bo‘ladi?',
        answer: 'Sayt o‘zbek, rus va ingliz tillarida qilinishi mumkin. Har bir til alohida sahifalarga ega bo‘ladi va Google’da alohida topiladi.',
      },
      {
        question: 'Click va Payme to‘lovlari ulanadimi?',
        answer: 'Ha. Internet do‘kon, landing page va Telegram botlarga Click va Payme orqali to‘lov ulab beriladi.',
      },
      {
        question: 'Saytni keyin o‘zim yangilay olamanmi?',
        answer: 'Korporativ sayt va internet do‘konda admin panel bo‘ladi: matn, rasm va mahsulotlarni dasturchisiz o‘zingiz o‘zgartirasiz.',
      },
    ],
  },
  ru: {
    faqTitle: 'Частые вопросы',
    faq: [
      {
        question: 'Сколько стоит создание сайта?',
        answer:
          'В KATOV лендинг и сайт-портфолио стоят от $270, корпоративный сайт — от $870, интернет-магазин — от $1700. Итоговая цена зависит от количества страниц, языков и интеграций, например оплаты. Примерную стоимость можно посчитать в калькуляторе на сайте.',
      },
      {
        question: 'За сколько дней будет готов сайт?',
        answer:
          'Лендинг обычно готов за 5–10 рабочих дней, корпоративный сайт — за 10–20, интернет-магазин — за 15–25 рабочих дней. Срок также зависит от того, как быстро предоставлены материалы (тексты, фото).',
      },
      {
        question: 'Когда будет виден результат SEO?',
        answer:
          'Первые результаты в Google обычно появляются через 2–3 месяца, стабильный результат — через 6–12 месяцев. Для AI-поиска (ChatGPT, Perplexity) первые результаты ожидаются через 1–3 месяца. Мы не гарантируем 1-е место в Google — честно это не может гарантировать никто.',
      },
      {
        question: 'На каких языках будет сайт?',
        answer: 'Сайт можно сделать на узбекском, русском и английском. У каждого языка свои страницы, которые отдельно находятся в Google.',
      },
      {
        question: 'Можно подключить Click и Payme?',
        answer: 'Да. К интернет-магазину, лендингу и Telegram-боту подключаем оплату через Click и Payme.',
      },
      {
        question: 'Смогу ли я сам обновлять сайт?',
        answer: 'В корпоративном сайте и интернет-магазине есть админ-панель: тексты, фото и товары вы меняете сами, без программиста.',
      },
    ],
  },
  en: {
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        question: 'How much does a website cost?',
        answer:
          'At KATOV a landing page or portfolio site starts at $270, a corporate website at $870 and an online store at $1700. The final price depends on the number of pages, languages and integrations such as payments. You can get an estimate in the price calculator on the site.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'A landing page usually takes 5–10 business days, a corporate website 10–20 and an online store 15–25 business days. The timeline also depends on how quickly content (texts, photos) is provided.',
      },
      {
        question: 'When will SEO results show?',
        answer:
          'First results in Google usually appear in 2–3 months, with stable results in 6–12 months. For AI search (ChatGPT, Perplexity) first results are expected in 1–3 months. We do not guarantee the #1 spot in Google — nobody can honestly guarantee that.',
      },
      {
        question: 'Which languages can the site be in?',
        answer: 'The site can be built in Uzbek, Russian and English. Each language gets its own pages that Google finds separately.',
      },
      {
        question: 'Can Click and Payme payments be connected?',
        answer: 'Yes. We connect Click and Payme payments to online stores, landing pages and Telegram bots.',
      },
      {
        question: 'Can I update the site myself later?',
        answer: 'Corporate websites and online stores come with an admin panel: you change texts, photos and products yourself, without a developer.',
      },
    ],
  },
};
