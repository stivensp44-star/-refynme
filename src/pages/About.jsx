import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Nav, Footer } from './PageShell'

export default function About() {
  const { t } = useTranslation()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="about-page">
      <Nav />

      {/* Section 1 — Provider Hero */}
      <section className="about-provider">
        <div className="about-provider__grid">
          <div className="about-provider__photo-wrap">
            <img
              src="/images/provider-hero.png"
              alt="RefynMe — Your Provider"
              className="about-provider__photo"
            />
          </div>
          <div className="about-provider__content">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="label label--gold">{t('about.label')}</span>
            </div>
            <h1 className="about-provider__name">Mydwine Pierre Louis, NP</h1>
            <p className="about-provider__creds-text">
              {t('about.credsText')}
            </p>
            <p className="about-provider__bio">
              {t('about.bioPlaceholder')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — We Get It */}
      <section className="about-section">
        <div className="about-section__inner">
          <h2 className="about-heading">{t('about.weGetIt')}</h2>
          <p className="about-body">
            {t('about.weGetItBody')}
          </p>
        </div>
      </section>

      {/* Section 3 — Our Approach */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <h2 className="about-heading">{t('about.approach')}</h2>
          <p className="about-body">
            {t('about.approachBody1')}
          </p>
          <p className="about-body">
            {t('about.approachBody2')}
          </p>
        </div>
      </section>

      {/* Section 4 — Credentials Bar */}
      <section className="about-creds-bar">
        <div className="about-creds-bar__inner">
          <div className="about-cred-card">
            <span className="about-cred-card__title">{t('about.cred1Title')}</span>
            <span className="about-cred-card__sub">{t('about.cred1Sub')}</span>
          </div>
          <div className="about-cred-divider" />
          <div className="about-cred-card">
            <span className="about-cred-card__title">{t('about.cred2Title')}</span>
            <span className="about-cred-card__sub">{t('about.cred2Sub')}</span>
          </div>
          <div className="about-cred-divider" />
          <div className="about-cred-card">
            <span className="about-cred-card__title">{t('about.cred3Title')}</span>
            <span className="about-cred-card__sub">{t('about.cred3Sub')}</span>
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="about-cta-section">
        <Link to="/contact" className="btn btn--rose">{t('about.cta')}</Link>
      </section>

      <Footer />
    </div>
  )
}
