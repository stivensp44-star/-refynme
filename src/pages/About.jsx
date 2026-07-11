import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="about-page">
      <Nav />

      {/* Section 1 — Intro */}
      <section className="about-section about-intro">
        <div className="about-section__inner">
          {/* PROVIDER PHOTO: pending professional shots */}
          <h1 className="about-heading">
            The best care she ever gave started with an explanation.
          </h1>
          <p className="about-body">
            Twenty years in healthcare teaches you what actually changes people.
            It's rarely the prescription. It's the moment a patient finally
            understands her own body — what the number means, why the medication
            works, what happens next. Mydwine has built her career on that moment.
          </p>
          <p className="about-body">
            Since 2005, from the nursing floor to board-certified Nurse
            Practitioner, she's practiced one way: evidence first, education
            always. Because a patient who understands her plan follows it. A
            patient who's handed a plan she doesn't understand abandons it in the
            parking lot.
          </p>
          <p className="about-body">
            And somewhere in those two decades, she noticed what understanding
            does to a person. They sit differently. They ask better questions.
            They stop apologizing for being in the room.
          </p>
          <p className="about-pull">
            That's confidence. It was never separate from health. It's what
            health looks like when it's done properly.
          </p>
        </div>
      </section>

      {/* Section 2 — The philosophy, practiced */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <h2 className="about-heading">
            RefynMe is that philosophy, given an address.
          </h2>
          <p className="about-body">
            Here, weight loss is not a handout and a hope. It's medically
            supervised — GLP-1 therapy where it's appropriate, labs that get
            read, follow-ups that actually follow up — and at every step you'll
            know <em>why</em>: why this dose, why this pace, why your energy is
            returning along with your shape.
          </p>
          <p className="about-body">
            Here, aesthetics is a clinical skill, not a sales pitch. Botox,
            Dysport, and dermal fillers placed by a provider who spent twenty
            years studying faces for what they reveal about health before she
            ever refined one. She'll tell you what will work, what won't, and
            what you don't need — then you decide. You leave looking like
            yourself on your best day. That's the standard.
          </p>
          <p className="about-body">
            Underneath it all runs the discipline she's never dropped:
            prevention. Bloodwork, screenings, straight answers — the quiet work
            that keeps small things small.
          </p>
          <p className="about-body">
            And for the drivers who keep this region moving — she's a certified
            NRCME examiner for DOT physicals. Efficient, exacting, and respectful
            of the fact that this exam is your paycheck.
          </p>
        </div>
      </section>

      {/* Section 3 — Closing */}
      <section className="about-section">
        <div className="about-section__inner">
          <h2 className="about-heading">
            Care this good used to require a drive.
          </h2>
          <p className="about-body">
            For years, patients here took the highway — Boston, Providence — for
            expertise that should never have been an hour away. Mydwine sat with
            that long enough, then answered it: open the practice here. Bring the
            standard to the community, instead of making the community commute to
            the standard.
          </p>
          <p className="about-body">
            The knowledge stays in the room with you. That's the practice.
          </p>
        </div>
      </section>

      {/* Section 4 — Credentials + CTA */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <p className="about-credline">
            Board-certified Nurse Practitioner · In healthcare since 2005 · NRCME-certified DOT examiner
          </p>
          <Link to="/contact" className="btn btn--rose">Book a Consultation</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
