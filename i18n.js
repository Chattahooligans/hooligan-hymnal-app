//configure internationalization
import i18n from 'i18n-js';
//import files
import en from './locales/en.json';
//default to English; if a locale is missing a string,
//read it from English
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en };
export default i18n;