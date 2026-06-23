import { Link } from 'react-router-dom'
import { PageShell } from './PageShell'

const CARDS = [
  {
    title: 'IV Vitamin Therapy',
    body: 'Customized intravenous nutrients delivered straight into your bloodstream for fast, full absorption.',
  },
  {
    title: 'Energy & Recovery',
    body: 'Targeted blends to support energy, hydration, and recovery when you need it most.',
  },
  {
    title: 'Hormone Support',
    body: 'Evaluation and care to help address fatigue, mood changes, and hormonal imbalance.',
  },
  {
    title: 'A Plan Built for You',
    body: 'Every protocol is shaped around your labs, your symptoms, and your goals — never one-size-fits-all.',
  },
]

export default function HormoneVitaminTherapy() {
  return (
    <PageShell
      title="Hormone & Vitamin Therapy"
      credential="By a Board-Certified Nurse Practitioner"
      subtitle="Customized IV vitamin therapy and hormone support to restore balance, improve energy, and help you feel like yourself again."
    >

      {/* Section 2 — What We Offer */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">What We Offer</h2>
          <div className="dot-cards">
            {CARDS.map(({ title, body }) => (
              <div key={title} className="dot-card">
                <h3 className="dot-card__title">{title}</h3>
                <p className="dot-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Who It's For */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">Who It's For</h2>
          <p className="dot-body">
            If you're feeling drained, run-down, or just not like yourself, hormone and
            vitamin therapy can help replace what your body is missing. We start with a
            consultation and, when it makes sense, lab work — then build a plan tailored
            to you. No guesswork, no pressure.
          </p>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">Ready to feel like yourself again?</h2>
        <Link to="/contact" className="btn btn--rose">Book a Consultation</Link>
      </section>

    </PageShell>
  )
}
