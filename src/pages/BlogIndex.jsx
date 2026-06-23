import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from './PageShell'
import articles from '../blog/articles'

function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="blog-page">
      <Nav />

      {/* ── Header ─────────────────────────────────── */}
      <section className="blog-index-hero">
        <div className="blog-index-hero__inner">
          <h1 className="blog-index-hero__heading">From the Practice</h1>
          <p className="blog-index-hero__sub">
            Real conversations about weight, wellness, and feeling like yourself again.
          </p>
        </div>
      </section>

      {/* ── Article Grid ───────────────────────────── */}
      <section className="blog-index">
        <div className="blog-index__inner">
          <div className="blog-grid">
            {articles.map((article) => (
              <article key={article.slug} className="blog-card">
                <div className="blog-card__body">
                  <time className="blog-card__date" dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <h2 className="blog-card__title">{article.title}</h2>
                  <p className="blog-card__excerpt">{article.excerpt}</p>
                  <Link to={`/blog/${article.slug}`} className="blog-card__link">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────── */}
      <section className="blog-cta">
        <h2 className="blog-cta__heading">Ready to take the first step?</h2>
        <Link to="/contact" className="btn btn--rose">Book a Consultation</Link>
      </section>

      <Footer />
    </div>
  )
}
