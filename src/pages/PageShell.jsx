import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ── Shared Nav ─────────────────────────────────────────── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}`} style={{ background: scrolled ? undefined : 'rgba(44,24,16,0.97)' }}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-mark">R</span>
          <span className="nav__logo-text">
            Refyn<span className="nav__logo-gold">Me</span>
          </span>
        </Link>
        <ul className="nav__links">
          <li><Link to="/about" className="nav__link">About</Link></li>
          <li><Link to="/services" className="nav__link">Services</Link></li>
          <li><Link to="/weight-loss" className="nav__link">Weight Loss</Link></li>
          <li><Link to="/aesthetics" className="nav__link">Aesthetics</Link></li>
          <li><Link to="/services/dot-exams" className="nav__link">DOT Exams</Link></li>
          <li><Link to="/contact" className="nav__link">Contact</Link></li>
        </ul>
        <Link to="/book" className="btn btn--rose btn--sm">Book Now</Link>
      </div>
    </nav>
  )
}

/* ── Shared Footer ──────────────────────────────────────── */
export function Footer() {
  return (
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
            {['Medical Weight Loss', 'GLP-1 Injections', 'Botox', 'Dermal Fillers', 'Lip Enhancement', 'Jawline Sculpting'].map((item) => (
              <li key={item}><Link to="/services" className="footer__nav-link">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Company</h4>
          <ul className="footer__nav">
            {[['About Us', '/about'], ['Our Provider', '/about'], ['Patient Stories', '/about'], ['Blog', '/about'], ['FAQ', '/about'], ['Privacy Policy', '/about']].map(([label, path]) => (
              <li key={label}><Link to={path} className="footer__nav-link">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__nav footer__nav--contact">
            <li>Brockton, Massachusetts</li>
            <li>(508) 000-0000</li>
            <li>hello@refynme.com</li>
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
  )
}

/* ── Page Shell ─────────────────────────────────────────── */
export function PageShell({ title, subtitle, credential, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <main className="page-hero">
        <div className="page-hero__inner">
          <p className="label label--gold page-hero__label">RefynMe</p>
          <h1 className="page-hero__heading">
            <em className="page-hero__title-gold">{title}</em>
          </h1>
          {credential && (
            <p className="page-hero__credential">{credential}</p>
          )}
          <p className="page-hero__sub">
            {subtitle || 'This page is coming soon. Book a free consultation while you wait.'}
          </p>
          <Link to="/book" className="btn btn--rose" style={{ marginTop: '8px' }}>
            Book a Free Consultation
          </Link>
        </div>
      </main>

      {children}

      <Footer />
    </div>
  )
}
