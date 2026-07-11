import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './App.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import About from './pages/About'
import Services from './pages/Services'
import WeightLoss from './pages/WeightLoss'
import Aesthetics from './pages/Aesthetics'
import Contact from './pages/Contact'
import DotExams from './pages/DotExams'
import HormoneVitaminTherapy from './pages/HormoneVitaminTherapy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import BlogIndex from './pages/BlogIndex'
import Article from './pages/Article'

/* ── useInView hook ─────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

/* ── ANNOUNCEMENT BANNER ────────────────────────────────── */
function Banner() {
  const { t } = useTranslation()
  return (
    <div className="banner">
      <span className="banner__text">{t('home.banner.text')}</span>
      <Link to="/contact" className="banner__cta">{t('home.banner.cta')}</Link>
    </div>
  )
}

/* ── NAV ────────────────────────────────────────────────── */
function Nav() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}`}>
      <div className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}>
        <ul className="nav__overlay-links">
          <li><Link to="/" className="nav__overlay-link" onClick={close}>{t('nav.home')}</Link></li>
          <li><Link to="/about" className="nav__overlay-link" onClick={close}>{t('nav.about')}</Link></li>
          <li><Link to="/services" className="nav__overlay-link" onClick={close}>{t('nav.services')}</Link></li>
          <li><Link to="/weight-loss" className="nav__overlay-link" onClick={close}>{t('nav.weightLoss')}</Link></li>
          <li><Link to="/aesthetics" className="nav__overlay-link" onClick={close}>{t('nav.aesthetics')}</Link></li>
          <li><Link to="/services/dot-exams" className="nav__overlay-link" onClick={close}>{t('nav.dotExams')}</Link></li>
          <li><Link to="/contact" className="nav__overlay-link" onClick={close}>{t('nav.contact')}</Link></li>
        </ul>
        <LanguageSwitcher variant="overlay" />
        <Link to="/contact" className="btn btn--rose nav__overlay-book" onClick={close}>{t('nav.bookNow')}</Link>
      </div>

      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img
            src="/images/refynme-logo-gold.png"
            alt="RefynMe Medical Aesthetics & Wellness"
            className="nav-logo-img"
          />
        </Link>
        <ul className="nav__links">
          <li><Link to="/about" className="nav__link">{t('nav.about')}</Link></li>
          <li><Link to="/services" className="nav__link">{t('nav.services')}</Link></li>
          <li><Link to="/weight-loss" className="nav__link">{t('nav.weightLoss')}</Link></li>
          <li><Link to="/aesthetics" className="nav__link">{t('nav.aesthetics')}</Link></li>
          <li><Link to="/services/dot-exams" className="nav__link">{t('nav.dotExams')}</Link></li>
          <li><Link to="/contact" className="nav__link">{t('nav.contact')}</Link></li>
        </ul>
        <LanguageSwitcher />
        <Link to="/contact" className="btn btn--rose btn--sm nav__book-desktop">{t('nav.bookNow')}</Link>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}

/* ── HERO ───────────────────────────────────────────────── */
function Hero() {
  const { t } = useTranslation()
  return (
    <div className="hero-wrapper">
      <section className="hero">
        {/* LEFT — text content only, no badges */}
        <div className="hero__left">
          <h1 className="hero__heading" style={{ animationDelay: '0.1s' }}>
            {t('home.hero.heading1')}
          </h1>
          <h1 className="hero__heading hero__heading--italic" style={{ animationDelay: '0.25s' }}>
            <em>{t('home.hero.heading2')}</em>
          </h1>
          <h1 className="hero__heading" style={{ animationDelay: '0.4s' }}>
            {t('home.hero.heading3')}
          </h1>

          <div className="hero__sub-wrap" style={{ animationDelay: '0.55s' }}>
            <p className="hero__sub-heading">
              {t('home.hero.subHeading')}
            </p>
            <p className="hero__sub">
              {t('home.hero.sub')}
            </p>
          </div>

          <div className="hero__btns" style={{ animationDelay: '0.7s' }}>
            <Link to="/contact" className="btn btn--rose">{t('home.hero.ctaPrimary')}</Link>
            <Link to="/services" className="btn btn--outline-cream">{t('home.hero.ctaSecondary')}</Link>
          </div>
        </div>

        {/* RIGHT — photo + badges anchored here */}
        <div className="hero__right">
          <div className="hero__photo-wrap">
            <img
              src="/images/provider-hero.png"
              alt="RefynMe Medical Aesthetics and Wellness — Board-Certified Nurse Practitioner"
              className="hero__photo-img"
            />

            {/* Badge — near top of photo */}
            <div className="hero__badge hero__badge--cert" style={{ animationDelay: '0.9s' }}>
              <div className="hero__badge-icon">✦</div>
              <div>
                <div className="hero__badge-title">{t('home.hero.badgeTitle')}</div>
                <div className="hero__badge-sub">{t('home.hero.badgeSub')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── MISSION STRIP ──────────────────────────────────────── */
function MissionStrip() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={`mission fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="mission__circles">
        <div className="mission__circle mission__circle--1" />
        <div className="mission__circle mission__circle--2" />
      </div>

      <div className="mission__inner">
        {/* Label row */}
        <div className="mission__label-row">
          <span className="mission__line" />
          <span className="mission__label-text">{t('home.mission.label')}</span>
          <span className="mission__line" />
        </div>

        {/* Heading */}
        <h2 className="mission__heading">
          {t('home.mission.heading')}{' '}
          <span className="mission__heading-gold">{t('home.mission.headingGold')}</span>
        </h2>

        {/* Body */}
        <p className="mission__body">
          {t('home.mission.body')}
        </p>

        {/* Stats */}
        <div className="mission__stats">
          <div className="mission__stat">
            <span className="mission__stat-num">100%</span>
            <span className="mission__stat-label">{t('home.mission.stat1Label')}</span>
          </div>
          <div className="mission__divider" />
          <div className="mission__stat">
            <span className="mission__stat-num">NP</span>
            <span className="mission__stat-label">{t('home.mission.stat2Label')}</span>
          </div>
          <div className="mission__divider" />
          <div className="mission__stat">
            <span className="mission__stat-num">MA</span>
            <span className="mission__stat-label">{t('home.mission.stat3Label')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TRUST BUILDER ──────────────────────────────────────── */
function Trust() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={`trust fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="trust__left">
        <div className="trust__img-wrap">
          {/* Corner brackets — decorative gold corners */}
          <div className="trust__bracket trust__bracket--tl" />
          <div className="trust__bracket trust__bracket--br" />

          {/* Image placeholder with years card fully inside */}
          <div className="trust__img-placeholder">
            <div className="trust__years-card">
              <span className="trust__years-num">20+</span>
              <span className="trust__years-label">{t('home.trust.yearsLabel')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="trust__right">
        <div className="section-label">
          <span className="section-label__line" />
          <span className="label label--gold">{t('home.trust.label')}</span>
        </div>
        <h2 className="trust__heading">
          {t('home.trust.heading1')}<br />
          {t('home.trust.heading2')} <em className="italic-rose">{t('home.trust.headingEm')}</em>
        </h2>
        <p className="trust__body">
          {t('home.trust.body')}
        </p>
        <ul className="trust__creds">
          {['cred1', 'cred2', 'cred3', 'cred4'].map((credKey) => (
            <li key={credKey} className="trust__cred">
              <span className="trust__diamond">✦</span>
              {t(`home.trust.${credKey}`)}
            </li>
          ))}
        </ul>
        <Link to="/about" className="btn btn--rose">{t('home.trust.cta')}</Link>
      </div>
    </section>
  )
}

/* ── COVERAGE SIGNAL ────────────────────────────────────── */
function CoverageSignal() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const towns = [
    'Brockton',
    'Stoughton',
    'Easton',
    'Bridgewater',
    'Canton',
  ]
  return (
    <div className={`coverage fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="coverage__inner">
        <p className="coverage__label">
          {t('home.coverage.label')}
        </p>
        <div className="coverage__towns">
          {towns.map((town) => (
            <span key={town} className="coverage__pill">
              {town}
            </span>
          ))}
        </div>
        <Link to="/contact" className="coverage__link">
          {t('home.coverage.link')}
        </Link>
      </div>
    </div>
  )
}

/* ── SERVICES ───────────────────────────────────────────── */
function ServicesPanels() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={`services fade-up${inView ? ' in-view' : ''}`} ref={ref}>

      <div className="services__header">
        <div className="services__header-label">
          <span className="services__header-line" />
          <span className="label label--gold">{t('home.services.label')}</span>
          <span className="services__header-line" />
        </div>
        {/* FIX 9 — italic gold 'RefynMe.' */}
        <h2 className="services__heading">
          {t('home.services.heading')} <em className="services__heading-gold">{t('home.services.headingBrand')}</em>
        </h2>
      </div>

      {/* Panel 1 — Weight Loss */}
      <div className="panel panel--dark">
        <div className="panel__content">
          <span className="label label--gold label--sm">{t('home.services.panel1.label')}</span>
          <h3 className="panel__heading">{t('home.services.panel1.heading1')}<br />{t('home.services.panel1.heading2')}</h3>
          {/* FIX 12 */}
          <p className="panel__body">
            {t('home.services.panel1.body')}
          </p>
          <ul className="panel__tags">
            {['tag1', 'tag2', 'tag3', 'tag4'].map(
              (tagKey) => (
                <li key={tagKey} className="panel__tag panel__tag--gold">{t(`home.services.panel1.${tagKey}`)}</li>
              )
            )}
          </ul>
          <Link to="/weight-loss" className="btn btn--rose btn--panel">{t('home.services.panel1.cta')}</Link>
        </div>
        <div className="panel__media">
          <div className="panel__photo panel__photo--dark">
            <span className="panel__photo-label">Weight Loss Photo</span>
          </div>
          <div className="panel__badge panel__badge--dark">{t('home.services.panel1.badge')}</div>
        </div>
      </div>

      {/* Panel 2 — Aesthetics */}
      <div className="panel panel--light panel--reversed">
        <div className="panel__media">
          <div className="panel__photo panel__photo--cream">
            <span className="panel__photo-label">Before / After Photo</span>
          </div>
          <div className="panel__badge panel__badge--white">{t('home.services.panel2.badge')}</div>
        </div>
        <div className="panel__content panel__content--white">
          <span className="label label--rose label--sm">{t('home.services.panel2.label')}</span>
          {/* FIX 13 */}
          <h3 className="panel__heading panel__heading--dark">
            {t('home.services.panel2.heading1')}<br />{t('home.services.panel2.heading2')}
          </h3>
          <p className="panel__body panel__body--dark">
            {t('home.services.panel2.body')}
          </p>
          <ul className="panel__tags">
            {['tag1', 'tag2', 'tag3', 'tag4'].map((tagKey) => (
              <li key={tagKey} className="panel__tag panel__tag--rose">{t(`home.services.panel2.${tagKey}`)}</li>
            ))}
          </ul>
          <Link to="/aesthetics" className="btn btn--rose btn--panel">{t('home.services.panel2.cta')}</Link>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    key: 'maria',
    name: 'Maria T.',
    city: 'Brockton',
    tagStyle: 'tcard__tag--gold',
  },
  {
    key: 'keisha',
    name: 'Keisha M.',
    city: 'Brockton',
    tagStyle: 'tcard__tag--rose',
  },
  {
    key: 'sandra',
    name: 'Sandra R.',
    city: 'Stoughton',
    tagStyle: 'tcard__tag--rose',
  },
]

function Testimonials() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={`testimonials fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="testimonials__inner">
        <div className="section-label section-label--center">
          <span className="section-label__line" />
          <span className="label label--gold">{t('home.testimonials.label')}</span>
          <span className="section-label__line" />
        </div>
        <h2 className="testimonials__heading">{t('home.testimonials.heading')}</h2>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((card) => (
            <div key={card.name} className="tcard">
              <div className="tcard__stars">★★★★★</div>
              <p className="tcard__quote">
                <em>"{t(`home.testimonials.${card.key}.quote`)}"</em>
              </p>
              <div className="tcard__footer">
                <div>
                  <div className="tcard__name">{card.name}</div>
                  <div className="tcard__city">{card.city}</div>
                </div>
                <span className={`tcard__tag ${card.tagStyle}`}>{t(`home.testimonials.${card.key}.service`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── BROCKTON SIGNAL ────────────────────────────────────── */
function BrocktonSignal() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={`signal fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="signal__circles">
        <div className="signal__circle signal__circle--1" />
        <div className="signal__circle signal__circle--2" />
      </div>
      <div className="signal__content">
        <div className="section-label section-label--center">
          <span className="section-label__line" />
          <span className="label label--gold">{t('home.signal.label')}</span>
          <span className="section-label__line" />
        </div>
        <h2 className="signal__heading">
          {t('home.signal.heading')}<br />
          <em className="signal__italic">{t('home.signal.headingEm')}</em>
        </h2>
        {/* FIX 14 */}
        <p className="signal__body">
          {t('home.signal.body')}
        </p>
      </div>
    </section>
  )
}

/* ── FINAL CTA + FOOTER ─────────────────────────────────── */
function CtaFooter() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <>
      {/* FIX 16 */}
      <section className={`cta-section fade-up${inView ? ' in-view' : ''}`} ref={ref}>
        <div className="cta-box">
          <div className="cta-box__left">
            <span className="label label--gold">{t('home.cta.label')}</span>
            <h2 className="cta-box__heading">
              {t('home.cta.heading')}<br />
              <em className="cta-box__italic">{t('home.cta.headingEm')}</em>
            </h2>
            <p className="cta-box__sub">
              {t('home.cta.sub')}
            </p>
          </div>
          <div className="cta-box__right">
            <Link to="/contact" className="btn btn--rose btn--lg">{t('home.cta.button')}</Link>
            <p className="cta-box__phone">{t('home.cta.phonePrefix')} 774-312-9806</p>
          </div>
        </div>
      </section>

      {/* FIX 17 */}
      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__logo">
              <span className="footer__logo-mark">R</span>
              <span className="footer__logo-text">
                Refyn<span className="footer__logo-gold">Me</span>
              </span>
            </div>
            <p className="footer__tagline">Results you see. Confidence you own.</p>
            <div className="footer__socials">
              {['IG', 'TK', 'FB'].map((s) => (
                <a key={s} href="#" className="footer__social">{s}</a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.servicesTitle')}</h4>
            <ul className="footer__nav">
              {[['medicalWeightLoss', '/weight-loss'], ['glp1Injections', '/weight-loss'], ['botox', '/aesthetics'], ['dermalFillers', '/aesthetics'], ['lipEnhancement', '/aesthetics'], ['jawlineSculpting', '/aesthetics']].map(([labelKey, path]) => (
                <li key={labelKey}><Link to={path} className="footer__nav-link">{t(`footer.links.${labelKey}`)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.companyTitle')}</h4>
            <ul className="footer__nav">
              {[['aboutUs', '/about'], ['ourProvider', '/about'], ['patientStories', '/about'], ['blog', '/blog'], ['faq', '/about'], ['privacyPolicy', '/privacy-policy'], ['terms', '/terms']].map(([labelKey, path]) => (
                <li key={labelKey}><Link to={path} className="footer__nav-link">{t(`footer.links.${labelKey}`)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.contactTitle')}</h4>
            <ul className="footer__nav footer__nav--contact">
              <li>{t('footer.contact.location')}</li>
              <li>774-312-9806</li>
              <li>refynmemedical@gmail.com</li>
              <li>{t('footer.contact.hours')}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p className="footer__copy">{t('footer.copyright')}</p>
          <p className="footer__bar-tagline">
            <em>{t('footer.barTagline')}</em>
          </p>
        </div>
      </footer>
    </>
  )
}

/* ── HOME PAGE ──────────────────────────────────────────── */
function Home() {
  return (
    <>
      <Banner />
      <Nav />
      <Hero />
      <MissionStrip />
      <Trust />
      <CoverageSignal />
      <ServicesPanels />
      <Testimonials />
      <BrocktonSignal />
      <CtaFooter />
    </>
  )
}

/* ── APP ────────────────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/weight-loss" element={<WeightLoss />} />
      <Route path="/aesthetics" element={<Aesthetics />} />
      <Route path="/book" element={<Navigate to="/contact" replace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services/dot-exams" element={<DotExams />} />
      <Route path="/services/hormone-vitamin-therapy" element={<HormoneVitaminTherapy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<Article />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
