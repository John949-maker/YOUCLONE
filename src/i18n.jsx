import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationUZ from './Locales/uz.json';
import translationEN from './Locales/en.json';

const resources = {
  uz: {
    translation: translationUZ
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
