import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

const TREATMENTS = [
  {
    tag: 'Wrinkle Relaxer',
    title: 'Botox / Dysport',
    desc: "Softens forehead lines, crow's feet, and frown lines. Results in 3–5 days, lasting 3–4 months.",
  },
  {
    tag: 'Volume + Lift',
    title: 'Dermal Fillers',
    desc: 'Restores lost volume in cheeks, lips, and under-eyes. Natural-looking results, not overfilled.',
  },
  {
    tag: 'Lip Enhancement',
    title: 'Lip Filler',
    desc: 'Definition, volume, or both — shaped to your face. Results in 2 weeks. Reversible.',
  },
  {
    tag: 'Preventive Care',
    title: 'Consultation + Plan',
    desc: 'Not ready to commit? A full aesthetic consultation to map your goals and set a realistic plan.',
  },
]

const FAQS = [
  {
    q: 'Does it hurt?',
    a: 'Botox feels like a small pinch. Fillers use a topical numbing cream beforehand. Most patients describe it as mild pressure, not pain.',
  },
  {
    q: 'How long does it take?',
    a: 'Botox appointments run 20–30 minutes. Filler appointments 30–45 minutes. Consultation included.',
  },
  {
    q: "What if I don't like my results?",
    a: 'Botox fades naturally in 3–4 months. Hyaluronic acid fillers can be dissolved the same day with an enzyme called hyaluronidase.',
  },
  {
    q: 'Is a consultation required?',
    a: "It's included with every appointment. If you want to talk through your goals before committing, we offer a free 15-minute call first.",
  },
]

export default function Aesthetics() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="aes-page">
      <Nav />

      {/* ── 1. Hero ───────────────────────────────── */}
      <section className="aes-hero">
        <div className="aes-hero__left">
          <p className="label label--gold">Medical Aesthetics</p>
          <h1 className="aes-hero__heading">Results you see. Confidence you own.</h1>
          <p className="aes-hero__body">
            Botox and dermal fillers administered by a board-certified Nurse Practitioner.
            Precise. Personalized. No cookie-cutter results.
          </p>
          <div className="aes-hero__btns">
            <Link to="/book" className="btn btn--rose">Book a Consultation</Link>
            <a href="#treatments" className="btn btn--outline-cream">See Treatments</a>
          </div>
        </div>
        <div className="aes-hero__right">
          <img
            src="/images/aesthetics-treatment.png"
            alt="Aesthetic treatment in progress"
            className="aes-hero__photo"
          />
        </div>
      </section>

      {/* ── 2. Gold Divider ───────────────────────── */}
      <div className="aes-divider" role="presentation" />

      {/* ── 3. Treatments ─────────────────────────── */}
      <section className="aes-treatments" id="treatments">
        <div className="aes-treatments__inner">
          <div className="aes-section-header">
            <p className="label label--rose">What we offer</p>
            <h2 className="aes-h2">Treatments that work without working you over.</h2>
            <p className="aes-subtext">
              Every treatment is customized to your anatomy, your goals, and your comfort level.
              No upselling. No pressure.
            </p>
          </div>
          <div className="aes-cards">
            {TREATMENTS.map(({ tag, title, desc }) => (
              <div key={title} className="aes-card">
                <div className="aes-card__placeholder" />
                <div className="aes-card__content">
                  <span className="aes-card__tag">{tag}</span>
                  <h3 className="aes-card__title">{title}</h3>
                  <p className="aes-card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Credentials ────────────────────────── */}
      <section className="aes-creds">
        <div className="aes-creds__inner">
          <div className="aes-section-header aes-section-header--dark">
            <p className="label label--gold">Why it matters who holds the needle</p>
            <h2 className="aes-creds__heading">Medical training. Aesthetic eye.</h2>
          </div>
          <div className="aes-creds__grid">
            <img
              src="/images/provider-consultation.png"
              alt="Provider in consultation"
              className="aes-creds__photo"
            />
            <div className="aes-creds__content">
              <p className="aes-creds__body">
                Your NP is board-certified with clinical training across primary care and aesthetics.
                That means she understands your anatomy medically — not just visually.
              </p>
              <p className="aes-creds__body">
                She knows what happens if a filler is placed too deep. She knows how to manage a
                bruise, a vascular concern, or a result you're not happy with. That's the difference.
              </p>
              <div className="aes-creds__pills">
                <span className="aes-creds__pill">NP Board-Certified</span>
                <span className="aes-creds__pill">MA Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ────────────────────────────────── */}
      <section className="aes-faq">
        <div className="aes-faq__inner">
          <div className="aes-section-header">
            <p className="label label--rose">Common questions</p>
            <h2 className="aes-h2">What people ask before booking.</h2>
          </div>
          <div className="aes-faq__list">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="aes-faq__item">
                <h3 className="aes-faq__q">{q}</h3>
                <p className="aes-faq__a">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Strip ──────────────────────────── */}
      <section className="aes-cta-strip">
        <h2 className="aes-cta-strip__heading">Ready to see the difference?</h2>
        <p className="aes-cta-strip__sub">No pressure, no obligation.</p>
        <Link to="/book" className="btn btn--cream-espresso">Book a Consultation</Link>
      </section>

      <Footer />
    </div>
  )
}
