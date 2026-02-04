import i18n from 'i18n-js';
import en from '@locales/en';
import hi from '@locales/hi';

i18n.translations = {
  en,
  hi,
};

i18n.fallbacks = {
  hi: 'en',
};

export const setLanguage = (lang: string) => {
  i18n.locale = lang;
};

export const translate = (key: string): string => {
  return i18n.t(key);
};

export default i18n;
