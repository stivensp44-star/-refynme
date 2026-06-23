import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'

const SECTIONS = [
  {
    h: 'Acceptance of These Terms',
    body: [
      'By accessing or using the website of RefynMe Medical and Wellness, PLLC, you agree to these Terms & Conditions. If you do not agree, please do not use this website.',
    ],
  },
  {
    h: 'Informational Use Only',
    body: [
      'This website is provided for general informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have about a medical condition.',
    ],
  },
  {
    h: 'No Provider-Patient Relationship',
    body: [
      'Visiting this website or submitting the contact form does not create a provider-patient relationship. No such relationship is formed until you have completed a consultation and been formally accepted into care by the practice.',
    ],
  },
  {
    h: 'Consultations Required',
    body: [
      'All services offered by RefynMe Medical and Wellness, PLLC require an in-person or telehealth consultation before treatment. Nothing on this website should be taken as an offer or guarantee of treatment.',
    ],
  },
  {
    h: 'Pricing',
    body: [
      'Any pricing referenced on this website or in communications is subject to change without notice. Final pricing is confirmed at the time of consultation.',
    ],
  },
  {
    h: 'Right to Refuse Service',
    body: [
      'RefynMe Medical and Wellness, PLLC reserves the right to refuse service to anyone, at its sole discretion, consistent with applicable law and sound clinical judgment.',
    ],
  },
  {
    h: 'Intellectual Property',
    body: [
      'All content, text, and images on this website are the property of RefynMe Medical and Wellness, PLLC and may not be copied, reproduced, or used without prior written permission.',
    ],
  },
  {
    h: 'Governing Law',
    body: [
      'These Terms & Conditions are governed by the laws of the Commonwealth of Massachusetts. Any disputes arising from your use of this website or our services will be resolved in the courts of the Commonwealth of Massachusetts.',
    ],
  },
]

export default function TermsAndConditions() {
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
            Terms &amp; Conditions
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
              Questions about these terms? Reach us at:
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
              <li>Brockton, MA (Address Coming Soon)</li>
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
            <Link to="/book" className="btn btn--rose" style={{ marginTop: '24px' }}>
              Book a Consultation
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
