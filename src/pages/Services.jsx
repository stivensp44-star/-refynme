import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

const SERVICES = [
  {
    name: 'Medical Weight Loss',
    desc: 'GLP-1 injections, oral medications, and dietary guidance tailored to your body and goals.',
    href: '/weight-loss',
  },
  {
    name: 'Aesthetic Treatments',
    desc: 'Botox and dermal fillers to help you look and feel your best.',
    href: '/aesthetics',
  },
  {
    name: 'Hormone & Vitamin Therapy',
    desc: 'Customized intravenous (IV) vitamin therapy to restore balance, improve energy, and support long-term health.',
    href: '/services/hormone-vitamin-therapy',
  },
  {
    name: 'DOT Medical Exams',
    desc: 'FMCSA-certified DOT physical examinations for commercial drivers.',
    href: '/services/dot-exams',
  },
]

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="svc-page">
      <Nav />
      <main className="svc-grid">
        <div className="svc-left">
          <p className="svc-left__credential">By a Board-Certified Nurse Practitioner</p>
          <h1 className="svc-left__heading">Our Services</h1>
          <p className="svc-left__body">
            At RefynMe, caring for yourself is an important part of living well.
            Whether your goal is to increase energy, manage your weight, or improve
            your skin — we provide individualized, compassionate care and
            evidence-based treatments to help you get there.
          </p>
          <Link to="/book" className="btn btn--rose">Book a Consultation</Link>
        </div>

        <div className="svc-right">
          {SERVICES.map(({ name, desc, href }) => (
            <Link key={name} to={href} className="svc-item">
              <h3 className="svc-item__name">{name}</h3>
              <p className="svc-item__desc">{desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
