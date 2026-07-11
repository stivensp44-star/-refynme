import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageShell } from './PageShell'

const CARD_KEYS = ['glp1', 'oral', 'diet', 'support']
const STEPS = [
  { num: '01', key: 'step1' },
  { num: '02', key: 'step2' },
  { num: '03', key: 'step3' },
]

export default function WeightLoss() {
  const { t } = useTranslation()
  return (
    <PageShell
      title={t('weightLoss.title')}
      credential={t('weightLoss.credential')}
      subtitle={t('weightLoss.subtitle')}
    >

      {/* Section 2 — How We Help */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('weightLoss.howWeHelp')}</h2>
          <div className="dot-cards">
            {CARD_KEYS.map((key) => (
              <div key={key} className="dot-card">
                <h3 className="dot-card__title">{t(`weightLoss.cards.${key}.title`)}</h3>
                <p className="dot-card__body">{t(`weightLoss.cards.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Is This Right For You? */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('weightLoss.isThisRight')}</h2>
          <p className="dot-body">
            {t('weightLoss.isThisRightBody')}
          </p>
        </div>
      </section>

      {/* Section 4 — What to Expect */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('weightLoss.whatToExpect')}</h2>
          <div className="wl-steps">
            {STEPS.map(({ num, key }) => (
              <div key={num} className="wl-step">
                <span className="wl-step__num">{num}</span>
                <h3 className="wl-step__title">{t(`weightLoss.steps.${key}.title`)}</h3>
                <p className="wl-step__body">{t(`weightLoss.steps.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">{t('weightLoss.ctaHeading')}</h2>
        <Link to="/contact" className="btn btn--rose">{t('weightLoss.cta')}</Link>
      </section>

    </PageShell>
  )
}
