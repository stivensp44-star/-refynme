import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  /* KEA dark pending native review (2026-08-07) — locale file kept in repo.
     The desktop dropdown renders a static, disabled "Kriolu — soon" row
     (visual only; Absolute Rule 15: not selectable, not imported, not in
     supportedLngs). The mobile overlay does NOT list Kriolu. */
]

function GlobeIcon() {
  return (
    <svg
      className="lang-dd__globe"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2c2.8 2.7 4.2 6.1 4.2 10S14.8 19.3 12 22c-2.8-2.7-4.2-6.1-4.2-10S9.2 4.7 12 2z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      className="lang-dd__chevron"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  )
}

function LanguageDropdown({ i18n, current }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])

  const currentIndex = Math.max(0, LANGS.findIndex((l) => l.code === current))

  const close = (refocusTrigger) => {
    setOpen(false)
    if (refocusTrigger) triggerRef.current?.focus()
  }

  /* On open: focus the currently-selected option; close on any outside press */
  useEffect(() => {
    if (!open) return
    optionRefs.current[currentIndex]?.focus()
    const onDocPress = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocPress)
    return () => document.removeEventListener('mousedown', onDocPress)
  }, [open, currentIndex])

  const select = (code) => {
    i18n.changeLanguage(code)
    close(true)
  }

  const onTriggerKeyDown = (e) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
    } else if (open && e.key === 'Escape') {
      e.preventDefault()
      close(true)
    }
  }

  /* Roving focus over the ENABLED options only — the disabled Kriolu row is
     never in optionRefs, so arrow/Home/End navigation skips it by construction */
  const onListKeyDown = (e) => {
    const last = LANGS.length - 1
    const focused = optionRefs.current.findIndex((el) => el === document.activeElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      optionRefs.current[Math.min(focused + 1, last)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      optionRefs.current[Math.max(focused - 1, 0)]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      optionRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      optionRefs.current[last]?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (focused >= 0) select(LANGS[focused].code)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close(true)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className="lang-dd" ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="lang-dd__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LANGS[currentIndex].label}`}
        onClick={() => (open ? close(true) : setOpen(true))}
        onKeyDown={onTriggerKeyDown}
      >
        <GlobeIcon />
        <span className="lang-dd__name">{LANGS[currentIndex].label}</span>
        <ChevronIcon />
      </button>
      {open && (
        <ul
          className="lang-dd__menu"
          role="listbox"
          aria-label="Language"
          onKeyDown={onListKeyDown}
        >
          {LANGS.map(({ code, label }, i) => (
            <li
              key={code}
              ref={(el) => {
                optionRefs.current[i] = el
              }}
              role="option"
              aria-selected={current === code}
              tabIndex={-1}
              className="lang-dd__option"
              onClick={() => select(code)}
            >
              <span className="lang-dd__check" aria-hidden="true">✓</span>
              {label}
            </li>
          ))}
          <li
            className="lang-dd__option lang-dd__option--disabled"
            role="option"
            aria-disabled="true"
            aria-selected={false}
          >
            <span className="lang-dd__check" aria-hidden="true">✓</span>
            Kriolu
            <span className="lang-dd__soon">soon</span>
          </li>
        </ul>
      )}
    </div>
  )
}

/* variant="overlay" — flat pill list inside the mobile hamburger overlay
   (kept deliberately: no dropdown nested in the overlay) */
export default function LanguageSwitcher({ variant }) {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage || i18n.language || 'en'

  if (variant === 'overlay') {
    return (
      <>
        <span className="lang-switch__eyebrow">Language</span>
        <div className="lang-switch lang-switch--overlay" role="group" aria-label="Language">
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
      </>
    )
  }

  return <LanguageDropdown i18n={i18n} current={current} />
}
