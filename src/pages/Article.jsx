import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Nav, Footer } from './PageShell'
import { getBySlug } from '../blog/articles'

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

export default function Article() {
  const { slug } = useParams()
  const article = getBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  const url = `https://refynme.com/blog/${article.slug}`

  return (
    <div className="article-page">
      {/* Per-article metadata — React 19 hoists these into <head> */}
      <title>{`${article.title} — RefynMe`}</title>
      <meta name="description" content={article.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />

      <Nav />

      <article className="article">
        <div className="article__inner">
          <Link to="/blog" className="article__back">← Back to Blog</Link>

          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="blog-hero"
            />
          )}

          <h1 className="article__title">{article.title}</h1>
          <time className="article__date" dateTime={article.date}>
            {formatDate(article.date)}
          </time>

          <div className="blog-prose">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* ── CTA Strip ──────────────────────────────── */}
      <section className="blog-cta">
        <h2 className="blog-cta__heading">Ready to feel like yourself again?</h2>
        <Link to="/contact" className="btn btn--rose">Book a Consultation</Link>
      </section>

      <Footer />
    </div>
  )
}
