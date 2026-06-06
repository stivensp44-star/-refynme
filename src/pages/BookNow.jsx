import { PageShell } from './PageShell'

const CONTACTS = [
  {
    icon: '☎',
    value: '(508) 000-0000',
    label: 'Call or text anytime',
  },
  {
    icon: '✉',
    value: 'hello@refynme.com',
    label: 'We respond within 24 hours',
  },
  {
    icon: '✦',
    value: '@refynme',
    label: 'Send us a DM',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Book',
    body: 'Choose a time that works for you.',
  },
  {
    num: '02',
    title: 'Connect',
    body: 'We\u2019ll talk through your goals and answer your questions.',
  },
  {
    num: '03',
    title: 'Your Plan',
    body: 'If we\u2019re a good fit, we\u2019ll build your personalized care plan.',
  },
]

export default function BookNow() {
  return (
    <PageShell
      title="Book Your Consultation"
      subtitle="Results you see. Confidence you own."
    >

      {/* Section 2 — Two Column Layout */}
      <section className="dot-section">
        <div className="dot-section__inner book-section__inner">
          <div className="book-grid">

            {/* Left — Booking Info */}
            <div className="book-left">
              <h2 className="book-left__heading">Free 15-Minute Consultation</h2>
              <p className="book-left__body">
                Not sure where to start? Book a free 15-minute call and we'll help you
                figure out the right path forward. No pressure. No commitment. Just a
                real conversation about your goals.
              </p>
              <a
                href="https://calendly.com"
                className="btn btn--rose"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Now
              </a>
              <p className="book-left__secondary">
                Prefer to reach us directly? That works too.
              </p>
            </div>

            {/* Right — Contact Cards */}
            <div className="book-right">
              {CONTACTS.map(({ icon, value, label }) => (
                <div key={value} className="book-contact-card">
                  <span className="book-contact-card__icon">{icon}</span>
                  <div className="book-contact-card__info">
                    <p className="book-contact-card__value">{value}</p>
                    <p className="book-contact-card__label">{label}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 — What Happens Next */}
      <section className="dot-section dot-section--alt">
        <div className="dot-section__inner">
          <h2 className="dot-heading">What Happens Next</h2>
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

    </PageShell>
  )
}
