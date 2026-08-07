import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
/* KEA is DARK pending native review (2026-08-07): not imported, not bundled,
   not selectable. locales/kea.json stays in the repo untouched. */

/* Visitors who selected KEA while it was live have 'kea' persisted — migrate
   them to 'en' so they are not stranded in an unsupported language. */
try {
  if (localStorage.getItem('refynme-lang') === 'kea') {
    localStorage.setItem('refynme-lang', 'en')
  }
} catch {
  /* storage unavailable (private mode) — detector falls back to navigator */
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es'],
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

/* Keep <html lang> in sync with the active language (screen readers,
   browser auto-translate). index.html ships lang="en". */
const applyHtmlLang = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language || 'en'
  }
}
i18n.on('languageChanged', applyHtmlLang)
applyHtmlLang()

export default i18n
