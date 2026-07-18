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

### WHITE-SCREEN PATTERN — relative asset base (FIXED 2026-07-11, keep '/')
- Symptom: a NESTED route (/services/dot-exams, /blog/:slug) renders a blank
  white page on DIRECT visit / refresh / shared link — no visible error.
  Client-side navigation to the same page works, which hides the bug.
- Root cause: vite.config.js had `base: './'` (since the initial commit), so
  built index.html referenced `./assets/...`. On a two-segment path the
  browser resolved assets against the subdirectory (/services/assets/...),
  the SPA rewrite served index.html AS the module script (text/html →
  rejected), and React never mounted. One-segment routes worked only by
  URL-resolution accident.
- Fix: `base: '/'` (merge b3a8ad9). NEVER set a relative base on this site.
- Diagnosis check for any future blank page: read the script src in the
  served HTML — if it isn't an absolute /assets/... path, or fetching it
  returns Content-Type text/html, this is the pattern.
- Verification rule this taught: deep-link tests must confirm the page
  MOUNTS (root has children), not just that index.html comes back 200.

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
                   i18n LanguageSwitcher styles + overlay visibility fix are
                   APPENDED at the end (additive, cascade-level overrides).
  main.jsx      ← App entry point (imports ./i18n/config.js BEFORE App, wraps App
                   in BrowserRouter)
  App.jsx       ← Router config + ALL homepage components as inline functions:
                   useInView hook, Banner, Nav, Hero, MissionStrip, Trust,
                   CoverageSignal, ServicesPanels, Testimonials, BrocktonSignal,
                   CtaFooter, Home — all wired to useTranslation()
  components/
    LanguageSwitcher.jsx ← EN/FR/ES/KEA pill row (default + "overlay" variant)
  i18n/
    config.js     ← i18next init (en/fr/es/kea, fallback en, detector
                     localStorage→navigator, key "refynme-lang") + <html lang> sync
    locales/*.json ← en.json = source of truth (267 strings; namespaces per
                     page — see I18N section); fr/es/kea = DRAFT machine
                     translations LIVE (marked "_status") pending native review
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

### Hero (REDESIGNED 2026-07-17 — monogram-orbit panel, merge 852f5bb)
- Background: espresso-dark, min-height 100vh
- 2-column CSS grid 1fr/1fr, gap 60px, align-items center (original values)
- Bottom: gradient fadeout to cream
- Left: 3 staggered h1 elements — UNCHANGED (see left-column spec below)
  Playfair clamp sizes, weight 700, italic gold middle line
- Left subtext: two-element structure inside hero__sub-wrap (fadeUp animation on wrap):
  1. hero__sub-heading — gold, DM Sans 18px, weight 600:
     "Personalized Care for Your Best Health, Energy, and Confidence"
  2. hero__sub — cream 17px, weight 300, rgba(cream, 0.7), margin-top 0:
     "At RefynMe Medical Aesthetics and Wellness, every care plan is built around
      your unique goals — from medical weight management to aesthetic treatments.
      We combine compassion, clinical expertise, and evidence-based medicine so
      you can look, feel, and live your best."
- Left buttons: rose primary "Book a Consultation →" + cream outline secondary "Our Services"
- RIGHT: hero__monogram panel in the OLD PHOTO FOOTPRINT (max-width 460px,
  aspect-ratio 3:4, radius 8px, espresso bg, 1px gold-20 border):
  · hero__monogram-ring — 78% circle, gold-30 border, heroRingPulse 7s
    (opacity 0.2→0.45)
  · hero__monogram-r — /images/refynme-r-mark.svg at 40% width (see ASSET
    note below)
  · hero__orbit — 27 spans "RefynMe✦·" ×3 on a 3D ring (rotateY steps,
    translateZ 160px), heroOrbit 20s linear, rotateX(-12deg) tilt,
    backface-visibility hidden, DM Sans 17px gold
  · hero__monogram-cred — bottom-centered: badgeTitle/badgeSub i18n keys
    ("Board-Certified" / "Nurse Practitioner"), serif 700 15px gold /
    10px uppercase 1.2px cream-45
- prefers-reduced-motion: orbit hidden entirely, ring static — R + ring only
- Keyframes heroOrbit + heroRingPulse live in index.css (keyframes-only rule)
- Column collapse at 900px (monogram centers under text; Stivo spec 2026-07-17 —
  the old photo hero collapsed at 768). Mobile padding change stays at 768px.
- Hero is GEO-NEUTRAL. No town name in hero. Ever. (The 2026-07-17 v1
  centered hero briefly carried a Brockton credential by explicit Stivo spec;
  it was superseded the same day — the rule stands satisfied.)
- ASSET: public/images/refynme-r-mark.svg — cursive "R" OUTLINED TO VECTOR
  PATHS from the Great Vibes glyph (OFL license, fontTools), flat gold
  #D4A853 artwork. NO font is loaded — Absolute Rule 3 intact via the
  logo-artwork precedent. Regenerate: outline the glyph again; never load
  Great Vibes as a webfont.

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

## I18N — PHASES 1A + 1B + 2 DRAFTS LIVE (2026-07-11)

Infrastructure AND draft content are live SITEWIDE. FR/ES/KEA render
machine-drafted translations (Stivo-authorized 2026-07-11) on the homepage and
every content page, marked DRAFT pending native review.

### Architecture
- i18next + react-i18next + i18next-browser-languagedetector
- Languages: en (default/fallback), fr, es, kea
- Detection: localStorage first (key `refynme-lang`), then navigator;
  `nonExplicitSupportedLngs: true` (fr-FR → fr)
- `src/i18n/config.js` also syncs `<html lang>` on init + every language change
- Wired: BOTH Navs (App.jsx + PageShell.jsx), BOTH Footers, all homepage
  sections, all content pages: Services, Weight Loss, Aesthetics, DOT Exams,
  Contact (full form), Hormone & Vitamin Therapy, About (re-wired 2026-07-11
  night after its rewrite — new 18-key about.* namespace REPLACED the orphaned
  one, stale values deleted), plus PageShell's own strings
- About copy note: the ENGLISH About values in en.json are the approved FINAL
  copy verbatim (the em-why sentence is split across phil1Before/phil1Em/
  phil1After and must reassemble exactly). Do not edit them. The italic word
  carries per language: why / pourquoi / por qué / pamodi.
- STILL ENGLISH BY DESIGN (each needs its own decision before changing):
  · Privacy Policy + Terms — legal text; machine translation = liability;
    if ever translated, needs an English-binding disclaimer decision first
  · Blog — Markdown articles; translating = per-language content strategy
  · Aesthetics hero heading — it IS the locked tagline (hardcoded in JSX
    with a comment; never extract it)
  · Image alts, provider name, BookNow.jsx (orphaned redirect)

### en.json IS THE KEY CONTRACT — KEYS ARE FROZEN
- 267 strings (2026-07-17: +6 unused cred* keys, badge keys removed+restored), nested semantic keys: nav.*, footer.*, home.*, pageShell.*,
  services.*, weightLoss.*, dotExams.*, hormone.*, aesthetics.*, contact.*,
  about.*
- 1b SHIPPED (2026-07-11): machine-drafted FR/ES/KEA values are LIVE, each file
  marked `"_status": "DRAFT — machine translation, pending native review"`.
- NEXT = NATIVE REVIEW: reviewed values replace the drafts, then the "_status"
  line is DELETED. That marker leaving the files = review complete.
  NO key changes, NO code changes — values only, in BOTH steps.
- Do not re-draft or "improve" translations without instruction. The one-time
  machine-draft authorization was Stivo's explicit 2026-07-11 decision.

### TRANSLATION CONSTRAINT (Stivo, locked 2026-07-11)
- The banned-word list applies IN TRANSLATION: no equivalents of journey
  (voyage/viaje/viaji), transform*, holistic (holistique/holístico),
  cutting-edge (pointe/vanguardia), free (gratuit/gratis/grátis), affordable.
- The "Book a Consultation" CTA must NEVER gain free/gratuit/gratis/grátis.
- Medical terms stay untranslated: GLP-1, Botox, Dysport, semaglutide,
  tirzepatide, DOT.
- Tagline + legal entity name stay English (excluded from extraction anyway).
- Voice: FR = vous (formal-warm), ES = tú (warm), KEA = Santiago Kriolu
  bu-form. Feminine provider forms where the language forces gender
  (praticienne / especialista / une voisine / una vecina).

### NEVER EXTRACT — hardcoded identical in every language
- Logo alt text
- Phone 774-312-9806, email refynmemedical@gmail.com
- Legal name "RefynMe Medical and Wellness, PLLC"
- Tagline "Results you see. Confidence you own."
- Town proper nouns, testimonial names/cities, stat figures (20+/100%/NP/MA),
  social abbreviations (IG/TK/FB), temporary photo-placeholder labels

### LanguageSwitcher responsive behavior (decided by review fix, 2026-07-11)
- >1200px: full pills in both navs, before the Book Now CTA
- 1081–1200px: compact pills (nav row has no slack)
- ≤1080px: in-row switcher HIDDEN (row physically can't fit it)
- ≤768px homepage: switcher lives in the hamburger overlay (44px touch targets)
- KNOWN GAP (needs Cous decision before 1b ships): secondary pages on mobile
  and ALL pages 769–1080px have NO switcher — PageShell has no hamburger.
  Selection persists via localStorage from wherever it was last set.

### Verification gotchas
- The CSS minifier rewrites `@media (max-width: 1080px)` to range syntax
  `(width<=1080px)` — grep the deployed CSS for the range form.
- Claude-in-Chrome runs on Stivo's REMOTE machine — it can NOT reach this box's
  localhost. Verify i18n behavior headlessly in Node (mock localStorage/navigator,
  run the real config.js with JSON imports rewritten to import-attributes) or
  against the live site (the public site IS reachable from his browser).
- Live-verifying non-ASCII strings: PowerShell's Invoke-WebRequest decodes the
  JS asset as Latin-1 (no charset header) — accented/em-dash strings read as
  false misses. Decode `RawContentStream` bytes as UTF-8 before .Contains().
- PS 5.1 splits `git commit -m` here-strings at embedded double quotes —
  write the message to a file and use `git commit -F <file>`.

### Deferred items logged by the 2026-07-11 multi-agent review (do not "fix"
without a task): placeholder locales bundle ~3×5KB duplicate English until 1b
(spec said import all four); nav/footer i18n key maps are hand-duplicated in
App.jsx and PageShell.jsx (pre-existing two-footer architecture — every 1b
touch must hit BOTH copies or the missed one renders raw keys).

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

## COMPLETED THIS SESSION (2026-07-17 — HERO REDESIGN ×2, MONOGRAM FINAL)

- HERO REDESIGNED TWICE in one session, both Stivo-specced, both via the
  full staging→approve→merge loop:
  - v1 (merge `2a6c95a`, lived ~1 hour): centered type-led hero — photo +
    cert badge removed, credential strip (incl. a Brockton item by explicit
    spec). SUPERSEDED same day; described here only for git-history context.
  - v2 FINAL (merge `852f5bb`, LIVE): two-column restored (values
    byte-matched to 901e390) + animated monogram-orbit panel — see the
    rewritten Hero section above for the standing spec.
- provider-hero.png DELETED (repo + server, Content-Type-verified);
  provider-consultation.png untouched. og:image / twitter:image / JSON-LD
  image → refynme-logo-gold.png (refynmelogo.png hasn't existed since
  7-04). Proper 1200×630 OG card = future asset.
- NEW ASSET public/images/refynme-r-mark.svg — see the ASSET note in the
  Hero section (outlined Great Vibes glyph; artwork, not a font).
- i18n: +6 home.hero.cred* keys (UNUSED after v2; English in all four
  locales; translate only if reused); badgeTitle/badgeSub removed in v1,
  RESTORED in v2 with exact prior draft values. en.json = 267 strings,
  parity ×4 verified.
- Keyframes heroOrbit + heroRingPulse added to index.css (keyframes-only
  rule); hero column-collapse breakpoint moved 768 → 900px (Stivo spec).
- Box gotcha for future sessions: `python -c` with non-ASCII arguments
  mangles UTF-8 on this machine — write script FILES and run
  `python -X utf8`; verify accented values via ascii() repr, not console
  output (an é/è mangling in fr.json was caught and fixed this way).
- Both versions live-verified with headless-Chrome screenshots (the local
  vite-preview + `--virtual-time-budget` pattern works for animation
  states); deploys green; staging branches deleted after merge.

---

## COMPLETED THIS SESSION (2026-07-11, NIGHT — ABOUT TRANSLATION)

- ABOUT PAGE TRANSLATED (merge `d797880`; feat `2ffda66`) — Stivo's explicit
  instruction closed the English-only exception from earlier tonight. New
  18-key about.* namespace in all four locales; ORPHANED old values DELETED
  (never reused, per the rulebook guard). Key contract now 261 strings.
- English rendering is byte-identical to the approved FINAL copy — verified
  by reassembling the split phil1 keys to the exact spec sentence.
- The <em>why</em> rule carries per language via split keys: why / pourquoi /
  por qué / pamodi — live-verified ×1 per language in Stivo's browser, along
  with H1s, pull-lines, credlines (middle dots intact), html-lang tracking.
- 32/32 verification checks (copy fidelity, key parity 261×3, zero stale
  keys, banned scan ×4, GLP-1/Botox/Dysport/NRCME/DOT + proper nouns
  preserved, 175 static t() keys resolve, real-config render per language).
- ⚠ For the native reviewers, flagged wordplay: closing line "That's the
  practice." (clinic + way of practicing) → FR "C'est ça, la pratique." /
  ES "Esa es la práctica." / KEA "Kel-la é prátika." — confirm these land.
- NATIVE REVIEW scope is now 261 strings.

---

## COMPLETED THIS SESSION (2026-07-11, EVENING — ABOUT PAGE REWRITE)

- ABOUT PAGE FINAL COPY LIVE (merge `b6a22e5`; feat `79d2be7`) — full rewrite
  to Stivo-approved FINAL copy (verbatim contract: 15/15 blocks verified
  programmatically; 12 em dashes + 2 middle dots preserved; <em>why</em>
  exactly once). Structure: H1 → 3-para intro → gold italic pull-line
  (.about-pull) → H2 → 4 prose paras → H2 → 2 paras → muted credentials line
  (.about-credline) → rose CTA. Old provider grid / We Get It / Our Approach /
  cred-card bar REMOVED (their CSS left as unused fallback).
- Page body is ENGLISH-ONLY by instruction — see the About exception in the
  I18N section. Copy is FINAL: do not edit, reword, or re-extract without
  explicit instruction.
- New additive CSS: .about-intro (fixed-nav clearance 140/120px), .about-pull,
  .about-credline, .about-cta-inner — about-* convention, vars only.
- Provider photo: comment placeholder in Section 1
  (PROVIDER PHOTO: pending professional shots) — no stock/AI image, awaiting
  professional shots.
- CTA flag RESOLVED same evening: Stivo chose /contact — switched in
  `51f4269` (merge `8109ac7`), live-verified href=/contact. The
  all-booking-CTAs-to-/contact convention holds SITEWIDE with no exceptions;
  copy/spec references to /book are satisfied by the standing redirect but
  new CTAs always target /contact directly.
- Live-verified in Stivo's browser (hard load): mounts, structure + em-why +
  credline render, no console errors. 390px phone glance still worth doing.

---

## COMPLETED THIS SESSION (2026-07-11, FINAL — WHITE-SCREEN FIX + FULL VERIFY)

- 🔴 LIVE BUG found during Phase 2 live verification, FIXED + DEPLOYED
  (merge `b3a8ad9`): nested routes white-screened on hard load — see the new
  "WHITE-SCREEN PATTERN" section under Deploy failure modes. Pre-existing
  since the initial commit; NOT an i18n regression; affected /services/
  dot-exams, /services/hormone-vitamin-therapy and every /blog/:slug in all
  languages. Fix = vite base './' → '/' (one line, `3398671`), verified via
  vite preview locally, then live (nested hard loads now fetch
  /assets/*.js as JavaScript and the app mounts).
- FULL i18n verification matrix COMPLETE in Stivo's browser on the live site:
  Home FR/ES/KEA, Weight Loss FR, Contact form KEA, Aesthetics KEA (tagline
  correctly English), Services ES, DOT Exams FR, Hormone KEA, About ES —
  all render translated; medical terms/phone/tagline/provider name intact;
  CTAs consultation-only; html-lang + persistence working; browser left on EN.
- i18n is now COMPLETE pending only: native review (259 strings), and the
  parked legal/blog decisions.

---

## COMPLETED THIS SESSION (2026-07-11, LATEST — PHASE 2: SECONDARY PAGES)

- I18N PHASE 2 LIVE — merge `3514e56` to main, deploy green, bundle +
  in-browser verified (FR /weight-loss w/ screenshot, KEA /contact full form,
  KEA /aesthetics with the tagline correctly staying English).
  - Context: Stivo flagged that secondary pages didn't translate — that was
    the designed 1a scope (Nav + Footer + Home only). Phase 2 closed it.
  - `53ccd16`: ~130 new strings (en.json now 259) across Services, Weight
    Loss, Aesthetics, DOT Exams, Contact, Hormone & Vitamin Therapy, About +
    PageShell; drafted FR/ES/KEA under the locked TRANSLATION CONSTRAINT.
  - New verification check added: every static t('...') key used in src must
    exist in en.json — immediately caught a missing about.cta in all 3 drafts.
  - Bundle crossed Vite's 500 kB minified warning (531 kB / 161 kB gzip) —
    purely translation content; code-split is a future task if it keeps
    growing.
  - Contact form: LABELS translate; Formspree still receives English field
    names (first_name etc.) — how Stivo receives submissions is unchanged.
  - NATIVE REVIEW scope is now 259 strings — line up the Kriolu reader.

---

## COMPLETED THIS SESSION (2026-07-11, LATER — PHASE 1B)

- I18N PHASE 1B DRAFT TRANSLATIONS LIVE — merge `2a21ef5` to main, deploy
  all-green, live bundle verified (FR/ES/KEA strings present, DRAFT markers ×3,
  zero gratuit/gratis, Botox/GLP-1/DOT intact, EN untouched).
  - Context: Stivo flagged "languages don't change the content" — that was the
    designed 1a placeholder state; he then authorized machine drafts under the
    TRANSLATION CONSTRAINT (see I18N section).
  - `2b951fd`: all 102 strings × FR/ES/KEA, values only, keys frozen, 34/34
    verification checks (key parity, accent-insensitive banned-word scan,
    medical terms, CTA purity, real-config rendering).
  - ⚠ TOP OPEN ITEM: NATIVE REVIEW — the drafts are live to real visitors NOW.
    Kriolu (Santiago) most urgent. "_status" DRAFT markers stay until then.
  - IN-BROWSER LIVE VERIFICATION (Stivo's Chrome, all four languages, PASS):
    each pill switches banner/nav/hero/badge/CTAs/footer to that language and
    updates localStorage + <html lang>; EN restores original English. Invariants
    held in every language: brand tagline + phone English/intact, GLP-1/Botox/
    DOT untranslated, all CTAs consultation-only (no free/gratuit/gratis),
    layout/colors/rhythm unchanged. Screenshots taken FR/ES/KEA.
  - Notes from verification (not defects):
    1. FR/ES hero wraps to more lines than EN (longer copy; clamp() handles
       it) — optional copy-tightening candidate for the native-review pass.
    2. The pill row shifts position per language as nav-label widths change —
       inherent to space-between nav; acceptable.
- Phase 1a live-verified in Stivo's browser earlier the same day: pill states,
  localStorage persistence across full page loads, html-lang sync, overlay
  visibility fix, breakpoint rules in CSSOM. His window couldn't be resized
  remotely — mobile interaction still needs a phone check.
- Cosmetic, not a bug: on first visit the detector caches raw `en-US` into
  refynme-lang; resolution still lands on en. Any pill click stores the clean code.

---

## COMPLETED THIS SESSION (2026-07-11)

- I18N PHASE 1A BUILT, REVIEWED, MERGED, DEPLOYED — merge `802e692` to main,
  Actions run all-green 38s, live-verified on refynme.com (bundle contains
  refynme-lang key, switcher, i18n keys, PLACEHOLDER markers, html-lang sync).
  See the new "I18N" section above for the standing rules.
  - `297c148` feat: i18next infra + 102-string EN extraction + LanguageSwitcher
  - `bad3690` fix (from a multi-agent review of the branch, 0 findings refuted):
    1. Tablet nav overflow 769–1110px → pills compact ≤1200px, hidden ≤1080px
    2. Closed hamburger overlay kept its (invisible) controls keyboard-focusable
       — buttons could silently change persisted language. Appended
       `.nav__overlay` visibility hidden/visible override, fade preserved via
       delayed visibility transition. Also fixes the pre-existing invisible-link
       tab-order quirk.
    3. `<html lang>` now follows the active language (screen readers / browser
       auto-translate — matters the moment 1b real translations land)
- Branch hygiene: `staging-i18n-phase1` deleted origin + local after merge;
  repo carries only main between tasks.
- npm audit (PRE-EXISTING, not from this session): vite 8.0.14 high +
  @babel/core low — a vite bump is its own future task.
- Doc drift noticed, NOT fixed (needs its own pass): the Hero section above
  still describes the old "Finally. / Someone who / gets it." headings; the
  live code (and en.json) has "Refined care / for the way you want / to look,
  feel and live." Reconcile with Cous which is canonical.

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
  [x] Provider hero photo — REMOVED 2026-07-17 (hero redesigned to monogram panel; provider-hero.png deleted, og/twitter/JSON-LD images repointed to refynme-logo-gold.png — a proper 1200×630 OG card is a future asset)

IMPORTANT:
  [x] SEO meta tags — done & live 2026-06-16 (title, description, OG, Twitter, canonical, theme-color, MedicalBusiness JSON-LD in index.html; global only — no per-page meta yet)
  [x] Google Analytics — GA4 wired & live 2026-06-16 (Measurement ID G-5Y6VK96Y1K in index.html)
  [ ] Social handles — replace href="#" with real URLs
  [ ] 2× nav logo export (~400px wide, transparent, no ".com") — current asset
      is slightly soft on retina at 64px; drop-in swap when it arrives
  [x] About page — FINAL approved copy live 2026-07-11 (merge b6a22e5);
      still pending: provider portrait (comment placeholder in Section 1)
  [ ] Formspree endpoint (xkoaekjo) live but untested end-to-end — submit the contact form once to activate it (Formspree needs a first submission)
  [x] Booking flow — Calendly abandoned 2026-06-23; all booking CTAs now route to /contact
  [ ] Provider bio + name still placeholder
  [ ] Practice address still pending
  [x] Privacy Policy + Terms & Conditions pages — built & live 2026-06-23
      (/privacy-policy + /terms; footer links in PageShell + homepage footer; not in main nav)

IMAGES NEEDED (public/images/):
  [ ] aesthetics-treatment.png — real provider action photo
  [ ] provider-consultation.png — real provider action photo
  [ ] About page provider portrait — professional shots pending; slot held by
      comment placeholder in About.jsx Section 1 (no stock/AI)

DO NOT RE-ADD WITHOUT EXPLICIT INSTRUCTION:
  - Dermal Fillers treatment card (removed 2026-06-14 — confirm with wife before restoring)
  - NRCME credential on Aesthetics page (removed 2026-06-14 — do not re-add)

PENDING DECISIONS (need confirmation from wife):
  - Brockton geographic positioning — current heading reads "South Shore deserves this."
    Original intent was Brockton-specific. Confirm new direction before reverting.
  - Practice address — needed before Google Business Profile setup
  - Language switcher on secondary-page mobile + 769–1080px (PageShell has no
    hamburger — needs a nav-breakpoint decision; see I18N section)
  - [RESOLVED 2026-07-11] About CTA target: Stivo chose /contact — the
    all-booking-CTAs-to-/contact convention holds sitewide, no exceptions
  - [RESOLVED 2026-07-11 night] About page translation: extracted + drafted
    FR/ES/KEA (merge d797880); orphaned keys replaced, not reused
  - Hero heading doc drift — CLAUDE.md Hero section vs live code (see 2026-07-11
    session notes)

NEXT BUILD WORK:
  [x] i18n Phase 1b — DRAFT machine translations live 2026-07-11 (merge 2a21ef5)
  [x] i18n Phase 2 — secondary pages extracted + drafted, live 2026-07-11
      (merge 3514e56; en.json now 259 strings)
  [ ] i18n NATIVE REVIEW — replace draft values with reviewed FR/ES/KEA, delete
      "_status" lines (values only, keys frozen; KEA/Santiago Kriolu most
      urgent — drafts are live to real visitors; scope = 267 strings (6 cred* keys are UNUSED English placeholders — translate only if reused) incl.
      the About wordplay flag in the 2026-07-11 night session notes)
  [ ] i18n decisions pending: Privacy/Terms translation (legal), Blog
      per-language strategy
  [ ] Bundle code-split if it keeps growing (531 kB minified, warning
      threshold crossed 2026-07-11)
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