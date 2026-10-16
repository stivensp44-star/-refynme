import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { ZANDA_BOOKING_URL } from '../bookingUrl'

/* Active-page state (additive, 2026-10-16): NavLink appends is-active to the
   existing link classes; styling lives in App.css. `end` on / and /services
   stops ancestor paths lighting up on /services/dot-exams. */
const navLinkClass = (base) => ({ isActive }) => `${base}${isActive ? ' is-active' : ''}`

/* ── THE shared Nav (unified 2026-08-07) ─────────────────────────────────
   One component for every page. There is no second Nav to update.
   banner prop: true on the homepage (nav sits below the 40px banner,
   transparent until scroll over the hero); false/absent everywhere else
   (nav--no-banner: top 0, opaque espresso at rest). */
export default function Nav({ banner = false }) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Open state: lock background scroll, trap focus in the overlay,
     close on Escape with focus returned to the hamburger */
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      overlayRef.current
        ? [...overlayRef.current.querySelectorAll('a[href], button:not([disabled])')]
        : []
    /* Deterministic initial focus: the open state flips visibility with 0s
       transition (the 0.3s delay is close-only), so the element is focusable
       as soon as the class-applied styles are flushed — double rAF guarantees
       that flush without racing a timer against the transition */
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => focusables()[0]?.focus())
    })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const els = focusables()
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      const inOverlay = overlayRef.current?.contains(document.activeElement)
      if (!inOverlay) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`nav${banner ? '' : ' nav--no-banner'}${scrolled ? ' nav--solid' : ''}`}>
      <div
        id="nav-overlay-menu"
        ref={overlayRef}
        className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav__overlay-links">
          <li><NavLink to="/" end viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.home')}</NavLink></li>
          <li><NavLink to="/about" viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/services" end viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.services')}</NavLink></li>
          <li><NavLink to="/weight-loss" viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.weightLoss')}</NavLink></li>
          <li><NavLink to="/aesthetics" viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.aesthetics')}</NavLink></li>
          <li><NavLink to="/services/dot-exams" viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.dotExams')}</NavLink></li>
          <li><NavLink to="/contact" viewTransition className={navLinkClass('nav__overlay-link')} onClick={close}>{t('nav.contact')}</NavLink></li>
        </ul>
        <LanguageSwitcher variant="overlay" />
        <a href={ZANDA_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--rose nav__overlay-book" onClick={close}>{t('nav.bookNow')}</a>
      </div>

      <div className="nav__inner">
        <Link to="/" viewTransition className="nav__logo">
          <img
            src="/images/refynme-logo-gold.png"
            alt="RefynMe Medical Aesthetics & Wellness"
            className="nav-logo-img"
          />
        </Link>
        <ul className="nav__links">
          <li><NavLink to="/about" viewTransition className={navLinkClass('nav__link')}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/services" end viewTransition className={navLinkClass('nav__link')}>{t('nav.services')}</NavLink></li>
          <li><NavLink to="/weight-loss" viewTransition className={navLinkClass('nav__link')}>{t('nav.weightLoss')}</NavLink></li>
          <li><NavLink to="/aesthetics" viewTransition className={navLinkClass('nav__link')}>{t('nav.aesthetics')}</NavLink></li>
          <li><NavLink to="/services/dot-exams" viewTransition className={navLinkClass('nav__link')}>{t('nav.dotExams')}</NavLink></li>
          <li><NavLink to="/contact" viewTransition className={navLinkClass('nav__link')}>{t('nav.contact')}</NavLink></li>
        </ul>
        <LanguageSwitcher />
        <a href={ZANDA_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--rose btn--sm nav__book-desktop">{t('nav.bookNow')}</a>
        <button
          ref={hamburgerRef}
          className="nav__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="nav-overlay-menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}
