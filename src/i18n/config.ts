export const locales = ['uz', 'en', 'ru'] as const;
export const defaultLocale = 'uz' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  en: 'English',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  uz: '🇺🇿',
  en: '🇺🇸',
  ru: '🇷🇺',
};
