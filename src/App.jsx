import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
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
  return (
    <div className="banner">
      <span className="banner__text">✦ WEBSITE LAUNCHING SOON — BOOKING NOW OPEN ✦</span>
      <Link to="/contact" className="banner__cta">Book Now</Link>
    </div>
  )
}

/* ── NAV ────────────────────────────────────────────────── */
function Nav() {
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
          <li><Link to="/" className="nav__overlay-link" onClick={close}>Home</Link></li>
          <li><Link to="/about" className="nav__overlay-link" onClick={close}>About</Link></li>
          <li><Link to="/services" className="nav__overlay-link" onClick={close}>Services</Link></li>
          <li><Link to="/weight-loss" className="nav__overlay-link" onClick={close}>Weight Loss</Link></li>
          <li><Link to="/aesthetics" className="nav__overlay-link" onClick={close}>Aesthetics</Link></li>
          <li><Link to="/services/dot-exams" className="nav__overlay-link" onClick={close}>DOT Exams</Link></li>
          <li><Link to="/contact" className="nav__overlay-link" onClick={close}>Contact</Link></li>
        </ul>
        <Link to="/contact" className="btn btn--rose nav__overlay-book" onClick={close}>Book Now</Link>
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
          <li><Link to="/about" className="nav__link">About</Link></li>
          <li><Link to="/services" className="nav__link">Services</Link></li>
          <li><Link to="/weight-loss" className="nav__link">Weight Loss</Link></li>
          <li><Link to="/aesthetics" className="nav__link">Aesthetics</Link></li>
          <li><Link to="/services/dot-exams" className="nav__link">DOT Exams</Link></li>
          <li><Link to="/contact" className="nav__link">Contact</Link></li>
        </ul>
        <Link to="/contact" className="btn btn--rose btn--sm nav__book-desktop">Book Now</Link>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}

/* ── HERO ───────────────────────────────────────────────── */
function Hero() {
  return (
    <div className="hero-wrapper">
      <section className="hero">
        {/* LEFT — text content only, no badges */}
        <div className="hero__left">
          <h1 className="hero__heading" style={{ animationDelay: '0.1s' }}>
            Refined care
          </h1>
          <h1 className="hero__heading hero__heading--italic" style={{ animationDelay: '0.25s' }}>
            <em>for the way you want</em>
          </h1>
          <h1 className="hero__heading" style={{ animationDelay: '0.4s' }}>
            to look, feel and live.
          </h1>

          <div className="hero__sub-wrap" style={{ animationDelay: '0.55s' }}>
            <p className="hero__sub-heading">
              Personalized Care for Your Best Health, Energy, and Confidence
            </p>
            <p className="hero__sub">
              At RefynMe Medical Aesthetics and Wellness, every care plan is built around
              your unique goals — from medical weight management to aesthetic treatments.
              We combine compassion, clinical expertise, and evidence-based medicine so
              you can look, feel, and live your best.
            </p>
          </div>

          <div className="hero__btns" style={{ animationDelay: '0.7s' }}>
            <Link to="/contact" className="btn btn--rose">Book a Consultation →</Link>
            <Link to="/services" className="btn btn--outline-cream">Our Services</Link>
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
                <div className="hero__badge-title">Board-Certified</div>
                <div className="hero__badge-sub">Nurse Practitioner</div>
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
          <span className="mission__label-text">Our Mission</span>
          <span className="mission__line" />
        </div>

        {/* Heading */}
        <h2 className="mission__heading">
          Care that goes{' '}
          <span className="mission__heading-gold">beyond the treatment.</span>
        </h2>

        {/* Body */}
        <p className="mission__body">
          We are dedicated to helping patients look, feel, and live their best
          through individualized, evidence-based care — delivering safe, effective,
          and compassionate treatment that builds lasting wellness and confidence.
        </p>

        {/* Stats */}
        <div className="mission__stats">
          <div className="mission__stat">
            <span className="mission__stat-num">100%</span>
            <span className="mission__stat-label">Personalized</span>
          </div>
          <div className="mission__divider" />
          <div className="mission__stat">
            <span className="mission__stat-num">NP</span>
            <span className="mission__stat-label">Board-Certified</span>
          </div>
          <div className="mission__divider" />
          <div className="mission__stat">
            <span className="mission__stat-num">MA</span>
            <span className="mission__stat-label">Licensed</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TRUST BUILDER ──────────────────────────────────────── */
function Trust() {
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
              <span className="trust__years-label">years in the healthcare industry serving the community</span>
            </div>
          </div>
        </div>
      </div>

      <div className="trust__right">
        <div className="section-label">
          <span className="section-label__line" />
          <span className="label label--gold">Meet Your Provider</span>
        </div>
        <h2 className="trust__heading">
          Expert care.<br />
          Finally close to <em className="italic-rose">home.</em>
        </h2>
        <p className="trust__body">
          As a board-certified Nurse Practitioner rooted right here in Brockton,
          I combine clinical precision with genuine community care. You're not a
          number — you're a neighbor. And you deserve a provider who treats you
          that way.
        </p>
        <ul className="trust__creds">
          {[
            'Board-Certified Nurse Practitioner (NP-BC)',
            'Specialized training in medical weight management',
            'Advanced aesthetic injector — Botox & fillers',
            'Brockton resident & community advocate',
          ].map((cred) => (
            <li key={cred} className="trust__cred">
              <span className="trust__diamond">✦</span>
              {cred}
            </li>
          ))}
        </ul>
        <Link to="/about" className="btn btn--rose">Read My Full Story →</Link>
      </div>
    </section>
  )
}

/* ── COVERAGE SIGNAL ────────────────────────────────────── */
function CoverageSignal() {
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
          Care that comes to the South Shore.
        </p>
        <div className="coverage__towns">
          {towns.map((town) => (
            <span key={town} className="coverage__pill">
              {town}
            </span>
          ))}
        </div>
        <Link to="/contact" className="coverage__link">
          See if we serve your area →
        </Link>
      </div>
    </div>
  )
}

/* ── SERVICES ───────────────────────────────────────────── */
function ServicesPanels() {
  const [ref, inView] = useInView()

  return (
    <section className={`services fade-up${inView ? ' in-view' : ''}`} ref={ref}>

      <div className="services__header">
        <div className="services__header-label">
          <span className="services__header-line" />
          <span className="label label--gold">What We Offer</span>
          <span className="services__header-line" />
        </div>
        {/* FIX 9 — italic gold 'RefynMe.' */}
        <h2 className="services__heading">
          Two ways to <em className="services__heading-gold">RefynMe.</em>
        </h2>
      </div>

      {/* Panel 1 — Weight Loss */}
      <div className="panel panel--dark">
        <div className="panel__content">
          <span className="label label--gold label--sm">01 — Medical Weight Loss</span>
          <h3 className="panel__heading">Real results.<br />Real medicine.</h3>
          {/* FIX 12 */}
          <p className="panel__body">
            Clinically prescribed programs built for your body and your life.
            GLP-1 injections, oral medications, and personalized dietary guidance —
            supervised by a medical professional who actually knows your name.
          </p>
          <ul className="panel__tags">
            {['GLP-1 Injections', 'Oral Medications', 'Dietary Guidance', 'Ongoing Support'].map(
              (tag) => (
                <li key={tag} className="panel__tag panel__tag--gold">{tag}</li>
              )
            )}
          </ul>
          <Link to="/weight-loss" className="btn btn--rose btn--panel">Explore Weight Loss →</Link>
        </div>
        <div className="panel__media">
          <div className="panel__photo panel__photo--dark">
            <span className="panel__photo-label">Weight Loss Photo</span>
          </div>
          <div className="panel__badge panel__badge--dark">Medically Prescribed</div>
        </div>
      </div>

      {/* Panel 2 — Aesthetics */}
      <div className="panel panel--light panel--reversed">
        <div className="panel__media">
          <div className="panel__photo panel__photo--cream">
            <span className="panel__photo-label">Before / After Photo</span>
          </div>
          <div className="panel__badge panel__badge--white">Natural Results</div>
        </div>
        <div className="panel__content panel__content--white">
          <span className="label label--rose label--sm">02 — Aesthetic Services</span>
          {/* FIX 13 */}
          <h3 className="panel__heading panel__heading--dark">
            Look like yourself.<br />Only more you.
          </h3>
          <p className="panel__body panel__body--dark">
            Botox, dermal fillers, and aesthetic treatments administered by a
            board-certified NP. Not a technician with a certificate. A medical
            professional who understands anatomy.
          </p>
          <ul className="panel__tags">
            {['Botox', 'Dermal Fillers', 'Lip Enhancement', 'Jawline Sculpting'].map((tag) => (
              <li key={tag} className="panel__tag panel__tag--rose">{tag}</li>
            ))}
          </ul>
          <Link to="/aesthetics" className="btn btn--rose btn--panel">Explore Aesthetics →</Link>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      'I had been trying to lose weight for three years. She actually looked at my labs, asked about my life, and built a plan for me. I have lost 24 lbs and I finally feel like myself again.',
    name: 'Maria T.',
    city: 'Brockton',
    service: 'Weight Loss',
    tagStyle: 'tcard__tag--gold',
  },
  {
    quote:
      'I was nervous about Botox but she made me feel so comfortable. She explained every step and the results are so natural. My coworkers keep asking what I am doing differently.',
    name: 'Keisha M.',
    city: 'Brockton',
    service: 'Aesthetics',
    tagStyle: 'tcard__tag--rose',
  },
  {
    quote:
      'Finally a provider who understands my skin tone and treats me like a person. Her medical background shows in everything she does. I will not go anywhere else.',
    name: 'Sandra R.',
    city: 'Stoughton',
    service: 'Aesthetics',
    tagStyle: 'tcard__tag--rose',
  },
]

function Testimonials() {
  const [ref, inView] = useInView()

  return (
    <section className={`testimonials fade-up${inView ? ' in-view' : ''}`} ref={ref}>
      <div className="testimonials__inner">
        <div className="section-label section-label--center">
          <span className="section-label__line" />
          <span className="label label--gold">Patient Stories</span>
          <span className="section-label__line" />
        </div>
        <h2 className="testimonials__heading">Real results. Real people.</h2>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="tcard">
              <div className="tcard__stars">★★★★★</div>
              <p className="tcard__quote">
                <em>"{t.quote}"</em>
              </p>
              <div className="tcard__footer">
                <div>
                  <div className="tcard__name">{t.name}</div>
                  <div className="tcard__city">{t.city}</div>
                </div>
                <span className={`tcard__tag ${t.tagStyle}`}>{t.service}</span>
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
          <span className="label label--gold">For Our Community</span>
          <span className="section-label__line" />
        </div>
        <h2 className="signal__heading">
          South Shore<br />
          <em className="signal__italic">deserves this.</em>
        </h2>
        {/* FIX 14 */}
        <p className="signal__body">
          For too long, women across the South Shore have driven to
          Boston or Providence for care that should exist right here.
          Brockton. Stoughton. Easton. Bridgewater. You shouldn't
          have to travel an hour to see a provider who actually sees
          you. RefynMe was built so you don't have to.
        </p>
      </div>
    </section>
  )
}

/* ── FINAL CTA + FOOTER ─────────────────────────────────── */
function CtaFooter() {
  const [ref, inView] = useInView()

  return (
    <>
      {/* FIX 16 */}
      <section className={`cta-section fade-up${inView ? ' in-view' : ''}`} ref={ref}>
        <div className="cta-box">
          <div className="cta-box__left">
            <span className="label label--gold">Start Today</span>
            <h2 className="cta-box__heading">
              Ready to start?<br />
              <em className="cta-box__italic">We are ready for you.</em>
            </h2>
            <p className="cta-box__sub">
              Book a consultation. No pressure. No commitment.
            </p>
          </div>
          <div className="cta-box__right">
            <Link to="/contact" className="btn btn--rose btn--lg">Book a Consultation →</Link>
            <p className="cta-box__phone">Or call us: 774-312-9806</p>
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
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__nav">
              {[['Medical Weight Loss', '/weight-loss'], ['GLP-1 Injections', '/weight-loss'], ['Botox', '/aesthetics'], ['Dermal Fillers', '/aesthetics'], ['Lip Enhancement', '/aesthetics'], ['Jawline Sculpting', '/aesthetics']].map(([label, path]) => (
                <li key={label}><Link to={path} className="footer__nav-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__nav">
              {[['About Us', '/about'], ['Our Provider', '/about'], ['Patient Stories', '/about'], ['Blog', '/blog'], ['FAQ', '/about'], ['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms']].map(([label, path]) => (
                <li key={label}><Link to={path} className="footer__nav-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__nav footer__nav--contact">
              <li>Brockton, Massachusetts</li>
              <li>774-312-9806</li>
              <li>refynmemedical@gmail.com</li>
              <li>Mon–Fri: 9am – 6pm</li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p className="footer__copy">© 2026 RefynMe. All rights reserved.</p>
          <p className="footer__bar-tagline">
            <em>Because you deserve care that gets you.</em>
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
