import { Link } from 'react-router-dom'
import { PageShell } from './PageShell'

const CARDS = [
  {
    title: 'Medical History Review',
    body: 'A thorough review of your health background and current medications.',
  },
  {
    title: 'Physical Examination',
    body: 'Head-to-toe physical assessment meeting FMCSA standards.',
  },
  {
    title: 'Vision & Hearing',
    body: 'Standard vision and hearing tests required for certification.',
  },
  {
    title: 'Same-Day Certificate',
    body: 'Walk out with your Medical Examiner\u2019s Certificate the same day.',
  },
]

export default function DotExams() {
  return (
    <PageShell
      title="DOT Medical Exams"
      credential="FMCSA-Certified · NRCME Certified Provider"
      subtitle="Fast, professional DOT physical examinations for commercial drivers — performed by a board-certified Nurse Practitioner."
    >

      {/* Section 2 — What to Expect */}
      <section className="dot-section">
        <div className="dot-section__inner">
          <h2 className="dot-heading">What to Expect</h2>
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

      {/* Section 3 — Who Needs a DOT Exam */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">Who Needs a DOT Exam?</h2>
          <p className="dot-body">
            If you operate a commercial motor vehicle and are required to hold a CDL,
            federal law requires a current DOT medical certificate. This includes truck
            drivers, bus drivers, and other commercial vehicle operators.
          </p>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="dot-cta-section">
        <h2 className="dot-cta-heading">Ready to Book Your Exam?</h2>
        <Link to="/book" className="btn btn--rose">Book Now</Link>
      </section>

    </PageShell>
  )
}
