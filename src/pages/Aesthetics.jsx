import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Nav, Footer } from './PageShell'

const TREATMENT_KEYS = ['botox', 'lip', 'consult']
const FAQ_KEYS = ['hurt', 'time', 'results', 'consult']

export default function Aesthetics() {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="aes-page">
      <Nav />

      {/* ── 1. Hero ───────────────────────────────── */}
      <section className="aes-hero">
        <div className="aes-hero__left">
          <p className="label label--gold">{t('aesthetics.heroLabel')}</p>
          {/* Locked brand tagline — stays English in every language */}
          <h1 className="aes-hero__heading">Results you see. Confidence you own.</h1>
          <p className="aes-hero__body">
            {t('aesthetics.heroBody')}
          </p>
          <div className="aes-hero__btns">
            <Link to="/contact" className="btn btn--rose">{t('aesthetics.heroCta')}</Link>
            <a href="#treatments" className="btn btn--outline-cream">{t('aesthetics.heroSecondary')}</a>
          </div>
        </div>
        <div className="aes-hero__right">
          <img
            src="/images/botox-treatment2.png"
            alt="Nurse Practitioner administering Botox at RefynMe Medical and Wellness"
            className="aes-hero__photo"
          />
        </div>
      </section>

      {/* ── 2. Gold Divider ───────────────────────── */}
      <div className="aes-divider" role="presentation" />

      {/* ── 3. Treatments ─────────────────────────── */}
      <section className="aes-treatments" id="treatments">
        <div className="aes-treatments__inner">
          <div className="aes-section-header">
            <p className="label label--rose">{t('aesthetics.treatmentsLabel')}</p>
            <h2 className="aes-h2">{t('aesthetics.treatmentsHeading')}</h2>
            <p className="aes-subtext">
              {t('aesthetics.treatmentsSub')}
            </p>
          </div>
          <div className="aes-cards">
            {TREATMENT_KEYS.map((key) => (
              <div key={key} className="aes-card">
                <div className="aes-card__placeholder" />
                <div className="aes-card__content">
                  <span className="aes-card__tag">{t(`aesthetics.treatments.${key}.tag`)}</span>
                  <h3 className="aes-card__title">{t(`aesthetics.treatments.${key}.title`)}</h3>
                  <p className="aes-card__desc">{t(`aesthetics.treatments.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Credentials ────────────────────────── */}
      <section className="aes-creds">
        <div className="aes-creds__inner">
          <div className="aes-section-header aes-section-header--dark">
            <p className="label label--gold">{t('aesthetics.credsLabel')}</p>
            <h2 className="aes-creds__heading">{t('aesthetics.credsHeading')}</h2>
          </div>
          <div className="aes-creds__grid">
            <img
              src="/images/botox-treatment3.png"
              alt="Nurse Practitioner administering Botox injection at RefynMe Medical and Wellness"
              className="aes-creds__photo"
            />
            <div className="aes-creds__content">
              <p className="aes-creds__body">
                {t('aesthetics.credsBody1')}
              </p>
              <p className="aes-creds__body">
                {t('aesthetics.credsBody2')}
              </p>
              <div className="aes-creds__pills">
                <span className="aes-creds__pill">{t('aesthetics.credsPill1')}</span>
                <span className="aes-creds__pill">{t('aesthetics.credsPill2')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ────────────────────────────────── */}
      <section className="aes-faq">
        <div className="aes-faq__inner">
          <div className="aes-section-header">
            <p className="label label--rose">{t('aesthetics.faqLabel')}</p>
            <h2 className="aes-h2">{t('aesthetics.faqHeading')}</h2>
          </div>
          <div className="aes-faq__list">
            {FAQ_KEYS.map((key) => (
              <div key={key} className="aes-faq__item">
                <h3 className="aes-faq__q">{t(`aesthetics.faqs.${key}.q`)}</h3>
                <p className="aes-faq__a">{t(`aesthetics.faqs.${key}.a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Strip ──────────────────────────── */}
      <section className="aes-cta-strip">
        <h2 className="aes-cta-strip__heading">{t('aesthetics.ctaHeading')}</h2>
        <p className="aes-cta-strip__sub">{t('aesthetics.ctaSub')}</p>
        <Link to="/contact" className="btn btn--cream-espresso">{t('aesthetics.cta')}</Link>
      </section>

      <Footer />
    </div>
  )
}
