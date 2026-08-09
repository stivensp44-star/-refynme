import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SharedNav from '../components/Nav'
import { ZANDA_BOOKING_URL } from '../bookingUrl'

/* ── Shared Nav — unified 2026-08-07 (src/components/Nav.jsx).
   Re-exported here so every existing `import { Nav } from './PageShell'`
   keeps working. Bannerless by default (nav--no-banner, top: 0). ── */
export function Nav() {
  return <SharedNav />
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
          <a href={ZANDA_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--rose" style={{ marginTop: '8px' }}>
            {t('pageShell.bookCta')}
          </a>
        </div>
      </main>

      {children}

      <Footer />
    </div>
  )
}
