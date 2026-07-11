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

      {/* Section 1 — Intro */}
      <section className="about-section about-intro">
        <div className="about-section__inner">
          {/* PROVIDER PHOTO: pending professional shots */}
          <h1 className="about-heading">
            {t('about.h1')}
          </h1>
          <p className="about-body">
            {t('about.intro1')}
          </p>
          <p className="about-body">
            {t('about.intro2')}
          </p>
          <p className="about-body">
            {t('about.intro3')}
          </p>
          <p className="about-pull">
            {t('about.pull')}
          </p>
        </div>
      </section>

      {/* Section 2 — The philosophy, practiced */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <h2 className="about-heading">
            {t('about.philHeading')}
          </h2>
          <p className="about-body">
            {t('about.phil1Before')}<em>{t('about.phil1Em')}</em>{t('about.phil1After')}
          </p>
          <p className="about-body">
            {t('about.phil2')}
          </p>
          <p className="about-body">
            {t('about.phil3')}
          </p>
          <p className="about-body">
            {t('about.phil4')}
          </p>
        </div>
      </section>

      {/* Section 3 — Closing */}
      <section className="about-section">
        <div className="about-section__inner">
          <h2 className="about-heading">
            {t('about.closeHeading')}
          </h2>
          <p className="about-body">
            {t('about.close1')}
          </p>
          <p className="about-body">
            {t('about.close2')}
          </p>
        </div>
      </section>

      {/* Section 4 — Credentials + CTA */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <p className="about-credline">
            {t('about.credline')}
          </p>
          <Link to="/contact" className="btn btn--rose">{t('about.cta')}</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
