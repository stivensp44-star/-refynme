# CLAUDE.md — RefynMe Medical and Wellness, PLLC
# READ THIS ENTIRE FILE BEFORE TOUCHING ANY CODE.
# NO EXCEPTIONS. NO ASSUMPTIONS.

---

## WHAT THIS SITE IS

Medical aesthetics + weight loss practice website.
Owner: Board-Certified Nurse Practitioner, Brockton MA.
Entity: RefynMe Medical and Wellness, PLLC (Massachusetts).
Tagline: "Results you see. Confidence you own."
Primary CTA is 'Book a Consultation' — never use 'free' language anywhere on the site.

---

## STACK

- Vite + React 19
- React Router DOM 7
- Pure CSS (no Tailwind, no CSS-in-JS, no component libraries)
- No TypeScript
- Deployed: Hostinger shared hosting via GitHub Actions CI/CD

---

## REPO & DEPLOYMENT

- Repo: github.com/stivensp44-star/-refynme
- Branch: main = live production. Every push deploys immediately.
- Pipeline (as of 2026-06-16): push to main → GitHub Actions → npm run build →
  commits dist/ back to repo → scp-action copies dist/ straight into public_html →
  ssh-action purges stale repo cruft. Server-side git checkout + deploy.sh are GONE.
- Deploy time: ~25 seconds
- Workflow file: .github/workflows/deploy.yml

### Server
- IP: 88.223.85.148, SSH port: 65002
- User: u615309639
- Public HTML: /home/u615309639/domains/refynme.com/public_html
- Deploy script: none — retired 2026-06-16 (replaced by scp-action in the workflow)

### Critical dist/ rule
- dist/ IS tracked in git. It is NOT in .gitignore.
- NEVER add dist/ back to .gitignore.
- Actions commits built dist/ before the scp deploy.
- Because CI pushes a "chore: build dist [skip ci]" commit to main after every
  deploy, local main is usually 1 behind — ALWAYS fetch + reset onto origin/main
  before branching or merging.

### Deploy failure modes (observed 2026-07-04)
- The "Prune stale build assets" SSH step can transiently fail with
  `dial tcp :65002: i/o timeout` (Hostinger SSH). Remedy:
  `gh run rerun <run-id> --failed` — safe; the commit-dist step no-ops when
  dist is unchanged.
- RISK: the prune (`rm -rf images assets`) runs BEFORE the SCP copy. If prune
  succeeds and SCP then fails, the live site serves no assets until a rerun
  completes. Hardening candidate: prune after a successful copy.
- The SPA .htaccess rewrite answers 200 + index.html for ANY missing path.
  To verify a server file exists or was deleted, check Content-Type
  (text/html = not there), never just the status code.

### Staging rule — ALWAYS FOLLOW
- All changes go to a staging branch first
- Cous reviews and approves before merging to main
- NEVER push directly to main without Cous approval
- main = live production. Unapproved pushes deploy immediately.

### Before every push
- Run `npm run build` locally first
- Zero errors required before pushing to main
- Every push to main = immediate live deploy

---

## FILE STRUCTURE

src/
  index.css     ← CSS variables + resets + keyframes ONLY. No component styles here.
  App.css       ← ALL component styles. Single source of truth for styling.
  main.jsx      ← App entry point (wraps App in BrowserRouter)
  App.jsx       ← Router config + ALL homepage components as inline functions:
                   useInView hook, Banner, Nav, Hero, Trust, CoverageSignal,
                   ServicesPanels, Testimonials, BrocktonSignal, CtaFooter, Home
  pages/
    PageShell.jsx  ← Named exports: Nav, Footer, PageShell (default).
                     Services.jsx imports Nav + Footer directly from here.
                     PageShell props: title, subtitle, credential, children
    About.jsx
    Services.jsx   ← Custom two-column layout. Does NOT use PageShell hero.
    WeightLoss.jsx
    Aesthetics.jsx
    BookNow.jsx
    Contact.jsx
    BlogIndex.jsx  ← /blog — lists all articles as cards (Nav + Footer from PageShell)
    Article.jsx    ← /blog/:slug — narrow 680px reading layout; renders Markdown body
  blog/
    articles.js    ← Loads src/content/blog/*.md via import.meta.glob (eager, ?raw),
                     parses frontmatter, exports date-sorted array + getBySlug(slug)
  content/blog/
    *.md           ← One Markdown file per article. Frontmatter:
                     title, slug, description, date, image, excerpt. Body below 2nd ---.
public/images/blog/  ← Article images (filenames referenced in each article's frontmatter)

---

## DESIGN SYSTEM — NEVER DEVIATE FROM THIS

### Colors (src/index.css — ONLY place CSS variables are defined)

--espresso:       #2C1810   nav solid, primary dark
--espresso-dark:  #1C0F0A   hero bg, testimonials bg
--espresso-mid:   #3D1F14   testimonial cards
--gold:           #D4A853   accents, headlines, bullets
--gold-light:     #E2C47A   hover states
--cream:          #FAF6F0   light sections
--cream-dark:     #F0E8DC   image placeholders
--rose:           #C4687A   ALL CTA buttons
--rose-light:     #CC7080   rose tag borders
--white:          #FFFCF8   section backgrounds

NEVER add a new color.
NEVER use a hex value inline — always use the CSS variable.
NEVER change these values.

### Typography

--font-serif: Playfair Display (400, 500, 700, italic) — headlines only
--font-sans:  DM Sans (300, 400, 500, 600) — all body text

NEVER introduce a third typeface.
NEVER use system fonts as fallbacks in visible elements.

### Spacing (non-negotiable)

Section padding desktop: 96px top and bottom
Section padding mobile:  64px top and bottom
Max content width: 1280px, centered, margin: 0 auto
Body paragraphs: letter-spacing 0.01em

### Animations

fadeUp: opacity 0→1, translateY 32px→0
pulse:  opacity 1→0.4→1, 2s infinite loop
All sections except Hero use fadeUp on scroll via useInView hook
useInView threshold: 0.15

### Component-specific rules

Tag pills (service tags):    border-radius 3px — ALWAYS. Never rounded.
CTA buttons:                 NEVER full-width on desktop
Testimonial card hover:      translateY -8px, border #D4A853 solid,
                             box-shadow 0 20px 40px rgba(0,0,0,0.3),
                             transition 0.3s ease
Banner height:               40px, z-index 1001
Nav z-index:                 1000, top: 40px (sits below banner)
Nav scroll trigger:          >40px scrollY → rgba(44,24,16,0.97) + blur(12px)

---

## HOMEPAGE — COMPONENT ORDER

<Banner />
<Nav />
<Hero />
<Trust />
<CoverageSignal />
<ServicesPanels />
<Testimonials />
<BrocktonSignal />
<CtaFooter />

DO NOT reorder these.
DO NOT add sections without explicit approval.

---

## SECTION RULES — DO NOT CHANGE THESE

### Banner
CURRENT TEXT: "✦ WEBSITE LAUNCHING SOON — BOOKING NOW OPEN ✦"
(Pre-launch placeholder — update to "✦ Now Accepting Patients – Serving Brockton, Stoughton, Easton & Beyond ✦" at launch)
Gold bg, espresso-dark text, DM Sans 13px, weight 600, uppercase, letter-spacing 0.1em
Rose "Book Now" pill: position absolute, right 24px
Mobile: 11px text

### Hero
- Background: espresso-dark, min-height 100vh
- 2-column CSS grid, align-items center
- Bottom: gradient fadeout to cream
- Left: 3 staggered h1 elements ("Finally." / "Someone who" italic gold / "gets it.")
  Playfair clamp(52px→88px), weight 700
- Left subtext: two-element structure inside hero__sub-wrap (fadeUp animation on wrap):
  1. hero__sub-heading — gold, DM Sans 18px, weight 600:
     "Personalized Care for Your Best Health, Energy, and Confidence"
  2. hero__sub — cream 17px, weight 300, rgba(cream, 0.7), margin-top 0:
     "At RefynMe Medical Aesthetics and Wellness, every care plan is built around
      your unique goals — from medical weight management to aesthetic treatments.
      We combine compassion, clinical expertise, and evidence-based medicine so
      you can look, feel, and live your best."
- Left buttons: rose primary "Book a Consultation →" + cream outline secondary "Our Services"
- Right: 3:4 portrait photo (public/images/provider-hero.png), max-width 460px, object-fit cover
- Right badges: gold credential badge top-left only. "Now Accepting Patients" badge removed.
- Badges hidden on mobile
- Hero is GEO-NEUTRAL. No town name in hero. Ever.

### Trust Builder
- White bg, 2-column grid, gap 80px
- Left: 4:5 placeholder, gold bracket corners (TL+BR), "2+" years card
- Right: label → heading → body → 4 credential bullets (✦ gold) → rose CTA
- Heading: "Expert care. Finally close to home." — "home." is italic rose

### Services Panels
- Cream bg
- Panel 1 (Weight Loss): espresso left col, photo right col
  Label gold: "01 – Medical Weight Loss"
  Tags gold border 3px radius: GLP-1 Injections | Oral Medications |
  Dietary Guidance | Ongoing Support
- Panel 2 (Aesthetics): photo left col, white right col
  Label ROSE (not gold): "02 – Aesthetic Services"
  Tags rose border 3px radius: Botox | Dermal Fillers |
  Lip Enhancement | Jawline Sculpting

### Testimonials
- Background: #1C0F0A
- 3-column grid, gap 24px
- Cards: espresso-mid bg, gold border 1px rgba(0.2), border-radius 6px, padding 36px 32px
- Card hover: translateY -8px, gold border solid, shadow, 0.3s ease
- Card 1: Maria T. – Brockton – gold Weight Loss tag
- Card 2: Keisha M. – Brockton – rose Aesthetics tag
- Card 3: Sandra R. – Stoughton – rose Aesthetics tag
- Mobile: 1 column

### Brockton Signal
- Background: #0F0806
- Decorative circles: gold border, opacity 0.1, absolute centered
- Heading CURRENT (live): "South Shore" cream + italic gold "deserves this."
  Playfair clamp(56px→120px), letter-spacing -0.03em
  ⚠️ CONFLICT: original rule below says keep "Brockton" — heading was changed to
  "South Shore" in an earlier session. Confirm with Cous before reverting.
- NO CTA BUTTON. This section has no button. Do not add one.
- Original intent: KEEP BROCKTON-SPECIFIC. Do not generalize to "South Shore."
  Status: currently generalized — needs decision from Cous.

### CTA + Footer
- CTA inner box: espresso bg, border-radius 12px, 2-column grid
- Rose button: "Book a Consultation →"
- Footer: espresso bg, 4 columns (Brand | Services | Company | Contact)
- Copyright: © 2026 RefynMe. NOT 2025. Never 2025.

---

## SECONDARY PAGES — CURRENT STATE

Most pages use <PageShell /> from src/pages/PageShell.jsx.
PageShell accepts: title, subtitle, credential, children props.
PageShell: solid espresso nav + centered hero section + optional children + footer.

Exception — Services page (/services): custom two-column layout.
Does NOT use PageShell hero. Imports Nav + Footer directly from PageShell.
Left column: credential line → "Our Services" heading → intro copy → rose CTA.
Right column: 4 clickable service cards (gold left border, translateX hover).

### Nav brand — gold logo image (LIVE since 2026-07-04)
Both navs (App.jsx homepage Nav + PageShell.jsx shared Nav) render the brand as:
  <img src="/images/refynme-logo-gold.png" alt="RefynMe Medical Aesthetics & Wellness"
       className="nav-logo-img" />
wrapped in the existing home <Link to="/">.
- Asset: public/images/refynme-logo-gold.png — 147×52 transparent PNG, flat gold
  EXACTLY #D4A853 (var(--gold)), ".com" cropped (owner decision: never show TLD in nav).
- Sizing (App.css): .nav-logo-img 64px desktop / 48px ≤768px; hovering .nav__logo
  scales the image 1.12 (0.3s ease).
- The old text wordmark JSX (.nav__logo-mark/-text/-gold spans) is GONE; its CSS
  rules remain in App.css as a working fallback if the image is ever pulled.
- NEVER reintroduce CSS-filter recolor chains (brightness/invert/sepia) on logo
  images — proven to destroy artwork or produce flat silhouettes (2026-07-04).
- Known gap: asset is ~1× resolution for 48px, so 64px is slightly soft on
  retina. A 2× export (~400px wide, same flat art, transparent, no ".com")
  is a drop-in upgrade — ask the logo's creator.
- History: six treatments of the original neon-glow screenshot all failed at nav
  size (illegible smears). Flat art de-blends cleanly; glow screenshots never
  work. Obsolete refynmelogo*.png assets deleted 2026-07-04 (in git history).

### Nav links (all instances — App.jsx homepage + PageShell.jsx secondary pages)
About | Services | Weight Loss | Aesthetics | DOT Exams | Contact
DOT Exams links to: /services/dot-exams

### Routes
  /about                          → About Us (PageShell placeholder)
  /services                       → Our Services (custom two-column layout)
  /weight-loss                    → Medical Weight Loss (PageShell placeholder)
  /aesthetics                     → Aesthetic Services (PageShell placeholder)
  /services/dot-exams             → DOT Medical Exams (PageShell placeholder)
  /services/hormone-vitamin-therapy → Hormone & Vitamin Therapy (PageShell, built 2026-06-23)
  /book                           → REDIRECTS to /contact (Navigate replace, 2026-06-23).
                                    BookNow.jsx kept in repo but orphaned — not routed.
  /contact                        → Contact Us (form + phone/email; Formspree xkoaekjo)
  /privacy-policy                 → Privacy Policy (2026-06-23)
  /terms                          → Terms & Conditions (2026-06-23)
  /blog                           → Blog index (BlogIndex.jsx, built 2026-06-23)
  /blog/:slug                     → Article (Article.jsx, dynamic; unknown slug → /blog)
  *  (catch-all)                  → REDIRECTS to / (Navigate replace, 2026-06-23) — prevents
                                    blank screen on unknown URLs.

### Booking CTAs (sitewide, as of 2026-06-23)
ALL "Book a Consultation" / "Book Now" / "Schedule Now" buttons route to /contact.
The old Calendly placeholder on BookNow.jsx was replaced with a Link to /contact.

### Services page — card list (in order)
  1. Medical Weight Loss       → /weight-loss
  2. Aesthetic Treatments      → /aesthetics
  3. Hormone & Vitamin Therapy → /services/hormone-vitamin-therapy
  4. DOT Medical Exams         → /services/dot-exams

Do not build out secondary pages without session instruction.

### Blog (data-driven, built 2026-06-23)
- Architecture: ONE Article template + BlogIndex, fed by Markdown. To add an article,
  drop a new .md file in src/content/blog/ — no code, no route, no rebuild of structure.
- Content: src/content/blog/*.md. Frontmatter keys: title, slug, description, date,
  image, excerpt. Body is everything after the second `---`.
- Loader: src/blog/articles.js — import.meta.glob('../content/blog/*.md', {eager:true,
  query:'?raw', import:'default'}), manual frontmatter parse, default export is the
  date-DESC array; named export getBySlug(slug).
- Rendering: react-markdown (dep added 2026-06-23) renders the body in Article.jsx.
- Routing: /blog (index) + /blog/:slug (dynamic). Unknown slug → <Navigate to="/blog">.
  Deep links work via existing public/.htaccess SPA rewrite.
- SEO (Phase 1): per-article <title>/<meta description>/<link canonical>/OG tags rendered
  inside Article.jsx — React 19 hoists them into <head>. No react-helmet.
  Phase 2 (NOT built): build-time prerender of /blog/* + sitemap.xml for social cards.
- Styles: .blog-*, .article*, .blog-prose in App.css (additive). All CTAs are rose
  (btn--rose) per the all-CTA-buttons-rose rule — no gold CTA.
- Footer "Blog" link → /blog in both App.jsx and PageShell.jsx.
- Article images live in public/images/blog/ (filenames set in frontmatter; some pending).

---

## GEO STRATEGY

### Homepage (geo-neutral)
- Hero: no town name
- One reach line LOW on page (below Trust, not in hero):
  "Serving Brockton, Stoughton, Easton, Bridgewater
   and the surrounding South Shore."

### Town Landing Pages (not yet built)
- One page per town, both services per page
- Build Brockton first: /medical-weight-loss-botox-brockton
- Each page needs 2-3 genuinely local sentences
- These pages are SEO engine — publish before lease is signed

### Google Business Profile
- GATED on confirmed practice address
- Do not set up until address is confirmed

---

## COPY RULES — ENFORCED EVERYWHERE

- Talk to ONE person. Never "patients" or "women."
- Lead with the problem. Not the service.
- NP credential is a feature. Never a disclaimer.
- Primary CTA is 'Book a Consultation' — never use 'free' language.
- Instagram DM always included as booking channel.
- Short sentences. Short paragraphs.

### Banned words — NEVER appear on this site
journey | transform | transformation | holistic |
cutting-edge | wellness journey | affordable

---

## COMPLETED THIS SESSION (2026-07-04)

- Nav brand replaced with gold logo image sitewide (both navs) — see "Nav brand"
  section above. Path there was iterative: raw screenshot logo (dark canvas) →
  enlarged + hover pop → gold/rose per-pixel recolor (REJECTED) → reverted to
  text wordmark → final flat-gold client asset de-blended to transparent exact
  #D4A853 with ".com" cropped → LIVE + verified (merge c2c8b4e) → enlarged to
  64px/48px + hover 1.12 (merge f24340b).
- Repo cleanup (merge 92ad5b5): obsolete refynmelogo.png + refynmelogo-gold.png
  deleted (~2.1MB, recoverable from history); ALL merged staging branches
  deleted local + origin — repo carries only main between tasks.
- Deploy pipeline failure modes documented (see Deploy failure modes section).

## COMPLETED THIS SESSION (2026-06-23)

- Privacy Policy (/privacy-policy) + Terms & Conditions (/terms) pages built & live;
  footer links in both PageShell and homepage footers; not in main nav.
- All booking CTAs sitewide routed to /contact; dead Calendly link on BookNow.jsx replaced.
- /book route now redirects to /contact (Navigate replace); BookNow.jsx orphaned but kept.
- BUG AUDIT — fixes applied:
  1. Added catch-all route (path="*") → redirects to / (was: unknown URLs rendered blank).
  2. Removed unused BookNow import from App.jsx (dead code after redirect).
  3. Fixed redundant Aesthetics FAQ copy ("talk through your goals" appeared twice).
- Hormone & Vitamin Therapy page built (/services/hormone-vitamin-therapy) — PageShell
  layout reusing dot-* CSS classes; Services card link now resolves (was the audit flag).
- Audit clean on: banned words (none), 2025 (none), inline hex (none), image src refs
  (all resolve), form labels (properly associated), image alt text (present).
- Footer Services links in PageShell.jsx repointed from /services to specific pages
  (/weight-loss, /aesthetics) to match the homepage footer.
- BLOG built & live (/blog + /blog/:slug) — data-driven, Markdown-backed, 5 articles.
  Added react-markdown dep. Per-article meta via React 19 native head hoisting.
  Footer "Blog" link repointed to /blog in both footers. See "### Blog" section above.
  Phase 2 (prerender + sitemap for social cards) NOT yet built.

---

## COMPLETED THIS SESSION (2026-06-16)

- SEO metadata added to index.html — description, robots, canonical, theme-color,
  Open Graph, Twitter cards, MedicalBusiness JSON-LD (verified live)
- prefers-reduced-motion accessibility block added to src/index.css
- DEPLOY PIPELINE REWRITTEN — root cause: old appleboy/ssh-action ran a server-side
  git fetch/checkout + cp with no `set -e`, so a silent git failure re-copied STALE
  dist while the step still exited 0 (pipeline green, live served old content).
  Fix: appleboy/scp-action copies the runner's fresh dist/ directly into public_html
  (source: "dist", strip_components: 1, overwrite: true).
- Added ssh-action purge step (set -e) that removes stale repo cruft from public_html
  after deploy: dist src public .github .git CLAUDE.md eslint.config.js package.json
  package-lock.json README.md vite.config.js. Removing .git closes exposed-source risk.

---

## COMPLETED THIS SESSION (2026-06-14)

- Aesthetics page built and live (/aesthetics) — hero, 3 treatment cards (Botox, Lip Filler,
  Consultation + Plan), credentials section with provider-consultation.png placeholder, FAQ, CTA strip
- Contact page built and live (/contact) — editorial statement section, split info/form layout,
  Formspree wired (endpoint: xkoaekjo — updated 2026-06-16 from xojzygjo)
- Free consultation language removed sitewide — all CTAs now read "Book a Consultation"
- Real phone wired sitewide: 774-312-9806
- Real email wired sitewide: refynmemedical@gmail.com
- Hard refresh 404 fixed via public/.htaccess Apache rewrite rule
- GitHub Actions write permissions fixed
- deploy.sh updated to explicitly copy .htaccess hidden file
- git pull --rebase added to pipeline before dist push

---

## KNOWN GAPS — DO NOT CLOSE WITHOUT INSTRUCTION

CRITICAL (blocks launch):
  [x] Real phone number — 774-312-9806
  [x] Real email — refynmemedical@gmail.com
  [ ] Lead capture form — needed before any paid traffic
  [x] Provider hero photo — public/images/provider-hero.png (done)

IMPORTANT:
  [x] SEO meta tags — done & live 2026-06-16 (title, description, OG, Twitter, canonical, theme-color, MedicalBusiness JSON-LD in index.html; global only — no per-page meta yet)
  [x] Google Analytics — GA4 wired & live 2026-06-16 (Measurement ID G-5Y6VK96Y1K in index.html)
  [ ] Social handles — replace href="#" with real URLs
  [ ] 2× nav logo export (~400px wide, transparent, no ".com") — current asset
      is slightly soft on retina at 64px; drop-in swap when it arrives
  [ ] About page — blocked on provider bio
  [ ] Formspree endpoint (xkoaekjo) live but untested end-to-end — submit the contact form once to activate it (Formspree needs a first submission)
  [x] Booking flow — Calendly abandoned 2026-06-23; all booking CTAs now route to /contact
  [ ] Provider bio + name still placeholder
  [ ] Practice address still pending
  [x] Privacy Policy + Terms & Conditions pages — built & live 2026-06-23
      (/privacy-policy + /terms; footer links in PageShell + homepage footer; not in main nav)

IMAGES NEEDED (public/images/):
  [ ] aesthetics-treatment.png — real provider action photo
  [ ] provider-consultation.png — real provider action photo

DO NOT RE-ADD WITHOUT EXPLICIT INSTRUCTION:
  - Dermal Fillers treatment card (removed 2026-06-14 — confirm with wife before restoring)
  - NRCME credential on Aesthetics page (removed 2026-06-14 — do not re-add)

PENDING DECISIONS (need confirmation from wife):
  - Brockton geographic positioning — current heading reads "South Shore deserves this."
    Original intent was Brockton-specific. Confirm new direction before reverting.
  - Practice address — needed before Google Business Profile setup

NEXT BUILD WORK:
  [ ] Brockton town landing page
  [ ] Town page template for remaining towns
  [ ] Reach line below Trust Builder on homepage
  [x] Node.js bumped to 24 in deploy.yml (done)

---

## ABSOLUTE RULES — NEVER VIOLATE

1. Never add a new CSS color variable
2. Never use a hex value inline — always use CSS variable
3. Never add a third font
4. Never make CTA buttons full-width on desktop
5. Never change tag pill border-radius from 3px
6. Never change section padding rhythm (96px/64px)
7. Never add a CTA button to Brockton Signal section
8. Never generalize Brockton Signal to other towns
9. Never change the banned words list without approval
10. Never push to main without a clean `npm run build` first
11. Never add dist/ to .gitignore
12. Never reorder homepage components without approval
13. Copyright year is 2026. Always. Never 2025.
14. Never push directly to main — all changes go to staging branch first, Cous approves before merge