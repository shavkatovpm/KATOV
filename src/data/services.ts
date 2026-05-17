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
  'crm-tizimi': {
    slug: 'crm-tizimi',
    icon: 'Database',
    basePrice: 1000,
    priceSuffix: '',
    demand: 4,
    content: {
      uz: {
        title: 'CRM Tizimi Yaratish — Biznes Boshqaruvi Uchun | KATOV',
        metaDescription:
          'Sizning biznesingiz uchun maxsus CRM: lead, sotuv voronkasi, Telegram bot, hisobotlar. Oylik to\'lov yo\'q. 15–30 kun, $1000 dan.',
        h1: 'CRM Tizimi Yaratish Xizmati: Biznesingiz Uchun Maxsus, Oylik To\'lovsiz',
        heroSubtitle:
          'AmoCRM yoki Bitrix sizning biznesingizga to\'liq mos kelmasa — biz CRM tizimini sizning aniq sotuv jarayoningiz asosida quramiz: lead, voronka, Telegram bot va hisobotlar bilan.',
        benefits: [
          {
            icon: 'Target',
            title: 'Biznesingizga aniq mos',
            description:
              'Shablon emas — sizning sotuv jarayoningiz, voronka bosqichlari va menejerlar rollari asosida quriladi. Foydalanmaydigan ortiqcha modul yo\'q.',
          },
          {
            icon: 'CreditCard',
            title: 'Oylik to\'lov yo\'q',
            description:
              'Bir marta to\'lash — CRM butunlay siznikiga aylanadi. AmoCRM $18/menejer/oy kabi cheklov yo\'q, foydalanuvchi soni va lead miqdoriga to\'lov olinmaydi.',
          },
          {
            icon: 'Bot',
            title: 'Telegram va Click/Payme ulanadi',
            description:
              'Yangi lead yoki to\'lov sekundlarda menejerga Telegram orqali keladi. To\'lov tasdiqlansa, CRM\'da bitim avtomatik yopiladi.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Sotuv jamoasi 3–20 kishi bo\'lgan kompaniyalar',
            description:
              'Menejerlar lead\'larni Excel yoki messenger\'larda kuzatib bo\'lmaydigan darajada ko\'paygan kichik-o\'rta biznes uchun — bir joyda lead, vazifa va hisobot.',
          },
          {
            title: 'Excel va Google Sheets\'da ishlayotgan biznes',
            description:
              'Mijoz bazasi, lead\'lar va sotuvlar jadval orqali boshqarilayotgan — qaytarishi qiyin va xato yuzaga keladigan tizim. CRM bu jarayonni avtomatlashtiradi.',
          },
          {
            title: 'AmoCRM/Bitrix24\'ni "ortiqcha murakkab" topgan',
            description:
              'Bayron CRM sizga foydalanmaydigan o\'nlab funksiya beradi, lekin sizga kerakli aniq narsani — yo\'q. Custom CRM faqat sizga kerakli funksiyalar bilan quriladi.',
          },
          {
            title: 'Maxsus biznes jarayoni bor — ta\'lim, ko\'chmas mulk, b2b',
            description:
              'O\'qituvchi-talaba bog\'lanishi, kvartira-mijoz tarixi yoki uzun b2b voronka — bayron CRM bunday holatlarni qamramaydi. Custom CRM aniq sizning jarayoningizga moslashadi.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Mijoz va lead ma\'lumotlar bazasi — qidiruv, filter va eksport bilan',
          'Sotuv voronkasi (kanban yoki list ko\'rinish) — sizning bosqichlaringiz asosida',
          'Telegram bot integratsiyasi — yangi lead/bron menejerga sekundlarda',
          'Vazifa va eslatmalar — qo\'ng\'iroq, uchrashuv, follow-up',
          'Foydalanuvchi rollari — admin, menejer, operator — har biri o\'z huquqi bilan',
          'Hisobotlar va analitika — kunlik/oylik sotuv, menejer KPI, voronka konversiyasi',
          'Mijoz tarixi — har bog\'lanish, har xabar va har bitim bir joyda',
          'Click/Payme integratsiyasi — to\'lov tasdiqlansa, bitim avtomatik yopiladi',
          'Mobile-first interfeys — menejer telefondan lead\'ni boshqaradi',
          'O\'qitish jamoaga — 1 ish kuni training va qo\'llanma',
          '1 oy bepul support — savollar va kichik o\'zgartirishlar',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '15–30 ish kuni',
        process: [
          {
            step: 1,
            title: 'Biznes jarayonini chiqarish',
            description:
              'Sotuv voronkangiz qanday ishlashini, qaysi bosqichlar borligini va menejerlar nima qilishini batafsil tahlil qilamiz. Bu CRM\'ning asoslari.',
            duration: '3–5 kun',
          },
          {
            step: 2,
            title: 'Dizayn',
            description:
              'CRM interfeysi Figma\'da — menejer ishlayotgan har bir ekran ko\'rsatiladi va tasdiqlanadi. Ikki bosqichli revizyon kiradi.',
            duration: '4–6 kun',
          },
          {
            step: 3,
            title: 'Development va integratsiyalar',
            description:
              'CRM kodi yoziladi, Telegram bot va Click/Payme ulab beriladi, foydalanuvchi rollari sozlanadi va hisobotlar quriladi.',
            duration: '7–14 kun',
          },
          {
            step: 4,
            title: 'Test va jamoaga training',
            description:
              'CRM jamoa bilan test qilinadi, har menejer o\'z ishini ko\'rsatadi. Tushunmagan joylar qo\'llanmaga yoziladi va sizga topshiriladi.',
            duration: '2–3 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
          'Bayron CRM emas — sizning sotuv jarayoningiz asosida quriladi, ortiqcha modul yo\'q',
          'Oylik to\'lov yo\'q — bir marta to\'lash, foydalanuvchi soniga cheklov yo\'q',
          'Telegram bot integratsiyasi standart — menejerlar yangi lead\'ni darrov ko\'radi',
          'Click/Payme bilan ulanadi — to\'lov tasdiqlansa, CRM\'da bitim avtomatik yopiladi',
          'Mavjud Excel/Google Sheets ma\'lumotlari ko\'chiriladi — boshlash uchun qo\'shimcha ish yo\'q',
          'Mobile-first — menejer telefondan ham CRM\'ni boshqaradi',
          '1 oy bepul support — savollar va kichik o\'zgartirishlar',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'AmoCRM yoki Bitrix24\'dan nima farqi bor?',
            answer:
              'AmoCRM va Bitrix24 — bu bayron (shablon) CRM\'lar. Ular barcha biznesga bir xil interfeys va funksiya beradi, sizning aniq jarayoningiz uchun moslashmaydi. Va har oy menejer boshiga to\'lov olinadi ($18+/oy). Custom CRM — sizning sotuv voronkangiz, menejer rollari va biznes mantig\'i asosida quriladi. Bir marta to\'lanadi, foydalanuvchi soniga cheklov yo\'q va CRM butunlay sizniki bo\'ladi.',
          },
          {
            question: 'Excel yoki Google Sheets\'dagi ma\'lumotlarni CRM\'ga ko\'chirib bersangizmi?',
            answer:
              'Ha, bu paket tarkibida. Mijoz bazasi, lead\'lar, bitimlar va tarix — barchasi yangi CRM\'ga ko\'chiriladi. Sizdan faqat fayllarni jo\'natish kerak. Agar ma\'lumotlar tartibsiz bo\'lsa, birga tozalashga yordamlashamiz — duplikat va eski yozuvlar olib tashlanadi.',
          },
          {
            question: 'Menejerlar telefondan ishlay oladimi?',
            answer:
              'Ha, CRM mobile-first quriladi — telefonda to\'liq ishlaydi. Menejer ko\'chada yoki uchrashuvda lead\'ni qo\'shadi, bitim bosqichini o\'zgartiradi, vazifa qo\'shadi. Telegram bot orqali yangi lead haqida darhol xabar oladi va CRM\'ga o\'tib javob beradi.',
          },
          {
            question: 'Foydalanuvchi qo\'shsam qo\'shimcha to\'lov bormi?',
            answer:
              'Yo\'q. Boshqa CRM\'lardan farqli, KATOV custom CRM\'da foydalanuvchi soni cheklovi va oylik to\'lov yo\'q. Yangi menejer kelsa — admin paneldan qo\'shasiz, qo\'shimcha to\'lovsiz. CRM butunlay sizniki, sizning serveringizda yoki KATOV hostingida ishlaydi.',
          },
          {
            question: 'Narx va muddat qancha?',
            answer:
              'Standart CRM $1000 dan boshlanadi va 15–30 ish kunida tayyor bo\'ladi. Bunga: lead va voronka, Telegram bot, vazifalar, hisobotlar, foydalanuvchi rollari, ma\'lumot migratsiyasi va training kiradi. Ko\'p modul yoki murakkab integratsiyalar (1C, Sipuni IP-telefoniya, ko\'p filial) kerak bo\'lsa narx $2000–$5000 oralig\'iga ko\'tariladi. Aniq narx jarayon tahlilidan keyin belgilanadi va loyiha davomida o\'zgarmaydi.',
          },
        ],
        ctaTitle: 'CRM tizimi uchun bepul konsultatsiya',
        ctaSubtitle:
          'Sotuv jarayoningiz va menejerlaringizning ehtiyojlarini birga ko\'rib chiqamiz. Konsultatsiya bepul, 1 ish kuni ichida bog\'lanamiz.',
        ctaPrimary: 'Buyurtma berish',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Разработка CRM-Системы для Бизнеса | KATOV',
        metaDescription:
          'Индивидуальная CRM под ваш бизнес: лиды, воронка продаж, Telegram-бот, отчёты. Без ежемесячной оплаты. 15–30 дней, от $1000.',
        h1: 'Разработка CRM-Системы: Индивидуальная под Ваш Бизнес, без Ежемесячной Оплаты',
        heroSubtitle:
          'Если AmoCRM или Bitrix не подходят вашему бизнесу полностью — мы создаём CRM под ваш конкретный процесс продаж: лиды, воронка, Telegram-бот и отчёты.',
        benefits: [
          {
            icon: 'Target',
            title: 'Точно под ваш бизнес',
            description:
              'Не шаблон — собираем под ваш процесс продаж, этапы воронки и роли менеджеров. Лишних модулей нет.',
          },
          {
            icon: 'CreditCard',
            title: 'Без ежемесячной оплаты',
            description:
              'Платите один раз — CRM полностью ваша. Никаких $18/менеджер/мес как у AmoCRM, ограничений по числу пользователей и лидов нет.',
          },
          {
            icon: 'Bot',
            title: 'Telegram и Click/Payme подключены',
            description:
              'Новый лид или оплата приходит менеджеру в Telegram за секунды. Подтверждённая оплата автоматически закрывает сделку в CRM.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Компании с командой продаж 3–20 человек',
            description:
              'Когда менеджеры не могут отслеживать лиды в Excel или мессенджерах — малый и средний бизнес, которому нужны лиды, задачи и отчёты в одном месте.',
          },
          {
            title: 'Бизнес, работающий в Excel и Google Sheets',
            description:
              'База клиентов, лиды и продажи ведутся в таблицах — система, которую сложно повторить и в которой возникают ошибки. CRM автоматизирует этот процесс.',
          },
          {
            title: 'Те, кому AmoCRM/Bitrix24 «слишком сложны»',
            description:
              'Шаблонная CRM даёт десятки функций, которыми вы не пользуетесь, а нужного — нет. Custom CRM собирается только из нужных вам функций.',
          },
          {
            title: 'Особые бизнес-процессы — обучение, недвижимость, b2b',
            description:
              'Связи учитель-студент, история квартира-клиент или длинная b2b-воронка — шаблонные CRM такое не покрывают. Custom CRM подстраивается под ваш процесс.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'База клиентов и лидов — поиск, фильтры и экспорт',
          'Воронка продаж (kanban или список) — на основе ваших этапов',
          'Интеграция Telegram-бота — новый лид/заявка приходит менеджеру за секунды',
          'Задачи и напоминания — звонок, встреча, follow-up',
          'Роли пользователей — админ, менеджер, оператор — каждый со своими правами',
          'Отчёты и аналитика — дневные/месячные продажи, KPI менеджера, конверсия воронки',
          'История клиента — все звонки, сообщения и сделки в одном месте',
          'Интеграция Click/Payme — при подтверждении оплаты сделка закрывается автоматически',
          'Mobile-first интерфейс — менеджер ведёт лиды с телефона',
          'Обучение команды — 1 рабочий день training и инструкция',
          'Бесплатная поддержка 1 месяц — вопросы и небольшие правки',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '15–30 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Разбор бизнес-процесса',
            description:
              'Детально анализируем, как работает ваша воронка продаж, какие этапы и что делают менеджеры. Это основа CRM.',
            duration: '3–5 дней',
          },
          {
            step: 2,
            title: 'Дизайн',
            description:
              'Интерфейс CRM в Figma — каждый экран, с которым работает менеджер, показывается и согласовывается. Две правки включены.',
            duration: '4–6 дней',
          },
          {
            step: 3,
            title: 'Разработка и интеграции',
            description:
              'Код CRM пишется, подключаем Telegram-бот и Click/Payme, настраиваем роли пользователей и собираем отчёты.',
            duration: '7–14 дней',
          },
          {
            step: 4,
            title: 'Тест и обучение команды',
            description:
              'CRM тестируем с командой, каждый менеджер показывает свою работу. Сложные моменты фиксируем в инструкции и передаём вам.',
            duration: '2–3 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
          'Не шаблонная CRM — собираем под ваш процесс продаж, без лишних модулей',
          'Без ежемесячной оплаты — платите один раз, ограничений по пользователям нет',
          'Telegram-бот подключается стандартно — менеджеры сразу видят новый лид',
          'Click/Payme подключаем — при подтверждении оплаты сделка закрывается автоматически',
          'Данные из Excel/Google Sheets мигрируем — никакой дополнительной работы для старта',
          'Mobile-first — менеджер ведёт CRM и с телефона',
          'Бесплатная поддержка 1 месяц — вопросы и небольшие правки',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Чем отличается от AmoCRM или Bitrix24?',
            answer:
              'AmoCRM и Bitrix24 — это шаблонные CRM. Они дают всем бизнесам один и тот же интерфейс и функции, не подстраиваются под ваш конкретный процесс. И каждый месяц берут плату с менеджера ($18+/мес). Custom CRM строится под вашу воронку продаж, роли менеджеров и бизнес-логику. Оплата один раз, ограничений по пользователям нет, и CRM полностью ваша.',
          },
          {
            question: 'Переносите ли данные из Excel или Google Sheets в CRM?',
            answer:
              'Да, это в пакете. База клиентов, лиды, сделки и история — всё переносится в новую CRM. От вас — отправить файлы. Если данные не упорядочены, помогаем очистить вместе — убираем дубликаты и старые записи.',
          },
          {
            question: 'Могут ли менеджеры работать с телефона?',
            answer:
              'Да, CRM собирается mobile-first — полностью работает на телефоне. Менеджер добавляет лид в дороге или на встрече, меняет этап сделки, добавляет задачу. Через Telegram-бот сразу получает сообщение о новом лиде и переходит в CRM.',
          },
          {
            question: 'Есть ли доплата за дополнительных пользователей?',
            answer:
              'Нет. В отличие от других CRM, в custom CRM от KATOV нет ограничения по числу пользователей и ежемесячной оплаты. Появился новый менеджер — добавляете через админку, без доплаты. CRM полностью ваша, работает на вашем сервере или хостинге KATOV.',
          },
          {
            question: 'Сколько стоит и сколько занимает?',
            answer:
              'Стандартная CRM от $1000, готова за 15–30 рабочих дней. Включает: лиды и воронку, Telegram-бот, задачи, отчёты, роли пользователей, миграцию данных и обучение. Если нужно много модулей или сложные интеграции (1C, IP-телефония Sipuni, мультифилиал) — $2000–$5000. Финальная цена фиксируется после разбора процесса и не меняется до запуска.',
          },
        ],
        ctaTitle: 'Бесплатная консультация по CRM-системе',
        ctaSubtitle:
          'Разберём ваш процесс продаж и потребности менеджеров. Консультация бесплатная — свяжемся в течение 1 рабочего дня.',
        ctaPrimary: 'Заказать',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Custom CRM Development for Business | KATOV',
        metaDescription:
          'Custom CRM tailored to your business: leads, sales pipeline, Telegram bot, reports. No monthly fees. 15–30 days, from $1000.',
        h1: 'Custom CRM Development: Built for Your Business, No Monthly Fees',
        heroSubtitle:
          'If AmoCRM or Bitrix don\'t fully fit your business — we build a CRM around your actual sales process: leads, pipeline, Telegram bot, and reports.',
        benefits: [
          {
            icon: 'Target',
            title: 'Tailored to your business',
            description:
              'Not a template — built around your sales process, pipeline stages, and manager roles. No bloat or unused modules.',
          },
          {
            icon: 'CreditCard',
            title: 'No monthly fees',
            description:
              'Pay once — the CRM is fully yours. No $18/seat/month like AmoCRM, no caps on users or lead counts.',
          },
          {
            icon: 'Bot',
            title: 'Telegram and Click/Payme integrated',
            description:
              'New leads or payments reach the manager via Telegram in seconds. Confirmed payments automatically close the deal in the CRM.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Companies with 3–20 sales reps',
            description:
              'When managers can\'t track leads in Excel or messengers anymore — small to mid businesses needing leads, tasks, and reports in one place.',
          },
          {
            title: 'Businesses running on Excel and Google Sheets',
            description:
              'Customer base, leads, and sales kept in spreadsheets — hard to replicate, error-prone. A CRM automates this whole process.',
          },
          {
            title: 'Teams who find AmoCRM/Bitrix24 too complex',
            description:
              'Template CRMs give you dozens of features you don\'t use and miss the one you need. Custom CRM ships only the features you actually need.',
          },
          {
            title: 'Specific business workflows — education, real estate, b2b',
            description:
              'Teacher-student relations, apartment-client history, or long b2b pipelines — template CRMs don\'t cover these. Custom CRM fits your exact workflow.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Customer and lead database — search, filters, and export',
          'Sales pipeline (kanban or list view) — built around your stages',
          'Telegram bot integration — new leads/requests reach the manager in seconds',
          'Tasks and reminders — call, meeting, follow-up',
          'User roles — admin, manager, operator — each with their own permissions',
          'Reports and analytics — daily/monthly sales, manager KPIs, pipeline conversion',
          'Customer history — every call, message, and deal in one place',
          'Click/Payme integration — confirmed payments automatically close the deal',
          'Mobile-first interface — managers work with leads from their phone',
          'Team training — 1-day training session and a manual',
          '1 month free support — questions and small edits',
        ],
        processTitle: 'Process',
        processTotalDuration: '15–30 business days',
        process: [
          {
            step: 1,
            title: 'Map the business process',
            description:
              'We analyze how your sales pipeline works, the stages involved, and what each manager does. This is the foundation of the CRM.',
            duration: '3–5 days',
          },
          {
            step: 2,
            title: 'Design',
            description:
              'CRM interface in Figma — every screen a manager works with is shown and approved. Two rounds of revisions included.',
            duration: '4–6 days',
          },
          {
            step: 3,
            title: 'Development and integrations',
            description:
              'CRM code is written, Telegram bot and Click/Payme are wired in, user roles are set up, and reports are built.',
            duration: '7–14 days',
          },
          {
            step: 4,
            title: 'Test and team training',
            description:
              'We test the CRM with your team, each manager walks through their workflow. Tricky moments go into the manual and the system is handed over.',
            duration: '2–3 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Individual approach to every project — a solution tailored to your business and customers',
          'Not a template CRM — built around your sales process, no useless modules',
          'No monthly fees — pay once, no per-user limits',
          'Telegram bot integration is standard — managers see new leads instantly',
          'Click/Payme integrated — confirmed payments automatically close the deal',
          'Data from Excel/Google Sheets is migrated — no extra work to get started',
          'Mobile-first — managers run the CRM from their phone too',
          '1 month free support — questions and small edits',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How is this different from AmoCRM or Bitrix24?',
            answer:
              'AmoCRM and Bitrix24 are template CRMs. They give every business the same interface and features, with no adaptation to your specific process. And they charge per manager per month ($18+/month). A custom CRM is built around your sales pipeline, manager roles, and business logic. You pay once, there are no per-user limits, and the CRM is fully yours.',
          },
          {
            question: 'Do you migrate data from Excel or Google Sheets into the CRM?',
            answer:
              'Yes, it\'s part of the package. Customer base, leads, deals, and history — all moved to the new CRM. All you need to do is send the files. If the data is messy, we help clean it together — duplicates and stale records are removed.',
          },
          {
            question: 'Can managers work from their phones?',
            answer:
              'Yes — the CRM is built mobile-first and works fully on a phone. Managers add leads on the go, change deal stages, add tasks. Through the Telegram bot they get notified about new leads instantly and jump into the CRM to respond.',
          },
          {
            question: 'Is there a charge for extra users?',
            answer:
              'No. Unlike other CRMs, KATOV\'s custom CRM has no per-user caps or monthly fees. New manager joins — you add them through the admin panel, with no extra cost. The CRM is fully yours, running on your server or KATOV hosting.',
          },
          {
            question: 'How much does it cost and how long does it take?',
            answer:
              'A standard CRM starts at $1000 and ships in 15–30 business days. It includes: leads and pipeline, Telegram bot, tasks, reports, user roles, data migration, and training. If many modules or complex integrations are needed (1C, Sipuni IP telephony, multi-branch), the price lands at $2000–$5000. The final price is locked after the process review and stays unchanged through launch.',
          },
        ],
        ctaTitle: 'Free consultation for your CRM',
        ctaSubtitle:
          'We\'ll walk through your sales process and your managers\' needs. The consultation is free — we\'ll reach out within 1 business day.',
        ctaPrimary: 'Place order',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
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
        h1: 'Internet Do\'kon Yaratish Xizmati: Onlayn Savdoni Boshlash',
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
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
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
        ctaPrimary: 'Buyurtma berish',
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
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
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
        ctaPrimary: 'Заказать',
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
          'Individual approach to every project — a solution tailored to your business and customers',
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
        ctaPrimary: 'Place order',
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
        h1: 'Korporativ Sayt Yaratish Xizmati: Kompaniyangiz Uchun To\'liq Yechim',
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
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
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
        ctaPrimary: 'Buyurtma berish',
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
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
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
        ctaPrimary: 'Заказать',
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
          'Individual approach to every project — a solution tailored to your business and customers',
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
        ctaPrimary: 'Place order',
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
        h1: 'Landing Page Yaratish Xizmati: 5–10 Kunda Sotuvchi Sayt',
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
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
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
        ctaPrimary: 'Buyurtma berish',
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
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
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
        ctaPrimary: 'Заказать',
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
          'Individual approach to every project — a solution tailored to your business and customers',
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
        ctaPrimary: 'Place order',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
  'restoran-sayti': {
    slug: 'restoran-sayti',
    icon: 'Utensils',
    basePrice: 600,
    priceSuffix: '',
    demand: 4,
    content: {
      uz: {
        title: 'Restoran va Kafe Sayti Yaratish — Menu, QR, Buyurtma',
        metaDescription:
          'Restoran va kafe uchun sayt: QR menyu, onlayn buyurtma, Click/Payme to\'lov, stol bron qilish. 7–14 kunda tayyor. Narxi $600 dan.',
        h1: 'Restoran va Kafe Sayti Yaratish Xizmati: QR Menyu, Onlayn Buyurtma va Stol Bron Qilish',
        heroSubtitle:
          'Mijoz telefoni orqali menyuni ko\'radi, ovqat tanlaydi, Click yoki Payme bilan to\'laydi yoki stol bron qiladi — restoraningiz onlayn ham ishlaydi.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobil-first',
            description:
              'Mijozlarning 91% qarashi mobil orqali. Sayt har telefonda tez va sof ochiladi — menyu va buyurtma asosiy.',
          },
          {
            icon: 'CreditCard',
            title: 'Click va Payme onlayn',
            description:
              'O\'zbekistondagi asosiy to\'lov tizimlari ulanadi — mijoz saytdan turib to\'lab oladi, naqdsiz buyurtma standartga aylanadi.',
          },
          {
            icon: 'Sparkles',
            title: 'O\'zingiz boshqarasiz',
            description:
              'Menyu, narx va "stop-list"ni kassirning telefonidan yangilaysiz — qaytadan dasturchiga murojaat shart emas.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Restoran va kofeyniya tarmoqlari',
            description:
              'Bir nechta filiali bor restoran va kafelar uchun — yagona menyu, har filial bo\'yicha alohida buyurtma va yetkazib berish zonalari.',
          },
          {
            title: 'Yangi ochilgan kafe va restoranlar',
            description:
              'Toshkentda yangi ochilgan joy — Google va Yandex\'da topilishi va birinchi mijozlarni jalb qilishi uchun sayt birinchi qadam.',
          },
          {
            title: 'Lavash, burger, pizza nuqtalari',
            description:
              'Yetkazib berishga tayanadigan kichik nuqtalar uchun — onlayn buyurtma, Click/Payme to\'lov, kuryer jo\'natish flow\'i.',
          },
          {
            title: 'Yetkazib berish (cloud kitchen)',
            description:
              'Zali yo\'q, faqat yetkazib berish bilan ishlaydigan oshxonalar uchun — menyu, savatcha, zonalar va vaqt hisoblash.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Bosh sahifa — restoran atmosferasi, asosiy CTA va bog\'lanish',
          'Menyu sahifasi — kategoriyalar, foto, narx, tarkib va allergen ma\'lumotlari',
          'QR menyu — har stol uchun shaxsiy kod, oson skanerlanadigan',
          'Onlayn buyurtma + savatcha — yetkazib berish yoki olib ketish',
          'Click va Payme to\'lov integratsiyasi',
          'Stol bron qilish formasi — sana, vaqt va mehmonlar soni',
          'Yetkazib berish zonalari va narxni avtomatik hisoblash',
          'Telegram bot integratsiyasi — yangi buyurtma kassir telefoniga keladi',
          'Admin panel — menyu, narx va "stop-list"ni o\'zingiz yangilaysiz',
          '3 til (uz/ru/en) standart — qo\'shimcha narxsiz',
          'Google Business profil sozlash va Google Maps ulanishi',
          '1 oy bepul support va kichik o\'zgartirishlar',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '7–14 ish kuni',
        process: [
          {
            step: 1,
            title: 'Konsultatsiya va kontent yig\'ish',
            description:
              'Menyu, foto, narx va yetkazib berish zonalarini yig\'amiz. Joy yo\'q bo\'lsa, foto va menyu strukturasini birga tuzamiz.',
            duration: '1–2 kun',
          },
          {
            step: 2,
            title: 'Dizayn',
            description:
              'Bosh sahifa va menyu Figma\'da. Restoraningiz brendi va atmosferasi asosida. Ikki bosqichli revizyon kiradi.',
            duration: '3–4 kun',
          },
          {
            step: 3,
            title: 'Development va integratsiyalar',
            description:
              'Sayt, admin panel, Click/Payme to\'lov, Telegram bot, QR kod generatsiya va stol bron formasi quriladi.',
            duration: '3–5 kun',
          },
          {
            step: 4,
            title: 'Test va ishga tushirish',
            description:
              'Buyurtma va to\'lov sinab ko\'riladi, QR kodlar chop etishga tayyorlanadi, domen ulanadi va sayt rasmiy ishga tushadi.',
            duration: '1–2 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
          'Click va Payme bilan rasmiy ulanish tajribasi — to\'lov birinchi kundanoq ishlaydi',
          'Telegram bot orqali buyurtmalar kassir telefoniga sekundlarda yetib boradi',
          'Menyu va narxlarni kassirning o\'zi telefondan yangilaydi — dasturchi shart emas',
          '3 til (uz/ru/en) standart — Toshkent bozori va mehmonlar uchun bir vaqtda',
          'Sayt tezkor ochiladi va Google\'da yaxshi pozitsiya oladi — texnik SEO bazasi bilan',
          '1 oy bepul support — birinchi mijozlardan keladigan savollarda yordam',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Click va Payme to\'lov tizimlarini saytga ulaysizmi?',
            answer:
              'Ha, ikkalasi ham standart paketga kiradi. Click va Payme rasmiy integratsiyasi sayt ishga tushishi bilan ishlaydi — mijoz saytda buyurtma berib, Click yoki Payme tugmasi bilan to\'laydi, pul to\'g\'ridan-to\'g\'ri sizning hisobingizga keladi. Uzum to\'lov yoki naqd opsiyasi ham qo\'shilishi mumkin.',
          },
          {
            question: 'QR menyu qanday ishlaydi va mijoz uni qanday ochadi?',
            answer:
              'Har stol uchun alohida QR kod chop etiladi (yoki menyu uchun yagona kod). Mijoz telefon kamerasi bilan skanerlaydi va saytning menyu sahifasi to\'g\'ridan-to\'g\'ri ochiladi — ilova yuklash shart emas. Buyurtma o\'sha yerdan beriladi va kassirga keladi. Kod yo\'qolsa yoki menyu o\'zgarsa, yangisini admin panel orqali bir tugma bilan generatsiya qilasiz.',
          },
          {
            question: 'Menyu va narxlarni o\'zim yangilashim mumkinmi?',
            answer:
              'Ha, bu sahifaning asosiy g\'oyasi. Admin panelga kirib taom qo\'shasiz, narxni o\'zgartirasiz, "stop-list"ka tushirasiz (bugun tugagan bo\'lsa) yoki yangi kategoriya qo\'shasiz — hammasi telefondan, kod yozmasdan. Bu kassir yoki menejer ishi, dasturchi kerak emas.',
          },
          {
            question: 'Stol bron qilish funksiyasi qanday ishlaydi?',
            answer:
              'Saytda alohida forma — sana, vaqt, mehmonlar soni va telefon raqami. Mijoz formani to\'ldiradi, bron Telegram orqali sizning kassir yoki menejeringizga keladi. Tasdiqlasangiz, mijozga SMS yoki Telegram orqali tasdiq yuboriladi. Kerak bo\'lsa, ish vaqti va stol soni asosida avtomatik bron qabul qilish ham sozlanadi.',
          },
          {
            question: 'Sayt necha kunda tayyor bo\'ladi va boshlanish narxi qancha?',
            answer:
              'Standart paket $600 dan boshlanadi va 7–14 ish kunida tayyor bo\'ladi. Bunga: sayt (bosh sahifa va menyu), QR menyu, onlayn buyurtma, Click/Payme to\'lov, stol bron qilish, admin panel va 3 til kiradi. Yetkazib berish zonalari, Telegram bot kengaytmalari yoki ko\'p filial uchun narx $800–$1200 oralig\'iga ko\'tariladi. Aniq narx konsultatsiyada belgilanadi va loyiha davomida o\'zgarmaydi.',
          },
        ],
        ctaTitle: 'Restoran sayti uchun bepul konsultatsiya',
        ctaSubtitle:
          'Restoraningizning ehtiyojlari va menyu strukturasini birga ko\'rib chiqamiz. Konsultatsiya bepul, 1 ish kuni ichida bog\'lanamiz.',
        ctaPrimary: 'Buyurtma berish',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Сайт для Ресторана и Кафе — Меню, QR, Онлайн-заказ',
        metaDescription:
          'Сайт для ресторана и кафе: QR-меню, онлайн-заказы, оплата Click/Payme, бронь столиков. Запуск за 7–14 дней. От $600.',
        h1: 'Сайт для Ресторана и Кафе: QR-меню, Онлайн-заказы и Бронирование Столиков',
        heroSubtitle:
          'Клиент смотрит меню в телефоне, выбирает блюда, оплачивает Click или Payme, бронирует столик — ваш ресторан работает онлайн.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobile-first',
            description:
              '91% клиентов смотрят меню с телефона. Сайт открывается быстро на любом устройстве — меню и заказ всегда под рукой.',
          },
          {
            icon: 'CreditCard',
            title: 'Click и Payme онлайн',
            description:
              'Основные платёжные системы Узбекистана подключены — клиент оплачивает прямо на сайте, бесконтактный заказ становится стандартом.',
          },
          {
            icon: 'Sparkles',
            title: 'Управляете сами',
            description:
              'Меню, цены и «стоп-лист» обновляете с телефона кассира — без обращения к разработчику.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Сети ресторанов и кофеен',
            description:
              'Для ресторанов и кафе с несколькими филиалами — единое меню, заказы и зоны доставки отдельно по каждой точке.',
          },
          {
            title: 'Новые кафе и рестораны',
            description:
              'Новое заведение в Ташкенте — сайт нужен, чтобы появиться в Google и Yandex и привлечь первых клиентов.',
          },
          {
            title: 'Точки лаваш, бургер, пицца',
            description:
              'Малые точки, ориентированные на доставку — онлайн-заказ, оплата Click/Payme, флоу отправки курьера.',
          },
          {
            title: 'Доставка (cloud kitchen)',
            description:
              'Кухни без зала, работающие только на доставку — меню, корзина, зоны и расчёт времени.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Главная страница — атмосфера ресторана, основной CTA и контакты',
          'Страница меню — категории, фото, цены, состав и аллергены',
          'QR-меню — индивидуальный код на каждый столик, удобное сканирование',
          'Онлайн-заказ + корзина — доставка или самовывоз',
          'Интеграция оплаты Click и Payme',
          'Форма бронирования столика — дата, время, количество гостей',
          'Зоны доставки и автоматический расчёт стоимости',
          'Интеграция Telegram-бота — новый заказ приходит на телефон кассиру',
          'Админ-панель — меню, цены и «стоп-лист» обновляете сами',
          '3 языка (uz/ru/en) стандартно — без доплаты',
          'Настройка Google Business профиля и подключение к Google Maps',
          'Бесплатная поддержка 1 месяц и небольшие правки',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '7–14 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Консультация и сбор контента',
            description:
              'Собираем меню, фото, цены и зоны доставки. Если нет своих — структуру меню и съёмку планируем вместе.',
            duration: '1–2 дня',
          },
          {
            step: 2,
            title: 'Дизайн',
            description:
              'Главная и меню в Figma — на основе бренда и атмосферы ресторана. Включены две правки.',
            duration: '3–4 дня',
          },
          {
            step: 3,
            title: 'Разработка и интеграции',
            description:
              'Сайт, админ-панель, Click/Payme, Telegram-бот, генерация QR-кодов и форма брони столика.',
            duration: '3–5 дней',
          },
          {
            step: 4,
            title: 'Тест и запуск',
            description:
              'Тестируем заказ и оплату, готовим QR-коды к печати, подключаем домен и официально запускаем сайт.',
            duration: '1–2 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
          'Опыт официальных интеграций Click и Payme — оплата работает с первого дня',
          'Заказы приходят в Telegram кассиру за секунды',
          'Меню и цены обновляет сам кассир с телефона — разработчик не нужен',
          '3 языка (uz/ru/en) стандартно — для рынка Ташкента и гостей сразу',
          'Сайт быстро открывается и хорошо позиционируется в Google — техническая SEO-база',
          'Бесплатная поддержка 1 месяц — помогаем с первыми вопросами клиентов',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Подключаете ли Click и Payme к сайту?',
            answer:
              'Да, обе системы входят в стандартный пакет. Официальная интеграция Click и Payme работает сразу после запуска — клиент оформляет заказ на сайте и оплачивает кнопкой Click или Payme, деньги поступают напрямую на ваш счёт. По запросу можно добавить Uzum и оплату наличными при получении.',
          },
          {
            question: 'Как работает QR-меню и как клиент его открывает?',
            answer:
              'На каждый столик печатается отдельный QR-код (или один общий код на меню). Клиент сканирует камерой телефона — открывается страница меню сайта, никакое приложение ставить не нужно. Заказ оформляется тут же и приходит кассиру. Если код потерялся или меню обновилось, новый код генерируется в админ-панели одной кнопкой.',
          },
          {
            question: 'Могу ли я сам обновлять меню и цены?',
            answer:
              'Да, это ключевая идея сайта. В админ-панели вы добавляете блюда, меняете цены, переводите позиции в «стоп-лист» (если на сегодня закончилось), добавляете категории — всё с телефона, без кода. Это работа кассира или менеджера, разработчик не нужен.',
          },
          {
            question: 'Как работает бронь столика?',
            answer:
              'На сайте — отдельная форма: дата, время, количество гостей и телефон. Заявка приходит в Telegram кассиру или менеджеру. После подтверждения клиенту уходит SMS или сообщение в Telegram. По запросу настраивается автоматическое принятие брони по графику работы и количеству столов.',
          },
          {
            question: 'За сколько дней готов сайт и сколько это стоит?',
            answer:
              'Стандартный пакет — от $600, готов за 7–14 рабочих дней. Включено: сайт (главная и меню), QR-меню, онлайн-заказ, оплата Click/Payme, бронь столика, админ-панель и 3 языка. Зоны доставки, расширения Telegram-бота или мультифилиальная версия — $800–$1200. Финальная цена фиксируется на консультации и не меняется до запуска.',
          },
        ],
        ctaTitle: 'Бесплатная консультация по сайту ресторана',
        ctaSubtitle:
          'Разберём задачи вашего ресторана и структуру меню. Консультация бесплатная — свяжемся в течение 1 рабочего дня.',
        ctaPrimary: 'Заказать',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Restaurant & Cafe Website — Menu, QR, Online Ordering',
        metaDescription:
          'Restaurant and cafe website with QR menu, online ordering, Click/Payme checkout, table booking. Launches in 7–14 days. From $600.',
        h1: 'Restaurant & Cafe Website: QR Menu, Online Ordering and Table Booking',
        heroSubtitle:
          'Customers browse the menu on their phone, place an order, pay via Click or Payme, or book a table — your restaurant works online.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobile-first',
            description:
              '91% of customers browse menus on their phone. The site loads fast on any device — menu and ordering always within reach.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme online',
            description:
              'Uzbekistan\'s main payment systems are wired in — customers pay right on the site, making cashless orders the default.',
          },
          {
            icon: 'Sparkles',
            title: 'You stay in control',
            description:
              'Update the menu, prices, and stop-list from the cashier\'s phone — no need to come back to the developer.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Restaurant & coffee chains',
            description:
              'For multi-location restaurants and cafes — shared menu, separate ordering and delivery zones per branch.',
          },
          {
            title: 'New cafes and restaurants',
            description:
              'A newly opened place in Tashkent — a site is the first step to showing up in Google and Yandex and pulling in first customers.',
          },
          {
            title: 'Lavash, burger, pizza spots',
            description:
              'Small delivery-driven spots — online ordering, Click/Payme checkout, and a courier dispatch flow.',
          },
          {
            title: 'Delivery (cloud kitchen)',
            description:
              'Kitchens without a dining room, running delivery only — menu, cart, zones, and time estimates.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Home page — restaurant atmosphere, main CTA, and contacts',
          'Menu page — categories, photos, prices, ingredients, and allergens',
          'QR menu — unique code per table, easy to scan',
          'Online ordering + cart — delivery or pickup',
          'Click and Payme payment integration',
          'Table booking form — date, time, party size',
          'Delivery zones with automatic fee calculation',
          'Telegram bot integration — new orders reach the cashier\'s phone',
          'Admin panel — update menu, prices, and stop-list yourself',
          '3 languages (uz/ru/en) standard — no extra cost',
          'Google Business profile setup and Google Maps connection',
          '1 month free support and small edits',
        ],
        processTitle: 'Process',
        processTotalDuration: '7–14 business days',
        process: [
          {
            step: 1,
            title: 'Consultation and content',
            description:
              'We collect the menu, photos, prices, and delivery zones. If you don\'t have them, we plan the menu structure and shoot together.',
            duration: '1–2 days',
          },
          {
            step: 2,
            title: 'Design',
            description:
              'Home and menu in Figma — based on your restaurant\'s brand and atmosphere. Two rounds of revisions included.',
            duration: '3–4 days',
          },
          {
            step: 3,
            title: 'Development & integrations',
            description:
              'Site, admin panel, Click/Payme, Telegram bot, QR code generation, and table booking form.',
            duration: '3–5 days',
          },
          {
            step: 4,
            title: 'Test and launch',
            description:
              'We test ordering and payment, prepare QR codes for printing, connect the domain, and officially go live.',
            duration: '1–2 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Individual approach to every project — a solution tailored to your business and customers',
          'Hands-on experience with official Click and Payme integration — payments work from day one',
          'New orders reach the cashier in Telegram within seconds',
          'Menu and prices updated by the cashier from their phone — no developer needed',
          '3 languages (uz/ru/en) standard — Tashkent market and international guests at once',
          'Site loads fast and ranks well on Google — technical SEO foundation included',
          '1 month free support — we help with questions from your first customers',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'Do you integrate Click and Payme into the site?',
            answer:
              'Yes, both come in the standard package. Official Click and Payme integration works the day the site launches — the customer places an order on the site and pays with the Click or Payme button, with funds going straight to your account. Uzum payment or cash-on-delivery can be added on request.',
          },
          {
            question: 'How does the QR menu work and how does the customer open it?',
            answer:
              'Each table gets its own printed QR code (or one shared menu code). The customer scans it with their phone camera and the menu page opens directly — no app to install. Orders are placed right there and reach the cashier. If a code is lost or the menu changes, you generate a new one from the admin panel with a single click.',
          },
          {
            question: 'Can I update the menu and prices myself?',
            answer:
              'Yes — that\'s the whole point of the site. In the admin panel you add dishes, change prices, move items to the stop-list (if you\'ve run out for the day), and add new categories — all from your phone, with no code. It\'s the cashier\'s or manager\'s job, no developer required.',
          },
          {
            question: 'How does table booking work?',
            answer:
              'A dedicated form on the site: date, time, party size, and phone number. The booking lands in Telegram for the cashier or manager. Once confirmed, the customer gets an SMS or Telegram confirmation. On request, we can set up automatic acceptance based on opening hours and available tables.',
          },
          {
            question: 'How long does it take and how much does it cost?',
            answer:
              'The standard package starts at $600 and is delivered in 7–14 business days. It includes the site (home and menu), QR menu, online ordering, Click/Payme payments, table booking, admin panel, and 3 languages. Delivery zones, Telegram bot extensions, or multi-location versions land at $800–$1200. The final price is locked during the consultation and stays unchanged through launch.',
          },
        ],
        ctaTitle: 'Free consultation for your restaurant website',
        ctaSubtitle:
          'We\'ll walk through your restaurant\'s needs and menu structure together. The consultation is free — we\'ll reach out within 1 business day.',
        ctaPrimary: 'Place order',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
  'sayt-redesign': {
    slug: 'sayt-redesign',
    icon: 'RefreshCw',
    basePrice: 500,
    priceSuffix: '',
    demand: 4,
    content: {
      uz: {
        title: 'Sayt Redesign — Eski Saytni Yangilash Xizmati | KATOV',
        metaDescription:
          'Eski saytni qayta quramiz: mobile-first, tez ochiladigan, Google\'da pozitsiya saqlangan. 301 redirect bilan SEO yo\'qolmaydi. 7–14 kun, $500 dan.',
        h1: 'Sayt Redesign Xizmati: Eski Saytni Tezkor, Mobile va Google\'ga Mos Qayta Quramiz',
        heroSubtitle:
          'Eski saytingiz sekin ochilsa, mobilda buziladi yoki Google\'da pasaygan bo\'lsa — biz 7–14 kunda zamonaviy ko\'rinishga keltirib, tez ochiladigan va qidiruv tizimlariga mos sayt qaytarib beramiz.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobile-first qayta qurish',
            description:
              'Sayt har telefonda — kichik, o\'rta yoki katta — buzilmasdan ochiladi. Foydalanuvchilarning 91%i mobil orqali keladi, bu standartga aylantiriladi.',
          },
          {
            icon: 'Zap',
            title: 'Tezlik va SEO qaytariladi',
            description:
              'Sayt soniyalarda ochiladi, rasm va shriftlar optimallashtiriladi. Google qaytadan indekslaydi va pasaygan pozitsiyalar tiklanish imkoniyatini oladi.',
          },
          {
            icon: 'Sparkles',
            title: 'Kontentni o\'zingiz boshqarasiz',
            description:
              'Yangi admin panel ulab beriladi (oldin yo\'q bo\'lsa). Matn, rasm va sahifalarni telefondan yangilaysiz — dasturchi shart emas.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: '3–5 yil oldin yaratilgan biznes saytlari',
            description:
              'Sayt eski ko\'rinishda, mobilga moslashmagan yoki kontentni yangilab bo\'lmaydigan holatda — to\'liq qayta quramiz, lekin domen va eski URL\'lar saqlanadi.',
          },
          {
            title: 'Google\'da pozitsiyasi pasaygan saytlar',
            description:
              'Avval yaxshi ranking bo\'lgan, lekin so\'nggi yillarda pasaygan saytlar uchun — texnik SEO va kontent strukturasi yangilanadi, 301 redirect bilan trafik saqlanadi.',
          },
          {
            title: 'Boshqa studiya yoki freelancer qurgan saytlar',
            description:
              'Asl ishlab chiquvchi bog\'lanmaydigan yoki saytni yangilash imkonsiz bo\'lgan holatlar — kod yangidan yoziladi va sayt to\'liq KATOV qo\'l ostiga o\'tadi.',
          },
          {
            title: 'WordPress, Tilda yoki shablon saytlar',
            description:
              'Tezligi past, qo\'shimcha plaginlar bilan og\'ir bo\'lgan saytlar — yengil va tezkor sayt qaytarib quramiz, ortiqcha narsalarsiz.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Joriy sayt texnik va SEO auditi — muammolar ro\'yxati va prioritet',
          'Yangi dizayn Figma\'da — brendingiz saqlanadi, vizual zamonaviy bo\'ladi',
          'To\'liq qayta qurish — kod yangidan yoziladi, eski sayt mirosi qoldirilmaydi',
          'Mavjud kontent migratsiyasi (matn, rasm, sahifalar) — yo\'qotmaslik kafolati',
          'Mobile-first responsive — telefon, planshet va kompyuterda bir xil mos',
          'Tezlik optimallashtirish — rasm, shrift va loading qayta qurilgan',
          'SEO o\'tkazish + eski URL\'larga 301 redirect — Google pozitsiyalari saqlanadi',
          'Admin panel ulab beriladi — kontentni o\'zingiz yangilaysiz',
          '3 til (uz/ru/en) — agar oldin yo\'q bo\'lgan bo\'lsa qo\'shiladi',
          '1 oy bepul support va kichik o\'zgartirishlar',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '7–14 ish kuni',
        process: [
          {
            step: 1,
            title: 'Audit va strategiya',
            description:
              'Joriy saytingizni texnik, SEO va UX nuqtai nazardan tahlil qilamiz — nima saqlanadi, nima o\'zgaradi va qaysi URL\'lar redirect bo\'ladi.',
            duration: '1–2 kun',
          },
          {
            step: 2,
            title: 'Dizayn',
            description:
              'Bosh sahifa va asosiy ichki sahifalar Figma\'da — brendingiz saqlangan holda zamonaviy ko\'rinish. Ikki bosqichli revizyon kiradi.',
            duration: '3–4 kun',
          },
          {
            step: 3,
            title: 'Development va kontent migratsiyasi',
            description:
              'Yangi kod yoziladi, eski saytdan kontent (matn, rasm, sahifalar) ko\'chiriladi. Kerak bo\'lsa admin panel, Click/Payme yoki Telegram bot ulab beriladi.',
            duration: '3–6 kun',
          },
          {
            step: 4,
            title: '301 redirect, test va ishga tushirish',
            description:
              'Eski URL\'lar yangi sahifalarga 301 redirect bilan ulanadi (SEO yo\'qotilmaydi), to\'liq test o\'tkaziladi va sayt ishga tushadi.',
            duration: '1–2 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
          '301 redirect strategiyasi bilan eski Google pozitsiyalari saqlanadi — trafikingiz yo\'qolmaydi',
          'Kod yangidan yoziladi — eski texnik qarz va xavfsizlik bo\'shliqlari yo\'qotiladi',
          'Mobilga to\'liq moslashtirish standart — har telefonda saytingiz buzilmasdan ochiladi',
          'Eski kontentni biz ko\'chiramiz — siz uchun qo\'shimcha ish yo\'q',
          '3 til (uz/ru/en) standart — agar oldin yo\'q bo\'lgan bo\'lsa, paket tarkibida qo\'shiladi',
          'Click/Payme va Telegram bot redesign jarayonida ulab beriladi — kerak bo\'lsa',
          '1 oy bepul support — ishga tushgandan keyin keladigan savollar va kichik o\'zgartirishlar',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Eski saytdagi Google pozitsiyalarini yo\'qotmaymanmi?',
            answer:
              'Yo\'q, agar 301 redirect to\'g\'ri sozlansa. Biz audit bosqichida har bir eski URL\'ni ro\'yxatga olamiz va yangi sahifaga mos keladigan 301 redirect quramiz. Google bir necha hafta ichida yangi sahifalarni eski rankingda qaytadan indekslaydi. Backlink\'lar ham yo\'qolmaydi, chunki ular eski URL orqali yangi sahifaga o\'tadi.',
          },
          {
            question: 'Eski saytdan kontentni o\'zim ko\'chirishim kerakmi?',
            answer:
              'Yo\'q, biz qilamiz — bu paket tarkibida. Matn, rasm, sahifalar, blog postlari — barchasi yangi saytga ko\'chiriladi. Sizdan faqat saytga kirish (admin yoki FTP) yoki kontentni bizga jo\'natish kerak bo\'ladi. Agar kontent yangilanishi kerak bo\'lsa, qaysi qism o\'zgarishi haqida birga kelishamiz.',
          },
          {
            question: 'Domen va hosting o\'zgaradimi?',
            answer:
              'Domen o\'sha qoladi — saytingiz manzili o\'zgarmaydi. Hostingga kelsak, joriy hosting yetarli bo\'lsa o\'sha yerda qoladi yoki KATOV hostingiga o\'tkazamiz (alohida xizmat, $50/oy dan). Tavsiya odatda o\'tkazishga beriladi, chunki redesign qilingan sayt KATOV hostingida tezroq ishlaydi.',
          },
          {
            question: 'Eski sayt qaysi platformada qurilgan bo\'lsa ham qabul qilasizmi?',
            answer:
              'Ha — WordPress, Tilda, Wix, Bitrix, custom kod yoki boshqa har qanday platforma. Redesign\'da biz eski platformani saqlamaymiz: kod yangidan yoziladi va sayt to\'liq KATOV qo\'l ostiga o\'tadi. Bu eski platformadagi cheklovlar, xavfsizlik bo\'shliqlari va sekinlik muammolarini bir vaqtning o\'zida hal qiladi.',
          },
          {
            question: 'Redesign muddati va boshlanish narxi qancha?',
            answer:
              'Standart redesign $500 dan boshlanadi va 7–14 ish kunida tayyor bo\'ladi. Bunga: audit, yangi dizayn, to\'liq qayta qurish, mavjud kontent migratsiyasi, mobile-first, 301 redirect va admin panel kiradi. Sahifa soni ko\'p bo\'lsa yoki e-commerce/CRM integratsiyalari kerak bo\'lsa narx $800–$1500 oralig\'iga ko\'tariladi. Aniq narx audit oxirida belgilanadi va loyiha davomida o\'zgarmaydi.',
          },
        ],
        ctaTitle: 'Sayt redesign uchun bepul konsultatsiya',
        ctaSubtitle:
          'Joriy saytingizni birga ko\'rib chiqamiz va nimani yangilash kerakligini aniqlaymiz. Konsultatsiya bepul, 1 ish kuni ichida bog\'lanamiz.',
        ctaPrimary: 'Buyurtma berish',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Редизайн Сайта — Модернизация и Обновление | KATOV',
        metaDescription:
          'Перестраиваем старый сайт: mobile-first, быстрая загрузка, позиции в Google сохраняются. 301-редиректы защищают SEO. 7–14 дней, от $500.',
        h1: 'Редизайн Сайта: Перестраиваем Старый Сайт под Mobile, Скорость и Google',
        heroSubtitle:
          'Если ваш сайт медленно открывается, ломается на мобильных или потерял позиции в Google — за 7–14 дней мы возвращаем его в современный вид: быстрый и оптимизированный под поисковые системы.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobile-first перестройка',
            description:
              'Сайт открывается без поломок на любом телефоне — маленьком, среднем или большом. 91% пользователей приходят с мобильного, и это становится стандартом.',
          },
          {
            icon: 'Zap',
            title: 'Скорость и SEO восстанавливаются',
            description:
              'Сайт открывается за секунды, изображения и шрифты оптимизированы. Google переиндексирует страницы, и потерянные позиции получают шанс на восстановление.',
          },
          {
            icon: 'Sparkles',
            title: 'Управляете контентом сами',
            description:
              'Подключаем новую админ-панель (если её не было). Тексты, изображения и страницы обновляете с телефона — без разработчика.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Бизнес-сайты возрастом 3–5 лет',
            description:
              'Сайт выглядит устаревшим, не адаптирован под мобильные или контент невозможно обновлять — перестраиваем полностью, но домен и старые URL сохраняются.',
          },
          {
            title: 'Сайты с упавшими позициями в Google',
            description:
              'Раньше ранжировались хорошо, но в последние годы позиции упали — обновляем техническую SEO-базу и структуру контента, трафик сохраняется через 301-редиректы.',
          },
          {
            title: 'Сайты других студий или фрилансеров',
            description:
              'Когда исходного разработчика не найти или обновлять сайт стало невозможно — пишем код заново, и сайт полностью переходит под управление KATOV.',
          },
          {
            title: 'WordPress, Tilda или шаблонные сайты',
            description:
              'Медленные, перегруженные плагинами сайты — перестраиваем на собственном коде, без лишнего, остаётся лёгкий и быстрый сайт.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Технический и SEO-аудит текущего сайта — список проблем и приоритеты',
          'Новый дизайн в Figma — бренд сохраняется, визуал становится современным',
          'Полная перестройка — код пишется заново, наследие старого сайта не остаётся',
          'Миграция существующего контента (тексты, изображения, страницы) — гарантия сохранности',
          'Mobile-first адаптация — телефон, планшет и компьютер одинаково хорошо',
          'Оптимизация скорости — изображения, шрифты и загрузка переделаны',
          'Перенос SEO + 301-редиректы со старых URL — позиции в Google сохраняются',
          'Подключение админ-панели — контент обновляете сами',
          '3 языка (uz/ru/en) — если раньше не было, добавляем',
          'Бесплатная поддержка 1 месяц и небольшие правки',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '7–14 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Аудит и стратегия',
            description:
              'Анализируем сайт по техническим, SEO и UX-критериям — что сохраняем, что меняем и какие URL уйдут в редирект.',
            duration: '1–2 дня',
          },
          {
            step: 2,
            title: 'Дизайн',
            description:
              'Главная и основные внутренние страницы в Figma — современный вид с сохранением бренда. Две правки включены.',
            duration: '3–4 дня',
          },
          {
            step: 3,
            title: 'Разработка и миграция контента',
            description:
              'Пишем код заново, переносим контент (тексты, изображения, страницы). По необходимости подключаем админ-панель, Click/Payme или Telegram-бот.',
            duration: '3–6 дней',
          },
          {
            step: 4,
            title: '301-редиректы, тест и запуск',
            description:
              'Старые URL связываем 301-редиректами с новыми страницами (SEO не теряется), проводим полный тест и запускаем сайт.',
            duration: '1–2 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
          'Стратегия 301-редиректов сохраняет старые позиции в Google — трафик не теряется',
          'Код пишется заново — старый технический долг и уязвимости убираются',
          'Полная mobile-first адаптация стандартно — сайт открывается без поломок на любом телефоне',
          'Контент мигрируем мы — никакой дополнительной работы с вашей стороны',
          '3 языка (uz/ru/en) стандартно — если раньше не было, добавляем в рамках пакета',
          'Click/Payme и Telegram-бот подключаем при редизайне — если нужно',
          'Бесплатная поддержка 1 месяц — вопросы и небольшие правки после запуска',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Не потеряю ли я позиции старого сайта в Google?',
            answer:
              'Нет, если 301-редиректы настроены правильно. На этапе аудита мы составляем карту всех старых URL и связываем каждый с соответствующей новой страницей через 301-редирект. Google в течение нескольких недель переиндексирует страницы и сохраняет прежний ранкинг. Бэклинки тоже не теряются — они через старый URL ведут на новую страницу.',
          },
          {
            question: 'Контент я переношу сам или это делаете вы?',
            answer:
              'Переносим мы — это входит в пакет. Тексты, изображения, страницы, посты блога — всё переносится на новый сайт. От вас — доступ к сайту (админка или FTP) или передача контента нам. Если контент требует обновления, обсуждаем заранее, что изменится.',
          },
          {
            question: 'Меняется ли домен и хостинг?',
            answer:
              'Домен остаётся прежним — адрес сайта не меняется. По хостингу: если текущий тянет — оставляем; если нет — переносим на хостинг KATOV (отдельная услуга, от $50/мес). Обычно рекомендуем перенос: на хостинге KATOV редизайн-сайт работает быстрее.',
          },
          {
            question: 'Принимаете ли вы сайт на любой платформе?',
            answer:
              'Да — WordPress, Tilda, Wix, Bitrix, собственный код или любая другая платформа. При редизайне старую платформу не сохраняем: пишем код заново и сайт полностью переходит под управление KATOV. Это сразу убирает ограничения старой платформы, уязвимости и проблемы со скоростью.',
          },
          {
            question: 'Сколько занимает редизайн и сколько стоит?',
            answer:
              'Стандартный редизайн от $500, готов за 7–14 рабочих дней. Включает: аудит, новый дизайн, полную перестройку, миграцию контента, mobile-first, 301-редиректы и админ-панель. Если страниц много или нужны интеграции e-commerce/CRM — $800–$1500. Финальная цена фиксируется после аудита и не меняется до запуска.',
          },
        ],
        ctaTitle: 'Бесплатная консультация по редизайну',
        ctaSubtitle:
          'Разберём ваш текущий сайт вместе и определим, что обновить. Консультация бесплатная — свяжемся в течение 1 рабочего дня.',
        ctaPrimary: 'Заказать',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Website Redesign — Modernization Service | KATOV',
        metaDescription:
          'Rebuild a legacy site: mobile-first, fast loading, Google rankings preserved. 301 redirects protect SEO. 7–14 days, from $500.',
        h1: 'Website Redesign: Rebuild Legacy Sites for Mobile, Speed and Google',
        heroSubtitle:
          'If your site loads slowly, breaks on mobile, or has lost Google rankings — in 7–14 days we rebuild it into a modern, fast-loading site optimized for search engines.',
        benefits: [
          {
            icon: 'Smartphone',
            title: 'Mobile-first rebuild',
            description:
              'The site opens flawlessly on any phone — small, mid, or large. 91% of users arrive on mobile, and that becomes the default.',
          },
          {
            icon: 'Zap',
            title: 'Speed and SEO restored',
            description:
              'Pages load in seconds, images and fonts are optimized. Google re-indexes and lost rankings get a chance to recover.',
          },
          {
            icon: 'Sparkles',
            title: 'You manage the content',
            description:
              'A new admin panel is connected (if there wasn\'t one). Update texts, images, and pages from your phone — no developer needed.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Business sites built 3–5 years ago',
            description:
              'The site looks outdated, isn\'t mobile-friendly, or the content can\'t be updated — we rebuild it fully while keeping the domain and old URLs.',
          },
          {
            title: 'Sites with dropped Google rankings',
            description:
              'Used to rank well but slipped in recent years — we refresh the technical SEO foundation and content structure, with 301 redirects to keep traffic.',
          },
          {
            title: 'Sites built by other studios or freelancers',
            description:
              'When the original developer is unreachable or the site can\'t be updated — we rewrite the code, and the site moves fully under KATOV.',
          },
          {
            title: 'WordPress, Tilda or template sites',
            description:
              'Slow, plugin-heavy sites — we rebuild on custom code, dropping the bloat, leaving a light and fast site.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Technical and SEO audit of the current site — issues and priorities',
          'New design in Figma — brand kept, visual modernized',
          'Full rebuild — code is rewritten, no legacy carried over',
          'Migration of existing content (text, images, pages) — nothing is lost',
          'Mobile-first responsive — phone, tablet, and desktop equally',
          'Speed optimization — images, fonts, and loading reworked',
          'SEO transfer + 301 redirects from old URLs — Google rankings preserved',
          'Admin panel connected — you update content yourself',
          '3 languages (uz/ru/en) — added if not there before',
          '1 month free support and small edits',
        ],
        processTitle: 'Process',
        processTotalDuration: '7–14 business days',
        process: [
          {
            step: 1,
            title: 'Audit and strategy',
            description:
              'We analyze your current site on technical, SEO, and UX dimensions — what stays, what changes, and which URLs need to redirect.',
            duration: '1–2 days',
          },
          {
            step: 2,
            title: 'Design',
            description:
              'Home and main inner pages in Figma — modern look while keeping your brand. Two rounds of revisions included.',
            duration: '3–4 days',
          },
          {
            step: 3,
            title: 'Development and content migration',
            description:
              'New code is written, content is moved over (text, images, pages). If needed, we connect an admin panel, Click/Payme, or Telegram bot.',
            duration: '3–6 days',
          },
          {
            step: 4,
            title: '301 redirects, test and launch',
            description:
              'Old URLs are mapped to new pages via 301 redirects (no SEO lost), full testing is done, and the site goes live.',
            duration: '1–2 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Individual approach to every project — a solution tailored to your business and customers',
          '301 redirect strategy preserves old Google rankings — your traffic doesn\'t disappear',
          'Code is rewritten — old technical debt and security gaps are removed',
          'Full mobile-first adaptation is standard — the site opens flawlessly on any phone',
          'We handle the content migration — no extra work on your side',
          '3 languages (uz/ru/en) standard — added in the package if not there before',
          'Click/Payme and Telegram bot connected during redesign — if needed',
          '1 month free support — questions and small edits after launch',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'Will I lose my old Google rankings?',
            answer:
              'No — if 301 redirects are set up correctly. During the audit we map every old URL and link it to the matching new page via a 301 redirect. Google re-indexes pages within a few weeks and the previous ranking is preserved. Backlinks aren\'t lost either — they flow through the old URL to the new page.',
          },
          {
            question: 'Do I migrate the content myself or do you?',
            answer:
              'We do — it\'s part of the package. Text, images, pages, blog posts — everything is moved to the new site. All you need to provide is access to the site (admin or FTP) or send us the content. If anything needs rewriting, we agree what changes upfront.',
          },
          {
            question: 'Does the domain or hosting change?',
            answer:
              'The domain stays the same — your address doesn\'t change. For hosting: if your current one is sufficient, it stays; if not, we move it to KATOV hosting (a separate service, from $50/month). We usually recommend the move — redesigned sites run faster on KATOV hosting.',
          },
          {
            question: 'Do you accept sites on any platform?',
            answer:
              'Yes — WordPress, Tilda, Wix, Bitrix, custom code, or any other platform. With a redesign we don\'t keep the old platform: code is rewritten and the site moves fully under KATOV. This removes the old platform\'s limits, security gaps, and speed issues in one go.',
          },
          {
            question: 'How long does redesign take and how much does it cost?',
            answer:
              'A standard redesign starts at $500 and ships in 7–14 business days. It includes: audit, new design, full rebuild, content migration, mobile-first, 301 redirects, and an admin panel. If page count is large or e-commerce/CRM integrations are needed, the price lands at $800–$1500. The final price is locked after the audit and stays unchanged through launch.',
          },
        ],
        ctaTitle: 'Free consultation for your redesign',
        ctaSubtitle:
          'We\'ll review your current site together and pin down what to update. The consultation is free — we\'ll reach out within 1 business day.',
        ctaPrimary: 'Place order',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
  'seo-xizmati': {
    slug: 'seo-xizmati',
    icon: 'Search',
    basePrice: 300,
    priceSuffix: '/oy',
    demand: 4,
    content: {
      uz: {
        title: 'SEO Xizmati — Saytni Google TOP-ga Chiqarish',
        metaDescription:
          'SEO xizmati Toshkentda — texnik audit, kalit so\'zlar, kontent va backlink. $300/oy dan, oylik hisobot. KATOV bloggi Google\'da #2 — real dalil.',
        h1: 'SEO Xizmati: Organik Trafik va Pozitsiyalarni Oshirish',
        heroSubtitle:
          'Texnik audit, kalit so\'zlar, kontent va backlink — to\'liq SEO paket. KATOV o\'z bloggi hozir Google qidiruvida 2-o\'rinda — bu va\'da emas, real dalil.',
        benefits: [
          {
            icon: 'Search',
            title: 'Texnik audit',
            description:
              'Saytingizdagi har bir SEO muammoni topib tuzatamiz — bo\'sh sahifa, sekin yuklanish, noto\'g\'ri struktura.',
          },
          {
            icon: 'BarChart3',
            title: 'Organik trafik',
            description:
              'Reklamasiz mijoz topish — Google\'dan bepul o\'sib boruvchi trafik bilan.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Shaffof hisobot',
            description:
              'Har oy raqamlar bilan ko\'rsatamiz — pozitsiyalar, trafik o\'sishi, real natija.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Internet do\'konlar',
            description:
              'Mahsulot kartochkalari Google\'da ko\'rinmasa — sotuv yo\'qoladi. SEO orqali har sahifa o\'z mijozini topadi.',
          },
          {
            title: 'Xizmat ko\'rsatuvchi biznes',
            description:
              'Stomatologiya, advokat, ko\'chmas mulk — lokal qidiruvda yuqorida bo\'lish kerak. "Toshkentda X xizmati" so\'rovida sizni topishadi.',
          },
          {
            title: 'B2B va korporativ',
            description:
              'Uzun sotuv yo\'li biznesi — qaror qabul qiluvchilar Google\'dan boshlaydi. SEO sizni qidiruvda topib oladi.',
          },
          {
            title: 'Blog va kontent loyihalar',
            description:
              'Onlayn kursdan tortib mediagacha — kontent Google\'da rank bo\'lsa, reklamasiz auditoriya o\'sadi.',
          },
        ],
        deliverablesTitle: 'SEO paketga nima kiradi',
        deliverables: [
          'To\'liq SEO audit — texnik, kontent va backlink tahlili',
          'Kalit so\'zlar tadqiqoti — uz/ru/en, lokal qidiruvga moslashtirilgan',
          'Texnik SEO tuzatish — sayt tezligi, meta teglar, sayt strukturasi',
          'Schema.org markup ulanadi — Service, FAQ, LocalBusiness, Article',
          'Sahifa va blog kontentini optimallashtirish',
          'Internal linking strategiyasi va sitemap',
          'Backlink yig\'ish — oyiga 3+ sifatli manba',
          'Google Search Console va Yandex Webmaster monitoring',
          'Raqobatchi tahlili — kvartalda bir marta',
          'Oylik hisobot — pozitsiyalar, trafik, konversiya raqamlari',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: 'Birinchi natija 2–3 oy, stabil natija 6–12 oy',
        process: [
          {
            step: 1,
            title: 'Audit va strategiya',
            description:
              'Sayt tahlili, kalit so\'zlar tadqiqoti, raqobatchi tekshiruvi. Strategiya hujjati bilan yakunlanadi.',
            duration: '1–2 hafta',
          },
          {
            step: 2,
            title: 'Texnik SEO',
            description:
              'Sayt tezligi, meta teglar, struktura, schema. Google\'ning sifat testidan o\'tkazamiz.',
            duration: '2–4 hafta',
          },
          {
            step: 3,
            title: 'Kontent va kalit so\'zlar',
            description:
              'Mavjud sahifa va bloglarni optimallashtirish, yangi kalit so\'zlar uchun kontent qo\'shish.',
            duration: 'Har oy davomida',
          },
          {
            step: 4,
            title: 'Monitoring va hisobot',
            description:
              'Pozitsiya, organik trafik va konversiya kuzatuvi. Har oy raqamli hisobot.',
            duration: 'Har oy',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
          'Bizning bloggimiz hozir Google qidiruvida 2-o\'rinda — "landing page yaratish narxi" so\'rovi uchun. SEO biz uchun amaliyot, nazariya emas',
          'Yolg\'on kafolat yo\'q — "Google #1 100% chiqaramiz" demaymiz. Faqat real raqam va shaffof hisobot',
          'SEO + sayt + kontent — bitta jamoa. Saytni va blogni KATOV o\'zi qiladi, qism-qism qildirib o\'tirmasiz',
          'Lokalga moslashgan — O\'zbekiston Google, Yandex, uz/ru/en kalit so\'zlar bo\'yicha tajriba',
          'Oylik raqamli hisobot — pozitsiyalar, trafik o\'sishi, taqqoslash',
          'Shaffof narx — $300/oy dan boshlanadi, har sayt uchun aniq narx oldindan kelishiladi',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'SEO xizmati narxi qancha turadi?',
            answer:
              'KATOV\'da SEO $300/oy dan boshlanadi. O\'zbekiston bozorida SEO odatda $200–$1500/oy oralig\'ida — sayt hajmi, raqobat darajasi, kalit so\'zlar soni va tillar soniga qarab. KATOV paketlari: kichik biznes $300/oy, o\'rta biznes $500–$800/oy, e-commerce yoki katta korporativ $1000+/oy. Aniq narx audit jarayonida belgilanadi va shartnomada yoziladi.',
          },
          {
            question: 'SEO natija qachon ko\'rinadi?',
            answer:
              'Birinchi natijalar — pozitsiyalar o\'sishi, trafik o\'zgarishi — 2–3 oydan keyin ko\'rinadi. Stabil organik trafik va biznes uchun real natija (lid, sotuv) odatda 6–12 oyda keladi. SEO uzoq muddatli investitsiya: birinchi 3 oy texnik bazani qurish, 4–6 oy kontent va backlink, 6+ oy stabil o\'sish bosqichi.',
          },
          {
            question: 'Google\'da #1 o\'ringa chiqishni kafolatlay olasizmi?',
            answer:
              'Yo\'q — va kim "100% Google #1 kafolat" desa, u sizni aldayapti. Google algoritmi 200+ omilga qaraydi va doim o\'zgarib turadi. Lekin KATOV nima qila olishi: aniq kalit so\'zlar bo\'yicha pozitsiyalar o\'sishi, organik trafik o\'sishi, texnik SEO 100% to\'g\'ri ishlatilishi. Misol uchun — KATOV\'ning o\'zining `website-narxi-uzbekistonda` bloggi hozir "landing page yaratish narxi" qidiruvida Google\'da 2-o\'rinda. Bu real, sizning brauzerda ham ko\'rinadi.',
          },
          {
            question: 'KATOV qaysi loyihalarda SEO qilgan?',
            answer:
              'Eng yaqqol misol — katov.uz o\'zi. Bizning blog Google\'da bir nechta lokal kalit so\'zlar bo\'yicha TOP-5\'da turadi ("landing page yaratish narxi" — #2). Bu nazariya emas, ko\'rsatib bera olamiz. KATOV\'ning mijoz loyihalari uchun SEO ham boshlangan — natijalar hozir to\'planmoqda, har mijoz uchun shaxsiy hisobot beriladi.',
          },
          {
            question: 'SEO faqat tekstmi yoki saytda ham o\'zgarishlar bo\'ladimi?',
            answer:
              'Ikkalasi ham. SEO — bu nafaqat kalit so\'zlar va kontent, balki sayt strukturasi, sahifa tezligi, mobil moslik, meta teglar va schema markup. KATOV avval texnik tomonni tuzatadi (sayt tez ochiladigan, Google to\'g\'ri o\'qiydigan bo\'ladi), keyin kontent va kalit so\'zlar ustida ishlaydi. Har ikkalasini birga qilamiz — alohida emas.',
          },
          {
            question: 'Saytim boshqa kompaniyada qilingan — KATOV uni SEO\'ga olishi mumkinmi?',
            answer:
              'Ha, mumkin. KATOV birinchi navbatda audit qiladi — saytning texnik holati, qaysi platformada qurilgan, qancha o\'zgarish kerakligi aniqlanadi. Ba\'zi hollarda mavjud saytda SEO qilish foydali bo\'lmaydi (eski texnologiya, juda sekin yuklanadi) — bu holda saytni yangidan qurish tavsiya etiladi. Audit natijasi bo\'yicha ochiq tavsiya beramiz: SEO\'mi yoki redesign + SEO.',
          },
        ],
        ctaTitle: 'Saytingiz uchun bepul SEO audit',
        ctaSubtitle:
          'Saytingizning hozirgi SEO holatini bepul tekshiramiz. Ma\'lumotlarni qoldiring, 2 ish kuni ichida audit hisobotini yuboramiz.',
        ctaPrimary: 'Bepul audit olish',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'SEO Продвижение — Вывод Сайта в ТОП Google и Yandex',
        metaDescription:
          'SEO услуги в Ташкенте — техаудит, ключевые слова, контент и backlink. От $300/мес, ежемесячный отчёт. Наш блог в Google #2 — реальное доказательство.',
        h1: 'SEO Продвижение: Рост Органического Трафика и Позиций',
        heroSubtitle:
          'Техаудит, ключевые слова, контент и backlink — полный SEO-пакет. Блог KATOV сейчас на 2-й позиции в Google — не обещание, а реальное доказательство.',
        benefits: [
          {
            icon: 'Search',
            title: 'Технический аудит',
            description:
              'Найдём и исправим все SEO-проблемы — пустые страницы, медленная загрузка, неправильная структура.',
          },
          {
            icon: 'BarChart3',
            title: 'Органический трафик',
            description:
              'Клиенты без рекламы — за счёт постоянно растущего бесплатного трафика из Google.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Прозрачный отчёт',
            description:
              'Каждый месяц цифры: позиции, рост трафика, реальный результат.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Интернет-магазины',
            description:
              'Если карточки товаров не видны в Google — продажи теряются. SEO выводит каждую страницу к её покупателю.',
          },
          {
            title: 'Сервисный бизнес',
            description:
              'Стоматология, юристы, недвижимость — в локальном поиске нужно быть наверху. По запросу "X в Ташкенте" находят именно вас.',
          },
          {
            title: 'B2B и корпоративный',
            description:
              'Долгий цикл сделки — лица, принимающие решения, начинают с Google. SEO выводит вас в поиске на нужном этапе.',
          },
          {
            title: 'Блоги и контент-проекты',
            description:
              'От онлайн-курсов до медиа — если контент ранжируется в Google, аудитория растёт без рекламы.',
          },
        ],
        deliverablesTitle: 'Что входит в SEO-пакет',
        deliverables: [
          'Полный SEO-аудит — технический, контентный, ссылочный анализ',
          'Исследование ключевых слов — uz/ru/en, адаптация под локальный поиск',
          'Технический SEO — скорость сайта, мета-теги, структура',
          'Подключение Schema.org разметки — Service, FAQ, LocalBusiness, Article',
          'Оптимизация существующих страниц и блога',
          'Стратегия внутренней перелинковки и sitemap',
          'Сбор backlink — 3+ качественных источника в месяц',
          'Мониторинг Google Search Console и Yandex Webmaster',
          'Анализ конкурентов — раз в квартал',
          'Ежемесячный отчёт — позиции, трафик, цифры по конверсиям',
        ],
        processTitle: 'Процесс',
        processTotalDuration: 'Первые результаты — 2–3 месяца, стабильные — 6–12 месяцев',
        process: [
          {
            step: 1,
            title: 'Аудит и стратегия',
            description:
              'Анализ сайта, исследование ключевых слов, разбор конкурентов. На выходе — стратегический документ.',
            duration: '1–2 недели',
          },
          {
            step: 2,
            title: 'Технический SEO',
            description:
              'Скорость сайта, мета-теги, структура, schema. Проходим оценку качества Google.',
            duration: '2–4 недели',
          },
          {
            step: 3,
            title: 'Контент и ключевые слова',
            description:
              'Оптимизация существующих страниц и блога, добавление контента под новые ключевые слова.',
            duration: 'В течение месяца',
          },
          {
            step: 4,
            title: 'Мониторинг и отчёт',
            description:
              'Отслеживание позиций, органического трафика и конверсий. Ежемесячный отчёт с цифрами.',
            duration: 'Каждый месяц',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
          'Наш собственный блог сейчас на 2-й позиции в Google по запросу "landing page yaratish narxi". SEO для нас — практика, а не теория',
          'Без ложных гарантий — мы не говорим "выведем в Google #1 на 100%". Только реальные цифры и прозрачные отчёты',
          'SEO + сайт + контент — одна команда. Сайт и блог делает KATOV, не нужно разбивать работу между подрядчиками',
          'Локальная адаптация — опыт работы с Google и Yandex в Узбекистане, на uz/ru/en ключевых словах',
          'Ежемесячный отчёт с цифрами — позиции, рост трафика, сравнения',
          'Прозрачная цена — от $300/мес, точная стоимость по каждому сайту фиксируется заранее',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит SEO-продвижение?',
            answer:
              'В KATOV SEO начинается от $300/мес. На рынке Узбекистана SEO обычно стоит $200–$1500/мес — зависит от объёма сайта, уровня конкуренции, числа ключевых слов и языков. Пакеты KATOV: малый бизнес $300/мес, средний $500–$800/мес, e-commerce или крупный корпоративный $1000+/мес. Точная цена определяется после аудита и фиксируется в договоре.',
          },
          {
            question: 'Когда будут видны результаты SEO?',
            answer:
              'Первые результаты — рост позиций, изменения трафика — видны через 2–3 месяца. Стабильный органический трафик и реальный бизнес-результат (лиды, продажи) обычно приходят за 6–12 месяцев. SEO — долгосрочная инвестиция: первые 3 месяца строим техническую базу, 4–6 — контент и ссылки, 6+ — фаза стабильного роста.',
          },
          {
            question: 'Можете гарантировать ТОП-1 в Google?',
            answer:
              'Нет — и тот, кто обещает "100% Google #1", обманывает. Алгоритм Google учитывает 200+ факторов и постоянно меняется. Что KATOV может: рост позиций по конкретным ключевым словам, рост органического трафика, корректное техническое SEO. Пример — наш собственный блог `website-narxi-uzbekistonda` сейчас на 2-й позиции в Google по запросу "landing page yaratish narxi". Это реально, проверяется в вашем браузере.',
          },
          {
            question: 'На каких проектах KATOV делал SEO?',
            answer:
              'Самый наглядный пример — сам katov.uz. Наш блог в Google занимает позиции в ТОП-5 по нескольким локальным ключевым словам ("landing page yaratish narxi" — #2). Это не теория, мы можем показать. SEO для клиентских проектов KATOV также запущено — результаты накапливаются, по каждому клиенту даём индивидуальный отчёт.',
          },
          {
            question: 'SEO — это только тексты или сайт тоже меняется?',
            answer:
              'И то, и другое. SEO — это не только ключевые слова и контент, но и структура сайта, скорость страниц, мобильная адаптация, мета-теги и schema-разметка. KATOV сначала исправляет техническую часть (сайт быстро открывается, Google корректно его читает), затем работает над контентом и ключевыми словами. Делаем оба направления вместе, не по отдельности.',
          },
          {
            question: 'Сайт сделан другой компанией — KATOV возьмёт его на SEO?',
            answer:
              'Да, можно. Сначала KATOV проводит аудит — техническое состояние, на какой платформе сайт, сколько потребуется правок. Иногда SEO на существующем сайте невыгодно (устаревшие технологии, слишком медленная загрузка) — в этом случае рекомендуем сделать сайт заново. По результатам аудита даём честную рекомендацию: только SEO или редизайн + SEO.',
          },
        ],
        ctaTitle: 'Бесплатный SEO-аудит для вашего сайта',
        ctaSubtitle:
          'Проведём бесплатную проверку текущего SEO-состояния сайта. Оставьте данные — пришлём отчёт по аудиту в течение 2 рабочих дней.',
        ctaPrimary: 'Получить бесплатный аудит',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'SEO Services Uzbekistan — Google Top Rankings',
        metaDescription:
          'SEO services in Tashkent — technical audit, keywords, content, and backlinks. From $300/mo, monthly reports. KATOV blog ranks #2 on Google — real proof.',
        h1: 'SEO Services: Growing Organic Traffic and Rankings',
        heroSubtitle:
          'Technical audit, keywords, content, and backlinks — a complete SEO package. KATOV\'s own blog currently ranks #2 on Google — not a promise, real proof.',
        benefits: [
          {
            icon: 'Search',
            title: 'Technical audit',
            description:
              'We find and fix every SEO issue on your site — empty pages, slow loading, poor structure.',
          },
          {
            icon: 'BarChart3',
            title: 'Organic traffic',
            description:
              'Customers without ads — through steadily growing free traffic from Google.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Transparent reports',
            description:
              'Every month, numbers: rankings, traffic growth, real outcomes.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'E-commerce stores',
            description:
              'If product pages aren\'t visible in Google, sales are lost. SEO brings every page to its buyer.',
          },
          {
            title: 'Service businesses',
            description:
              'Dental, legal, real estate — you need to be on top in local search. Customers find you with "X in Tashkent" queries.',
          },
          {
            title: 'B2B and corporate',
            description:
              'Long sales cycles — decision-makers start with Google. SEO surfaces you at the right stage.',
          },
          {
            title: 'Blogs and content projects',
            description:
              'From online courses to media — if content ranks on Google, your audience grows without ads.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Full SEO audit — technical, content, and backlink analysis',
          'Keyword research — uz/ru/en, adapted to local search',
          'Technical SEO fixes — site speed, meta tags, site structure',
          'Schema.org markup setup — Service, FAQ, LocalBusiness, Article',
          'On-page and blog content optimization',
          'Internal linking strategy and sitemap',
          'Backlink building — 3+ quality sources per month',
          'Google Search Console and Yandex Webmaster monitoring',
          'Competitor analysis — once per quarter',
          'Monthly report — rankings, traffic, conversion numbers',
        ],
        processTitle: 'Process',
        processTotalDuration: 'First results in 2–3 months, stable results in 6–12 months',
        process: [
          {
            step: 1,
            title: 'Audit & strategy',
            description:
              'Site analysis, keyword research, competitor review. Delivered as a strategy document.',
            duration: '1–2 weeks',
          },
          {
            step: 2,
            title: 'Technical SEO',
            description:
              'Site speed, meta tags, structure, schema. We pass Google\'s quality checks.',
            duration: '2–4 weeks',
          },
          {
            step: 3,
            title: 'Content & keywords',
            description:
              'Optimize existing pages and blog, add content for new target keywords.',
            duration: 'Ongoing monthly',
          },
          {
            step: 4,
            title: 'Monitoring & reporting',
            description:
              'Track rankings, organic traffic, and conversions. Monthly report with real numbers.',
            duration: 'Every month',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Individual approach to every project — a solution tailored to your business and customers',
          'Our own blog currently ranks #2 on Google for "landing page yaratish narxi". SEO is practice for us, not theory',
          'No false guarantees — we don\'t promise "100% Google #1". Only real numbers and transparent reporting',
          'SEO + website + content — one team. KATOV builds the site and blog, no juggling multiple vendors',
          'Locally adapted — experience with Google and Yandex in Uzbekistan, across uz/ru/en keywords',
          'Monthly numerical reports — rankings, traffic growth, comparisons',
          'Transparent pricing — from $300/mo, exact cost fixed upfront per site',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much do SEO services cost?',
            answer:
              'At KATOV, SEO starts from $300/month. In the Uzbekistan market, SEO usually ranges from $200–$1500/month — depending on site size, competition level, keyword count, and number of languages. KATOV packages: small business $300/mo, mid-market $500–$800/mo, e-commerce or large corporate $1000+/mo. The exact price is set after the audit and locked in the contract.',
          },
          {
            question: 'When do SEO results show up?',
            answer:
              'First results — rank movement, traffic shifts — show up after 2–3 months. Stable organic traffic and real business outcomes (leads, sales) usually take 6–12 months. SEO is a long-term investment: months 1–3 build the technical foundation, months 4–6 are content and backlinks, month 6+ is the stable growth phase.',
          },
          {
            question: 'Can you guarantee Google #1 rankings?',
            answer:
              'No — and anyone who promises "100% Google #1" is misleading you. Google\'s algorithm uses 200+ ranking factors and changes constantly. What KATOV can deliver: ranking growth for specific target keywords, organic traffic growth, technically correct SEO implementation. Example — KATOV\'s own `website-narxi-uzbekistonda` blog post currently ranks #2 on Google for "landing page yaratish narxi". You can verify this in your own browser.',
          },
          {
            question: 'Which projects has KATOV done SEO for?',
            answer:
              'The clearest example is katov.uz itself. Our blog ranks in the top 5 on Google for several local keywords ("landing page yaratish narxi" — #2). This isn\'t theory — we can show it. SEO for client projects has also launched — results are accumulating, and each client gets an individual report.',
          },
          {
            question: 'Is SEO just text, or does the site itself change too?',
            answer:
              'Both. SEO isn\'t just keywords and content — it\'s also site structure, page speed, mobile responsiveness, meta tags, and schema markup. KATOV first fixes the technical side (site loads fast, Google reads it correctly), then works on content and keywords. Both happen together, not separately.',
          },
          {
            question: 'My site was built by another company — can KATOV take it on for SEO?',
            answer:
              'Yes. KATOV starts with an audit — technical state, what platform the site runs on, how many fixes are needed. Sometimes SEO on an existing site isn\'t worthwhile (outdated tech, very slow loading) — in that case we recommend a fresh build. Based on audit results, we give an honest recommendation: SEO only or redesign + SEO.',
          },
        ],
        ctaTitle: 'Free SEO audit for your site',
        ctaSubtitle:
          'We\'ll check your site\'s current SEO state for free. Leave your details — we\'ll send the audit report within 2 business days.',
        ctaPrimary: 'Get a free audit',
        breadcrumbServices: 'Services',
        priceLabel: 'From',
        priceSuffix: '',
      },
    },
  },
  'telegram-bot': {
    slug: 'telegram-bot',
    icon: 'Bot',
    basePrice: 400,
    priceSuffix: '',
    demand: 5,
    content: {
      uz: {
        title: 'Telegram Bot Yaratish — Biznes Uchun, Click/Payme bilan',
        metaDescription:
          'Biznes uchun Telegram bot yaratish — buyurtma qabul qilish, Click va Payme to\'lov, 24/7 ishlaydi. 7–14 kunda, $400 dan, 3 tilda (uz/ru/en).',
        h1: 'Telegram Bot Yaratish Xizmati: Buyurtma, To\'lov va Mijozlar bilan Aloqa Bir Botda',
        heroSubtitle:
          'Biznesingiz uchun avtomatik bot — mijoz so\'rovini qabul qiladi, mahsulot ko\'rsatadi, Click yoki Payme orqali to\'lov oladi. 24/7 sotuvchidek ishlaydi.',
        benefits: [
          {
            icon: 'Zap',
            title: '24/7 ishlaydi',
            description:
              'Mijoz tun-kun buyurtma berolasi — siz uxlasangiz ham, dam olish kunlari ham bot sotuvni davom ettiradi.',
          },
          {
            icon: 'CreditCard',
            title: 'Click va Payme to\'lov',
            description:
              'Mijoz bot ichida to\'g\'ri to\'laydi, pul sizning hisobingizga keladi. Naqd va qog\'ozli chek bilan ovoragarchilik yo\'q.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'Bitta admin panel',
            description:
              'Buyurtma, mijoz va mahsulotlarni bir joydan boshqarasiz. Excel\'ga eksport, statistika, qidiruv — barchasi bir panelda.',
          },
        ],
        forWhoTitle: 'Kimga mos',
        forWho: [
          {
            title: 'Onlayn do\'kon va savdo',
            description:
              'Mahsulot katalogi, savatcha, buyurtma va to\'lov — sayt o\'rniga yoki sayt bilan birga Telegram bot orqali.',
          },
          {
            title: 'Restoran va kafe',
            description:
              'Menu, taom buyurtmasi, yetkazib berish va stol bron qilish — mijoz birinchi tugmadan to\'lovgacha botdan chiqmasdan.',
          },
          {
            title: 'Xizmat ko\'rsatuvchilar',
            description:
              'Yozilish, narx-navo so\'rash, vaqt bron qilish — go\'zallik saloni, klinika, repetitor, ustaxona uchun.',
          },
          {
            title: 'Mahalliy va offline biznes',
            description:
              'Mijoz xizmati, FAQ avtomati, lid yig\'ish, takroriy mijozlarga eslatma — qo\'ng\'iroqlar sonini kamaytirish uchun.',
          },
        ],
        deliverablesTitle: 'Xizmatga nima kiradi',
        deliverables: [
          'Bot scenariy va menu strukturasi (mijozga qulay yo\'naltirish)',
          'Inline va reply tugmalar — mijoz hech narsa yozmasdan boshqaradi',
          'Click va Payme to\'lov integratsiyasi',
          'Buyurtma boshqaruvi — mijoz va admin tomonlari ajratilgan',
          'Mahsulot katalogi (rasm, narx, kategoriya)',
          'Admin panel — buyurtma, mahsulot, mijoz boshqaruv',
          'Google Sheets yoki CRM bilan ulash (kerak bo\'lsa)',
          '24/7 server — hosting kiradi, alohida to\'lov yo\'q',
          'Botni 3 tilda ishlatish imkoniyati (uz/ru/en)',
          '1 oy bepul support',
        ],
        processTitle: 'Jarayon',
        processTotalDuration: '7–14 ish kuni',
        process: [
          {
            step: 1,
            title: 'Konsultatsiya va scenariy',
            description:
              'Bot nimaga xizmat qilishini aniqlaymiz: kim mijoz, qaysi tugmalar, qaysi to\'lov yo\'li. Scenariy yoziladi va siz tasdiqlaysiz.',
            duration: '1–2 kun',
          },
          {
            step: 2,
            title: 'Bot flow va dizayn',
            description:
              'Menu strukturasi, tugmalar, ekranlar va xabar matnlari tayyorlanadi. Mijoz tajribasi botda qanday borishi — bosqichma-bosqich.',
            duration: '2–3 kun',
          },
          {
            step: 3,
            title: 'Development va integratsiya',
            description:
              'Bot kodi, admin panel, Click/Payme va boshqa integratsiyalar shu yerda quriladi.',
            duration: '3–7 kun',
          },
          {
            step: 4,
            title: 'Test va ishga tushirish',
            description:
              'To\'lov, buyurtma va admin tomon test qilinadi. Hammasi to\'g\'ri ishlasa, bot rasmiy ishga tushadi.',
            duration: '1–2 kun',
          },
        ],
        whyUsTitle: 'Nima uchun KATOV',
        whyUs: [
          'Har bir loyihaga alohida yondashuv — biznesingiz va mijozlaringizga moslashtirilgan yechim',
          'Click va Payme to\'lov tizimi ulab beriladi — mahalliy ekspertiza, har loyihada alohida sozlanadi',
          '10+ muvaffaqiyatli loyiha (Getolog bot va admin panel)',
          'AI/ChatGPT integratsiya tajribasi mavjud (qo\'shimcha funksiya sifatida)',
          'Bot 3 tilda (uz/ru/en) — qo\'shimcha narxsiz',
          'Shaffof narx — $400 dan, ishga tushgandan keyin 1 oy bepul support',
        ],
        portfolioTitle: 'Real loyihalarimiz',
        faqTitle: 'Tez-tez beriladigan savollar',
        faq: [
          {
            question: 'Telegram bot yaratish narxi qancha turadi?',
            answer:
              'KATOV\'da Telegram bot narxi $400 dan boshlanadi. Oddiy info bot $400–$700, mahsulot katalogi va buyurtma bilan $700–$1200, Click/Payme to\'lov va admin panel bilan $1200–$2000, CRM integratsiyasi va AI funksiyalari bilan $2000 dan. Aniq narx konsultatsiyada belgilanadi va keyin o\'zgarmaydi.',
          },
          {
            question: 'Telegram bot necha kunda tayyor bo\'ladi?',
            answer:
              'Standart muddat — 7–14 ish kuni: konsultatsiya va scenariy (1–2 kun), bot flow va dizayn (2–3 kun), development va integratsiya (3–7 kun), test va ishga tushirish (1–2 kun). Oddiy info bot 5–7 kunda ham tayyor bo\'ladi. Murakkab loyihalar (CRM, AI, ko\'p tilli katalog) 3–4 hafta olishi mumkin.',
          },
          {
            question: 'Click va Payme orqali to\'lov bo\'ladimi?',
            answer:
              'Ha. Click va Payme merchant API\'lari botga integratsiya qilinadi: mijoz bot ichida to\'g\'ri to\'laydi, sizga avtomatik tasdiq keladi va pul sizning hisobingizga o\'tadi. Buning uchun sizning Click va Payme merchant akkauntlaringiz bo\'lishi kerak (yoki KATOV qo\'lga olishida yordam beradi).',
          },
          {
            question: 'Bot 24/7 ishlashi uchun nima kerak?',
            answer:
              'Bot 24/7 ishlash uchun server (hosting) kerak — bu xizmatga kiradi, sizga alohida sozlash kerak emas. Bir yil hosting bepul, undan keyin oylik xizmat (KATOV hosting va support paketi) yoki o\'z hostingingizga ko\'chirib oling.',
          },
          {
            question: 'AI yoki ChatGPT integratsiyasi qo\'sha olamizmi?',
            answer:
              'Ha, AI/ChatGPT integratsiyasi qo\'shimcha xizmat sifatida mavjud. Bot mijoz savollariga avtomatik javob beradi, savollarni tasniflaydi yoki kontent tayyorlaydi. Bu OpenAI yoki shunga o\'xshash API\'lar orqali quriladi (API to\'lovi alohida, lekin arzon).',
          },
          {
            question: 'Bot uchun admin panel beriladi?',
            answer:
              'Ha. Admin panel orqali buyurtmalarni ko\'rasiz, mijozlar ro\'yxati, mahsulot qo\'shish va tahrirlash, statistika va Excel\'ga eksport — barchasi bir panelda. Kod yozish kerak emas. Murakkab o\'zgartirishlar kerak bo\'lsa, KATOV qiladi (support davrida bepul).',
          },
        ],
        ctaTitle: 'Telegram bot uchun bepul konsultatsiya',
        ctaSubtitle:
          'Ma\'lumotlarni qoldiring, 1 ish kuni ichida bog\'lanamiz. Konsultatsiya bepul, hech qanday majburiyat yo\'q.',
        ctaPrimary: 'Buyurtma berish',
        breadcrumbServices: 'Xizmatlar',
        priceLabel: 'Narxi',
        priceSuffix: 'dan',
      },
      ru: {
        title: 'Разработка Telegram-бота — Для Бизнеса, с Click/Payme',
        metaDescription:
          'Разработка Telegram-бота для бизнеса — приём заказов, оплата Click/Payme, работа 24/7. 7–14 дней, от $400. 3 языка (uz/ru/en).',
        h1: 'Разработка Telegram-бота: Заказы, Оплата и Поддержка в Одном Боте',
        heroSubtitle:
          'Автоматический бот для вашего бизнеса — принимает заказы, показывает товары, проводит оплату через Click или Payme. Работает как продавец 24/7.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Работает 24/7',
            description:
              'Клиент может заказать ночью или в выходные — бот продолжает продавать, пока вы отдыхаете.',
          },
          {
            icon: 'CreditCard',
            title: 'Оплата Click и Payme',
            description:
              'Клиент платит прямо в боте — деньги поступают вам на счёт. Никаких наличных и бумажных чеков.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'Единая админ-панель',
            description:
              'Заказы, клиенты и товары — всё управляется из одного места. Экспорт в Excel, статистика, поиск.',
          },
        ],
        forWhoTitle: 'Для кого',
        forWho: [
          {
            title: 'Онлайн-магазины',
            description:
              'Каталог товаров, корзина, заказ и оплата — вместо сайта или вместе с ним через Telegram-бота.',
          },
          {
            title: 'Рестораны и кафе',
            description:
              'Меню, заказ блюд, доставка и бронирование столиков — клиент проходит весь путь от кнопки до оплаты, не выходя из бота.',
          },
          {
            title: 'Сервисные компании',
            description:
              'Запись, узнать цену, бронирование времени — для салонов красоты, клиник, репетиторов и мастерских.',
          },
          {
            title: 'Локальный и офлайн-бизнес',
            description:
              'Поддержка клиентов, FAQ-автомат, сбор лидов, напоминания постоянным клиентам — чтобы снизить количество звонков.',
          },
        ],
        deliverablesTitle: 'Что входит в услугу',
        deliverables: [
          'Сценарий бота и структура меню (удобная навигация для клиента)',
          'Inline и reply-кнопки — клиент управляет без ввода текста',
          'Интеграция оплаты Click и Payme',
          'Управление заказами — стороны клиента и админа разделены',
          'Каталог товаров (фото, цена, категории)',
          'Админ-панель — заказы, товары, клиенты',
          'Интеграция с Google Sheets или CRM (при необходимости)',
          '24/7 сервер — хостинг включён, без отдельной оплаты',
          'Возможность работы бота на 3 языках (uz/ru/en)',
          'Бесплатная поддержка 1 месяц',
        ],
        processTitle: 'Процесс',
        processTotalDuration: '7–14 рабочих дней',
        process: [
          {
            step: 1,
            title: 'Консультация и сценарий',
            description:
              'Определяем для чего бот: кто клиент, какие кнопки, какой способ оплаты. Сценарий пишется и вы согласовываете.',
            duration: '1–2 дня',
          },
          {
            step: 2,
            title: 'Flow и дизайн бота',
            description:
              'Структура меню, кнопки, экраны и тексты сообщений. Опыт клиента в боте — шаг за шагом.',
            duration: '2–3 дня',
          },
          {
            step: 3,
            title: 'Разработка и интеграция',
            description:
              'Код бота, админ-панель, Click/Payme и другие интеграции собираются здесь.',
            duration: '3–7 дней',
          },
          {
            step: 4,
            title: 'Тестирование и запуск',
            description:
              'Проверяем оплату, заказы и админ-сторону. Если всё работает — бот официально запускается.',
            duration: '1–2 дня',
          },
        ],
        whyUsTitle: 'Почему KATOV',
        whyUs: [
          'Индивидуальный подход к каждому проекту — решение под ваш бизнес и клиентов',
          'Подключаем оплату Click и Payme — локальная экспертиза, настраиваем под каждый проект',
          '10+ успешных проектов (Getolog — бот и админ-панель)',
          'Опыт интеграции AI/ChatGPT (как дополнительная функция)',
          'Бот на 3 языках (uz/ru/en) — без доп. стоимости',
          'Прозрачная цена — от $400, бесплатная поддержка 1 месяц после запуска',
        ],
        portfolioTitle: 'Наши проекты',
        faqTitle: 'Часто задаваемые вопросы',
        faq: [
          {
            question: 'Сколько стоит разработка Telegram-бота?',
            answer:
              'В KATOV Telegram-бот начинается от $400. Простой info-бот $400–$700, бот с каталогом товаров и заказами $700–$1200, бот с оплатой Click/Payme и админ-панелью $1200–$2000, бот с CRM и AI-функциями от $2000. Точная цена фиксируется на этапе консультации и не меняется.',
          },
          {
            question: 'За сколько дней готов Telegram-бот?',
            answer:
              'Стандартный срок — 7–14 рабочих дней: консультация и сценарий (1–2 дня), flow и дизайн (2–3 дня), разработка и интеграции (3–7 дней), тест и запуск (1–2 дня). Простой info-бот можно сделать за 5–7 дней. Сложные проекты (CRM, AI, многоязычный каталог) могут занять 3–4 недели.',
          },
          {
            question: 'Будет ли оплата через Click и Payme?',
            answer:
              'Да. Merchant API Click и Payme интегрируются в бота: клиент платит прямо в боте, вы получаете автоматическое подтверждение, деньги поступают на ваш счёт. Нужны ваши merchant-аккаунты Click и Payme (или KATOV поможет их оформить).',
          },
          {
            question: 'Что нужно, чтобы бот работал 24/7?',
            answer:
              'Для работы бота 24/7 нужен сервер (хостинг) — он включён в услугу, отдельно настраивать ничего не нужно. Первый год хостинг бесплатный, дальше — ежемесячный сервис (пакет хостинга и поддержки KATOV) или перенос на ваш хостинг.',
          },
          {
            question: 'Можно ли добавить AI или ChatGPT?',
            answer:
              'Да, интеграция AI/ChatGPT доступна как дополнительная услуга. Бот может автоматически отвечать на вопросы клиентов, классифицировать обращения или генерировать контент. Делается через OpenAI или аналогичные API (оплата API отдельно, но недорого).',
          },
          {
            question: 'Будет ли админ-панель?',
            answer:
              'Да. Через админ-панель вы видите заказы, список клиентов, добавляете и редактируете товары, смотрите статистику и экспортируете в Excel — всё в одной панели. Код не нужен. Сложные изменения делает KATOV (во время поддержки — бесплатно).',
          },
        ],
        ctaTitle: 'Бесплатная консультация по Telegram-боту',
        ctaSubtitle:
          'Оставьте данные — свяжемся в течение 1 рабочего дня. Консультация бесплатная, без обязательств.',
        ctaPrimary: 'Заказать',
        breadcrumbServices: 'Услуги',
        priceLabel: 'Цена',
        priceSuffix: 'от',
      },
      en: {
        title: 'Telegram Bot Development — For Business, with Click/Payme',
        metaDescription:
          'Telegram bot development for business — orders, Click/Payme payments, 24/7 operation. 7–14 days, from $400. 3 languages (uz/ru/en).',
        h1: 'Telegram Bot Development: Orders, Payments, and Support in One Bot',
        heroSubtitle:
          'Automated bot for your business — takes orders, shows products, processes payments via Click or Payme. Works like a salesperson 24/7.',
        benefits: [
          {
            icon: 'Zap',
            title: 'Works 24/7',
            description:
              'Customers order at night or on weekends — the bot keeps selling while you rest.',
          },
          {
            icon: 'CreditCard',
            title: 'Click & Payme payments',
            description:
              'Customers pay inside the bot — money lands in your account. No cash or paper receipts.',
          },
          {
            icon: 'LayoutDashboard',
            title: 'One admin panel',
            description:
              'Orders, customers, and products — all managed from one place. Excel export, stats, search included.',
          },
        ],
        forWhoTitle: 'Who it\'s for',
        forWho: [
          {
            title: 'Online stores',
            description:
              'Product catalog, cart, orders, and payment — instead of a site or alongside one, via Telegram bot.',
          },
          {
            title: 'Restaurants & cafés',
            description:
              'Menu, food orders, delivery, and table booking — the customer goes from button to payment without leaving the bot.',
          },
          {
            title: 'Service providers',
            description:
              'Bookings, price inquiries, time reservations — for beauty salons, clinics, tutors, and workshops.',
          },
          {
            title: 'Local & offline business',
            description:
              'Customer support, FAQ automation, lead capture, reminders for returning customers — to cut down on phone calls.',
          },
        ],
        deliverablesTitle: 'What\'s included',
        deliverables: [
          'Bot scenario and menu structure (easy navigation for customers)',
          'Inline and reply buttons — customers navigate without typing',
          'Click & Payme payment integration',
          'Order management — separated customer and admin sides',
          'Product catalog (photos, prices, categories)',
          'Admin panel — orders, products, customers',
          'Google Sheets or CRM integration (if needed)',
          '24/7 server — hosting included, no separate fee',
          'Bot available in 3 languages (uz/ru/en)',
          '1 month free support',
        ],
        processTitle: 'Process',
        processTotalDuration: '7–14 business days',
        process: [
          {
            step: 1,
            title: 'Consultation & scenario',
            description:
              'We define what the bot does: who the customer is, which buttons, which payment flow. Scenario is written and you approve it.',
            duration: '1–2 days',
          },
          {
            step: 2,
            title: 'Bot flow & design',
            description:
              'Menu structure, buttons, screens, and message texts. The customer experience inside the bot — step by step.',
            duration: '2–3 days',
          },
          {
            step: 3,
            title: 'Development & integrations',
            description:
              'Bot code, admin panel, Click/Payme, and other integrations built here.',
            duration: '3–7 days',
          },
          {
            step: 4,
            title: 'Testing & launch',
            description:
              'We test payments, orders, and the admin side. If everything works — the bot goes live.',
            duration: '1–2 days',
          },
        ],
        whyUsTitle: 'Why KATOV',
        whyUs: [
          'Individual approach to every project — a solution tailored to your business and customers',
          'We connect Click & Payme payments — local expertise, configured per project',
          '10+ successful projects (Getolog — bot and admin panel)',
          'AI/ChatGPT integration experience (as an add-on)',
          'Bot in 3 languages (uz/ru/en) — no extra cost',
          'Transparent pricing — from $400, 1 month free support after launch',
        ],
        portfolioTitle: 'Our projects',
        faqTitle: 'Frequently asked questions',
        faq: [
          {
            question: 'How much does Telegram bot development cost?',
            answer:
              'At KATOV, Telegram bots start from $400. A simple info bot $400–$700, a catalog bot with orders $700–$1200, a bot with Click/Payme payments and admin panel $1200–$2000, a bot with CRM and AI features from $2000. The final price is locked during the consultation and never changes.',
          },
          {
            question: 'How long does Telegram bot development take?',
            answer:
              'Standard timeline is 7–14 business days: consultation and scenario (1–2 days), flow and design (2–3 days), development and integrations (3–7 days), testing and launch (1–2 days). A simple info bot can be ready in 5–7 days. Complex projects (CRM, AI, multilingual catalog) may take 3–4 weeks.',
          },
          {
            question: 'Can the bot accept Click and Payme payments?',
            answer:
              'Yes. Click and Payme merchant APIs are integrated into the bot: customers pay inside the bot, you get automatic confirmation, and money lands in your account. You\'ll need your own Click and Payme merchant accounts (or KATOV can help you set them up).',
          },
          {
            question: 'What\'s needed for the bot to run 24/7?',
            answer:
              'A server (hosting) is needed for 24/7 operation — it\'s included in the service, no separate setup. First year of hosting is free; after that, monthly service (KATOV hosting & support plan) or you can move to your own hosting.',
          },
          {
            question: 'Can we add AI or ChatGPT?',
            answer:
              'Yes, AI/ChatGPT integration is available as an add-on. The bot can auto-reply to customer questions, classify inquiries, or generate content. Built via OpenAI or similar APIs (API fees billed separately but inexpensive).',
          },
          {
            question: 'Is an admin panel included?',
            answer:
              'Yes. Through the admin panel you see orders, the customer list, add and edit products, view statistics, and export to Excel — everything in one panel. No code required. For complex changes, KATOV handles them (free during the support period).',
          },
        ],
        ctaTitle: 'Free consultation for your Telegram bot',
        ctaSubtitle:
          'Leave your details — we\'ll get back within 1 business day. The consultation is free, no commitment.',
        ctaPrimary: 'Place order',
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
