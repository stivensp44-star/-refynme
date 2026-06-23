import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

export default function About() {
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
              <span className="label label--gold">Meet Your Provider</span>
            </div>
            <h1 className="about-provider__name">Your Provider's Name, NP</h1>
            <p className="about-provider__creds-text">
              Board-Certified Nurse Practitioner · Massachusetts FPA · NRCME Certified
            </p>
            <p className="about-provider__bio">
              [Provider bio coming soon]
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — We Get It */}
      <section className="about-section">
        <div className="about-section__inner">
          <h2 className="about-heading">We Get It.</h2>
          <p className="about-body">
            Weight loss can feel overwhelming — especially when you've already tried so many
            things without lasting success. Our approach starts with your experience. We
            combine medical guidance with genuine, steady support designed around your life,
            so progress feels realistic and sustainable.
          </p>
        </div>
      </section>

      {/* Section 3 — Our Approach */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <h2 className="about-heading">Our Approach</h2>
          <p className="about-body">
            From your first visit, you'll have one provider, one plan, and a clear path
            forward. We don't rush. We don't guess. We listen, we explain, and we build
            your care around what actually works for you.
          </p>
          <p className="about-body">
            Our focus extends beyond treatments — it's about helping you feel restored,
            re-energized, and more confident in your daily life.
          </p>
        </div>
      </section>

      {/* Section 4 — Credentials Bar */}
      <section className="about-creds-bar">
        <div className="about-creds-bar__inner">
          <div className="about-cred-card">
            <span className="about-cred-card__title">Board-Certified NP</span>
            <span className="about-cred-card__sub">Nurse Practitioner</span>
          </div>
          <div className="about-cred-divider" />
          <div className="about-cred-card">
            <span className="about-cred-card__title">MA Licensed</span>
            <span className="about-cred-card__sub">Full Practice Authority</span>
          </div>
          <div className="about-cred-divider" />
          <div className="about-cred-card">
            <span className="about-cred-card__title">NRCME Certified</span>
            <span className="about-cred-card__sub">DOT Medical Exams</span>
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="about-cta-section">
        <Link to="/book" className="btn btn--rose">Book a Consultation</Link>
      </section>

      <Footer />
    </div>
  )
}
