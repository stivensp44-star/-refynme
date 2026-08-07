import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

const SECTIONS = [
  {
    h: 'Who We Are',
    body: [
      'RefynMe Medical and Wellness, PLLC is a medical aesthetics and weight loss practice based in Massachusetts (address coming soon). This policy explains what information this website collects, how it is used, and the choices you have.',
    ],
  },
  {
    h: 'Information We Collect',
    body: [
      'We only collect the information you choose to give us through our contact form: your name, email address, phone number, and the message you write.',
      'We do not collect health or medical information through this website at this time. No booking platform is currently connected to this site.',
    ],
  },
  {
    h: 'How We Use Your Information',
    body: [
      'We use the details you submit solely to respond to your inquiry and to follow up about the care you asked about. We do not sell, rent, or share your information with third parties for advertising.',
    ],
  },
  {
    h: 'Cookies and Analytics',
    body: [
      'This site uses no cookies beyond those required for essential site function.',
      'We use Google Analytics to understand how visitors use the site. This collects anonymous usage data only — it does not capture personal identifiers such as your name, email, or phone number.',
    ],
  },
  {
    h: 'HIPAA Notice',
    body: [
      'RefynMe Medical and Wellness, PLLC is HIPAA-aware. No Protected Health Information (PHI) is collected through this website at this time. Any clinical or medical information is handled directly within the practice, not online.',
    ],
  },
  {
    h: 'Data Sharing',
    body: [
      'We do not sell your data. We do not use third-party advertising networks. The only processor involved is Google Analytics, for anonymous usage statistics as described above.',
    ],
  },
  {
    h: 'Your Choices',
    body: [
      'You may request that we delete the information you submitted through the contact form at any time. To do so, contact us using the details below.',
    ],
  },
]

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <main
        style={{
          background: 'var(--white)',
          color: 'var(--espresso)',
          padding: '160px 24px 96px',
          flex: 1,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="label label--gold" style={{ marginBottom: '16px' }}>
            Legal
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--espresso)',
              margin: '0 0 12px',
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--rose)',
              fontWeight: 500,
              margin: '0 0 48px',
            }}
          >
            Last updated: June 23, 2026
          </p>

          {SECTIONS.map(({ h, body }) => (
            <section key={h} style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: '24px',
                  color: 'var(--espresso)',
                  margin: '0 0 14px',
                }}
              >
                {h}
              </h2>
              {body.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    letterSpacing: '0.01em',
                    color: 'var(--espresso)',
                    margin: '0 0 14px',
                  }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section
            style={{
              marginTop: '8px',
              padding: '32px',
              background: 'var(--cream)',
              borderRadius: '6px',
              border: '1px solid var(--cream-dark)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '24px',
                color: 'var(--espresso)',
                margin: '0 0 14px',
              }}
            >
              Contact Us
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '0.01em',
                color: 'var(--espresso)',
                margin: '0 0 14px',
              }}
            >
              Questions about this policy or your information? Reach us at:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.9,
                color: 'var(--espresso)',
              }}
            >
              <li>RefynMe Medical and Wellness, PLLC</li>
              <li>Massachusetts (address coming soon)</li>
              <li>
                <a href="mailto:refynmemedical@gmail.com" style={{ color: 'var(--rose)' }}>
                  refynmemedical@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:7743129806" style={{ color: 'var(--rose)' }}>
                  774-312-9806
                </a>
              </li>
            </ul>
            <Link to="/contact" className="btn btn--rose" style={{ marginTop: '24px' }}>
              Book a Consultation
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
