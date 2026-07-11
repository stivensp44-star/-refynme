import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import kea from './locales/kea.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      kea: { translation: kea },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es', 'kea'],
    /* navigator gives regional codes (fr-FR, es-MX) — resolve them to the base language */
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'refynme-lang',
      caches: ['localStorage'],
    },
    interpolation: {
      /* React already escapes rendered strings */
      escapeValue: false,
    },
  })

export default i18n
