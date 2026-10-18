import { useTranslation } from 'react-i18next'
import { ZANDA_BOOKING_URL } from '../bookingUrl'

// Mydwine to confirm the real program dates before merge. Empty = caption hidden.
const RESULTS_TIMEFRAME = ''

const PAIRS = [
  {
    key: 'set1',
    before: {
      src: '/images/results/weightloss-set1-before.jpg',
      alt: 'Patient before medically supervised weight loss, front view',
    },
    after: {
      src: '/images/results/weightloss-set1-after.jpg',
      alt: 'Same patient after medically supervised weight loss, front view',
    },
  },
  {
    key: 'set2',
    before: {
      src: '/images/results/weightloss-set2-before.jpg',
      alt: 'Patient before medically supervised weight loss, standing view',
    },
    after: {
      src: '/images/results/weightloss-set2-after.jpg',
      alt: 'Same patient after medically supervised weight loss, side view',
    },
  },
]

export default function ResultsGallery() {
  const { t } = useTranslation()

  return (
    <section className="dot-section dot-section--alt wl-results">
      <div className="dot-section__inner wl-results__inner">
        <div className="wl-results__head">
          <h2 className="dot-heading">{t('weightLoss.results.heading')}</h2>
          <p className="dot-body">{t('weightLoss.results.subheading')}</p>
        </div>

        <div className="wl-results__pairs">
          {PAIRS.map((pair) => (
            <figure key={pair.key} className="wl-results__pair">
              <div className="wl-results__imgwrap">
                <img
                  className="wl-results__img"
                  src={pair.before.src}
                  alt={pair.before.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
                <span className="wl-results__label">{t('weightLoss.results.before')}</span>
              </div>
              <div className="wl-results__imgwrap">
                <img
                  className="wl-results__img"
                  src={pair.after.src}
                  alt={pair.after.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
                <span className="wl-results__label">{t('weightLoss.results.after')}</span>
              </div>
            </figure>
          ))}
        </div>

        {RESULTS_TIMEFRAME && (
          <p className="wl-results__caption">
            {t('weightLoss.results.caption', { timeframe: RESULTS_TIMEFRAME })}
          </p>
        )}

        <p className="wl-results__disclaimer">{t('weightLoss.results.disclaimer')}</p>

        <a
          href={ZANDA_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--rose"
        >
          {t('weightLoss.results.cta')}
        </a>
      </div>
    </section>
  )
}
