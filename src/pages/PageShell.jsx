import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

/* ── Shared Nav ─────────────────────────────────────────── */
export function Nav() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}`} style={{ background: scrolled ? undefined : 'rgba(44,24,16,0.97)' }}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img
            src="/images/refynme-logo-gold.png"
            alt="RefynMe Medical Aesthetics & Wellness"
            className="nav-logo-img"
          />
        </Link>
        <ul className="nav__links">
          <li><Link to="/about" className="nav__link">{t('nav.about')}</Link></li>
          <li><Link to="/services" className="nav__link">{t('nav.services')}</Link></li>
          <li><Link to="/weight-loss" className="nav__link">{t('nav.weightLoss')}</Link></li>
          <li><Link to="/aesthetics" className="nav__link">{t('nav.aesthetics')}</Link></li>
          <li><Link to="/services/dot-exams" className="nav__link">{t('nav.dotExams')}</Link></li>
          <li><Link to="/contact" className="nav__link">{t('nav.contact')}</Link></li>
        </ul>
        <LanguageSwitcher />
        <Link to="/contact" className="btn btn--rose btn--sm">{t('nav.bookNow')}</Link>
      </div>
    </nav>
  )
}

/* ── Shared Footer ──────────────────────────────────────── */
export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <div className="footer__logo">
            <span className="footer__logo-mark">R</span>
            <span className="footer__logo-text">
              Refyn<span className="footer__logo-gold">Me</span>
            </span>
          </div>
          <p className="footer__tagline">Results you see. Confidence you own.</p>
          <div className="footer__socials">
            {['IG', 'TK', 'FB'].map((s) => (
              <a key={s} href="#" className="footer__social">{s}</a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.servicesTitle')}</h4>
          <ul className="footer__nav">
            {[['medicalWeightLoss', '/weight-loss'], ['glp1Injections', '/weight-loss'], ['botox', '/aesthetics'], ['dermalFillers', '/aesthetics'], ['lipEnhancement', '/aesthetics'], ['jawlineSculpting', '/aesthetics']].map(([labelKey, path]) => (
              <li key={labelKey}><Link to={path} className="footer__nav-link">{t(`footer.links.${labelKey}`)}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.companyTitle')}</h4>
          <ul className="footer__nav">
            {[['aboutUs', '/about'], ['ourProvider', '/about'], ['patientStories', '/about'], ['blog', '/blog'], ['faq', '/about'], ['privacyPolicy', '/privacy-policy'], ['terms', '/terms']].map(([labelKey, path]) => (
              <li key={labelKey}><Link to={path} className="footer__nav-link">{t(`footer.links.${labelKey}`)}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.contactTitle')}</h4>
          <ul className="footer__nav footer__nav--contact">
            <li>{t('footer.contact.location')}</li>
            <li>774-312-9806</li>
            <li>refynmemedical@gmail.com</li>
            <li>{t('footer.contact.hours')}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <p className="footer__copy">{t('footer.copyright')}</p>
        <p className="footer__bar-tagline">
          <em>{t('footer.barTagline')}</em>
        </p>
      </div>
    </footer>
  )
}

/* ── Page Shell ─────────────────────────────────────────── */
export function PageShell({ title, subtitle, credential, children }) {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <main className="page-hero">
        <div className="page-hero__inner">
          <p className="label label--gold page-hero__label">RefynMe</p>
          <h1 className="page-hero__heading">
            <em className="page-hero__title-gold">{title}</em>
          </h1>
          {credential && (
            <p className="page-hero__credential">{credential}</p>
          )}
          <p className="page-hero__sub">
            {subtitle || t('pageShell.defaultSubtitle')}
          </p>
          <Link to="/contact" className="btn btn--rose" style={{ marginTop: '8px' }}>
            {t('pageShell.bookCta')}
          </Link>
        </div>
      </main>

      {children}

      <Footer />
    </div>
  )
}
