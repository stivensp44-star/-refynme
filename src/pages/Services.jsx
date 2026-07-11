import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Nav, Footer } from './PageShell'

const SERVICES = [
  { key: 'weightLoss', href: '/weight-loss' },
  { key: 'aesthetics', href: '/aesthetics' },
  { key: 'hormone', href: '/services/hormone-vitamin-therapy' },
  { key: 'dotExams', href: '/services/dot-exams' },
]

export default function Services() {
  const { t } = useTranslation()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="svc-page">
      <Nav />
      <main className="svc-grid">
        <div className="svc-left">
          <p className="svc-left__credential">{t('services.credential')}</p>
          <h1 className="svc-left__heading">{t('services.heading')}</h1>
          <p className="svc-left__body">
            {t('services.body')}
          </p>
          <Link to="/contact" className="btn btn--rose">{t('services.cta')}</Link>
        </div>

        <div className="svc-right">
          {SERVICES.map(({ key, href }) => (
            <Link key={key} to={href} className="svc-item">
              <h3 className="svc-item__name">{t(`services.items.${key}.name`)}</h3>
              <p className="svc-item__desc">{t(`services.items.${key}.desc`)}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
