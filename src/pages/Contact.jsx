import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Nav, Footer } from './PageShell'

export default function Contact() {
  const { t } = useTranslation()
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
          {t('contact.h1Line1')}<br />
          <em className="con-statement__gold">{t('contact.h1Em')}</em>
        </h1>
        <p className="con-statement__sub">
          {t('contact.sub')}
        </p>
      </section>

      {/* ── 2. Gold Divider ───────────────────────────────── */}
      <div className="con-divider" />

      {/* ── 3. Body Grid ──────────────────────────────────── */}
      <div className="con-body">

        {/* Left Column */}
        <div className="con-left">
          <p className="con-eyebrow">{t('contact.reachEyebrow')}</p>

          <div className="con-info-blocks">
            <div className="con-info-block">
              <span className="con-info-block__label">{t('contact.phoneLabel')}</span>
              <span className="con-info-block__value">774-312-9806</span>
              <span className="con-info-block__note">{t('contact.phoneNote')}</span>
            </div>
            <div className="con-info-block">
              <span className="con-info-block__label">{t('contact.emailLabel')}</span>
              <span className="con-info-block__value">refynmemedical@gmail.com</span>
              <span className="con-info-block__note">{t('contact.emailNote')}</span>
            </div>
            <div className="con-info-block">
              <span className="con-info-block__label">{t('contact.locationLabel')}</span>
              <span className="con-info-block__value">{t('contact.locationValue')}</span>
              <span className="con-info-block__note">{t('contact.locationNote')}</span>
            </div>
          </div>

          <hr className="con-left__divider" />

          <blockquote className="con-quote">
            <p className="con-quote__text">
              "{t('contact.quote')}"
            </p>
            <cite className="con-quote__attr">— RefynMe Medical &amp; Wellness</cite>
          </blockquote>
        </div>

        {/* Right Column */}
        <div className="con-right">
          <p className="con-eyebrow">{t('contact.formEyebrow')}</p>
          <h2 className="con-right__h2">{t('contact.formHeading')}</h2>

          <form
            className="con-form"
            action="https://formspree.io/f/xkoaekjo"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New consultation request — RefynMe" />

            <div className="con-form__row--2">
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-first-name">{t('contact.firstName')}</label>
                <input className="con-field__input" id="con-first-name" name="first_name" type="text" required />
              </div>
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-last-name">{t('contact.lastName')}</label>
                <input className="con-field__input" id="con-last-name" name="last_name" type="text" required />
              </div>
            </div>

            <div className="con-form__row--2">
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-email">{t('contact.email')}</label>
                <input className="con-field__input" id="con-email" name="email" type="email" required />
              </div>
              <div className="con-field">
                <label className="con-field__label" htmlFor="con-phone">{t('contact.phone')}</label>
                <input className="con-field__input" id="con-phone" name="phone" type="tel" />
              </div>
            </div>

            <div className="con-field">
              <label className="con-field__label" htmlFor="con-interest">{t('contact.interestLabel')}</label>
              <select className="con-field__input con-field__select" id="con-interest" name="interest">
                <option value="">{t('contact.interestPlaceholder')}</option>
                <option value="aesthetics">{t('contact.interestAesthetics')}</option>
                <option value="weight-loss">{t('contact.interestWeightLoss')}</option>
                <option value="dot">{t('contact.interestDot')}</option>
                <option value="wellness">{t('contact.interestWellness')}</option>
                <option value="unsure">{t('contact.interestUnsure')}</option>
              </select>
            </div>

            <div className="con-field">
              <label className="con-field__label" htmlFor="con-message">{t('contact.messageLabel')}</label>
              <textarea
                className="con-field__input con-field__textarea"
                id="con-message"
                name="message"
                rows={3}
                placeholder={t('contact.messagePlaceholder')}
                required
              />
            </div>

            <div className="con-form__submit-row">
              <button type="submit" className="con-form__btn">{t('contact.submit')}</button>
              <p className="con-form__note">{t('contact.privacyNote')}</p>
            </div>
          </form>
        </div>

      </div>

      {/* ── 4. Footer Strip ───────────────────────────────── */}
      <div className="con-footer-strip">
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">{t('contact.hoursLabel')}</span>
          <span className="con-footer-strip__value">{t('contact.hoursValue')}</span>
          <span className="con-footer-strip__sub">{t('contact.hoursSub')}</span>
        </div>
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">{t('contact.responseLabel')}</span>
          <span className="con-footer-strip__value">{t('contact.responseValue')}</span>
          <span className="con-footer-strip__sub">{t('contact.responseSub')}</span>
        </div>
        <div className="con-footer-strip__cell">
          <span className="con-footer-strip__label">{t('contact.apptLabel')}</span>
          <span className="con-footer-strip__value">{t('contact.apptValue')}</span>
          <span className="con-footer-strip__sub">{t('contact.apptSub')}</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}
