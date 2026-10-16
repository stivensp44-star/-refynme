import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Nav, Footer } from './PageShell'
import { ZANDA_BOOKING_URL } from '../bookingUrl'

export default function About() {
  const { t } = useTranslation()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="about-page">
      <Nav />

      {/* Section 1 — Intro */}
      <section className="about-section about-intro">
        <div className="about-section__inner">
          <div className="about-intro__grid">
            {/* Alt text is a proper name — identical in every language, never extracted */}
            <picture className="about-photo-pic">
              {/* v2 interim asset (owner-chosen, 2026-10-16): 525x640 native,
                  transparent WebP + cream-flattened JPG fallback. v2 filenames
                  = cache-bust. Full-size original replaces this later. */}
              <source srcSet="/images/provider-about-v2.webp" type="image/webp" />
              <img
                src="/images/provider-about-v2.jpg"
                width="525"
                height="640"
                alt="Mydwine Pierre Louis, NP, founder of RefynMe"
                loading="eager"
                fetchPriority="high"
                className="about-photo"
              />
            </picture>

            <div className="about-intro__text">
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
          </div>
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
          <a href={ZANDA_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--rose">{t('about.cta')}</a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
