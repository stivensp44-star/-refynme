import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  /* KEA dark pending native review (2026-08-07) — locale file kept in repo */
]

/* variant="overlay" — larger touch targets inside the mobile hamburger overlay */
export default function LanguageSwitcher({ variant }) {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage || i18n.language || 'en'

  return (
    <div
      className={`lang-switch${variant === 'overlay' ? ' lang-switch--overlay' : ''}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__pill${current === code ? ' lang-switch__pill--active' : ''}`}
          aria-pressed={current === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
