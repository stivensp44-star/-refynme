import { useEffect } from 'react'
import { Nav, Footer } from './PageShell'

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="con-page">
      <Nav />

      {/* ── 1. Statement ──────────────────────────────────── */}
      <section className="con-statement">
        <div className="con-statement__deco">
          <div className="con-statement__deco-inner" />
        </div>
        <div className="con-rule" />
        <h1 className="con-statement__h1">
          You shouldn't have to travel far to be<br />
          <em className="con-statement__gold">treated well.</em>
        </h1>
        <p className="con-statement__sub">
          We respond within one business day. No call centers, no automated replies — a real provider who knows your name.
        </p>
      </section>

      {/* ── 2. Gold Divider ───────────────────────────────── */}
      <div className="con-divider" />

      {/* ── 3. Body Grid ──────────────────────────────────── */}
      <div className="con-body">

        {/* Left Column */}
        <div className="con-left">
          <p className="con-eyebrow">Reach us directly</p>

          <div className="con-info-blocks">
            <div className="con-info-block">
              <span className="con-info-block__label">Phone</span>
              <span className="con-info-block__value">774-312-9806</span>
              <span className="con-info-block__note">Mon – Fri, 9am – 5pm</span>
            </div>
            <div className="con-info-block">
              <span className="con-info-block__label">Email</span>
              <span className="con-info-block__value">refynmemedical@gmail.com</span>
              <span className="con-info-block__note">Response within 1 business day</span>
            </div>
            <div className="con-info-block">
              <span className="con-info-block__label">Location</span>
              <span className="con-info-block__value">Greater Brockton area, MA</span>
              <span className="con-info-block__note">Address confirmed upon booking</span>
            </div>
          </div>

          <hr className="con-left__divider" />

          <blockquote className="con-quote">
            <p className="con-quote__text">
              "Every patient deserves the same quality of care — regardless of where they live or how far they can travel."
            </p>
            <cite className="con-quote__attr">— RefynMe Medical &amp; Wellness</cite>
          </blockquote>
        </div>

        {/* Right Column */}
        <div className="con-right">
          <p className="con-eyebrow">Request a consultation</p>
          <h2 className="con-right__h2">Tell us how we can help you.</h2>

          <form
            className="con-form"
            action="https://formspree.io/f/xkoaekjo"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New consultation request — RefynMe" />

            <div className="con-form__row--2">
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-first-name">First name</label>
                <input className="con-field__input" id="con-first-name" name="first_name" type="text" required />
              </div>
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-last-name">Last name</label>
                <input className="con-field__input" id="con-last-name" name="last_name" type="text" required />
              </div>
            </div>

            <div className="con-form__row--2">
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-email">Email</label>
                <input className="con-field__input" id="con-email" name="email" type="email" required />
              </div>
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-phone">Phone</label>
                <input className="con-field__input" id="con-phone" name="phone" type="tel" />
              </div>
            </div>

            <div className="con-field">
              <label className="con-field__label" htmlFor="con-interest">I'm interested in</label>
              <select className="con-field__input con-field__select" id="con-interest" name="interest">
                <option value="">— select one —</option>
                <option value="aesthetics">Aesthetics — Botox / Fillers</option>
                <option value="weight-loss">Medical Weight Loss</option>
                <option value="dot">DOT Medical Exam</option>
                <option value="wellness">Primary Care / Wellness</option>
                <option value="unsure">Not sure yet — let's talk</option>
              </select>
            </div>

            <div className="con-field">
              <label className="con-field__label" htmlFor="con-message">Anything you'd like us to know</label>
              <textarea
                className="con-field__input con-field__textarea"
                id="con-message"
                name="message"
                rows={3}
                placeholder="Questions, concerns, or just how you heard about us..."
                required
              />
            </div>

            <div className="con-form__submit-row">
              <button type="submit" className="con-form__btn">Send message →</button>
              <p className="con-form__note">Your information stays private. Always.</p>
            </div>
          </form>
        </div>

      </div>

      {/* ── 4. Footer Strip ───────────────────────────────── */}
      <div className="con-footer-strip">
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">Hours</span>
          <span className="con-footer-strip__value">Mon – Fri, 9am – 5pm</span>
          <span className="con-footer-strip__sub">Weekend availability coming soon</span>
        </div>
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">Response time</span>
          <span className="con-footer-strip__value">Within 1 business day</span>
          <span className="con-footer-strip__sub">No automated replies</span>
        </div>
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">Appointments</span>
          <span className="con-footer-strip__value">By consultation only</span>
          <span className="con-footer-strip__sub">No walk-ins at this time</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}
