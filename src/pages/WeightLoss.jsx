import { Link } from 'react-router-dom'
import { PageShell } from './PageShell'

const CARDS = [
  {
    title: 'GLP-1 Injections',
    body: 'Semaglutide and other GLP-1 medications to support appetite control and sustainable weight loss.',
  },
  {
    title: 'Oral Medications',
    body: 'Prescription weight loss medications tailored to your health profile and goals.',
  },
  {
    title: 'Dietary Guidance',
    body: 'Practical, personalized nutrition support that fits your real life.',
  },
  {
    title: 'Ongoing Support',
    body: 'Regular check-ins and plan adjustments to keep you on track every step of the way.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    body: 'A one-on-one visit to review your health history and goals.',
  },
  {
    num: '02',
    title: 'Your Plan',
    body: 'A personalized treatment plan built specifically for you.',
  },
  {
    num: '03',
    title: 'Ongoing Care',
    body: 'Regular follow-ups and adjustments as you progress.',
  },
]

export default function WeightLoss() {
  return (
    <PageShell
      title="Medical Weight Loss"
      credential="Evidence-Based · Medically Supervised"
      subtitle="Personalized weight loss programs designed around your body, your goals, and your life — supervised by a board-certified Nurse Practitioner."
    >

      {/* Section 2 — How We Help */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">How We Help</h2>
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

      {/* Section 3 — Is This Right For You? */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">Is This Right For You?</h2>
          <p className="dot-body">
            Our medical weight loss program is designed for adults who have struggled with
            weight loss through diet and exercise alone. We take a clinical approach —
            reviewing your health history, current medications, and personal goals before
            recommending any treatment.
          </p>
        </div>
      </section>

      {/* Section 4 — What to Expect */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">What to Expect</h2>
          <div className="wl-steps">
            {STEPS.map(({ num, title, body }) => (
              <div key={num} className="wl-step">
                <span className="wl-step__num">{num}</span>
                <h3 className="wl-step__title">{title}</h3>
                <p className="wl-step__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">Ready to Start?</h2>
        <Link to="/book" className="btn btn--rose">Book Free Consultation</Link>
      </section>

    </PageShell>
  )
}
