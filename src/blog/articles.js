// Loads every Markdown article from src/content/blog, parses its frontmatter,
// and exposes a date-sorted list plus a slug lookup. Add an article by dropping
// a new .md file in src/content/blog — no code changes required.

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: raw.trim() }
  }

  const [, frontmatter, body] = match
  const data = {}

  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.trim()) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // strip surrounding single or double quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }

  return { data, body: body.trim() }
}

const articles = Object.values(modules)
  .map((raw) => {
    const { data, body } = parseFrontmatter(raw)
    return { ...data, body }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function getBySlug(slug) {
  return articles.find((article) => article.slug === slug)
}

export default articles
