import { useTranslation } from 'react-i18next'
import { PageShell } from './PageShell'
import { ZANDA_BOOKING_URL } from '../bookingUrl'

const CARD_KEYS = ['history', 'physical', 'vision', 'certificate']

export default function DotExams() {
  const { t } = useTranslation()
  return (
    <PageShell
      title={t('dotExams.title')}
      credential={t('dotExams.credential')}
      subtitle={t('dotExams.subtitle')}
    >

      {/* Section 2 — What to Expect */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('dotExams.whatToExpect')}</h2>
          <div className="dot-cards">
            {CARD_KEYS.map((key) => (
              <div key={key} className="dot-card">
                <h3 className="dot-card__title">{t(`dotExams.cards.${key}.title`)}</h3>
                <p className="dot-card__body">{t(`dotExams.cards.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Who Needs a DOT Exam */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">{t('dotExams.whoNeeds')}</h2>
          <p className="dot-body">
            {t('dotExams.whoNeedsBody')}
          </p>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">{t('dotExams.ctaHeading')}</h2>
        <a href={ZANDA_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--rose">{t('dotExams.cta')}</a>
      </section>

    </PageShell>
  )
}
