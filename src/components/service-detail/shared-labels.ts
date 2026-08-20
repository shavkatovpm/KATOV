import type { Locale } from '@/i18n/config';

export const portfolioCategoryLabels: Record<Locale, Record<string, string>> = {
  uz: {
    darslinker: "Onlayn ta'limni tizimlashtirish platformasi",
    getolog: 'Yopiq Telegram kanallarini avtomatlashtirish',
    uzbektype: "Tez va to'g'ri yozishni tekshirish",
  },
  ru: {
    darslinker: 'Платформа для систематизации онлайн-обучения',
    getolog: 'Автоматизация закрытых Telegram-каналов',
    uzbektype: 'Проверка скорости и точности набора текста',
  },
  en: {
    darslinker: 'Online learning systematization platform',
    getolog: 'Closed Telegram channels automation',
    uzbektype: 'Typing speed and accuracy test',
  },
};

export const otherServicesLabel: Record<Locale, string> = {
  uz: 'Boshqa xizmatlarimiz',
  ru: 'Другие наши услуги',
  en: 'Other services',
};
