import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageShell } from './PageShell'

const CARD_KEYS = ['iv', 'energy', 'hormoneSupport', 'plan']

export default function HormoneVitaminTherapy() {
  const { t } = useTranslation()
  return (
    <PageShell
      title={t('hormone.title')}
      credential={t('hormone.credential')}
      subtitle={t('hormone.subtitle')}
    >

      {/* Section 2 — What We Offer */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('hormone.whatWeOffer')}</h2>
          <div className="dot-cards">
            {CARD_KEYS.map((key) => (
              <div key={key} className="dot-card">
                <h3 className="dot-card__title">{t(`hormone.cards.${key}.title`)}</h3>
                <p className="dot-card__body">{t(`hormone.cards.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Who It's For */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('hormone.whoItsFor')}</h2>
          <p className="dot-body">
            {t('hormone.whoItsForBody')}
          </p>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">{t('hormone.ctaHeading')}</h2>
        <Link to="/contact" className="btn btn--rose">{t('hormone.cta')}</Link>
      </section>

    </PageShell>
  )
}
