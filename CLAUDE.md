# CLAUDE.md — RefynMe Medical and Wellness, PLLC
# READ THIS ENTIRE FILE BEFORE TOUCHING ANY CODE.
# NO EXCEPTIONS. NO ASSUMPTIONS.

---

## WHAT THIS SITE IS

Medical aesthetics + weight loss practice website.
Owner: Board-Certified Nurse Practitioner, Brockton MA.
Entity: RefynMe Medical and Wellness, PLLC (Massachusetts).
Tagline: "Results you see. Confidence you own."
Primary CTA: Free 15-minute consultation — always.

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
- Pipeline: push to main → GitHub Actions → npm run build →
  commits dist/ back to repo → SSH into Hostinger → deploy.sh
- Deploy time: ~25 seconds
- Workflow file: .github/workflows/deploy.yml

### Server
- IP: 88.223.85.148, SSH port: 65002
- User: u615309639
- Public HTML: /home/u615309639/domains/refynme.com/public_html
- Deploy script: /home/u615309639/domains/refynme.com/deploy.sh

### Critical dist/ rule
- dist/ IS tracked in git. It is NOT in .gitignore.
- NEVER add dist/ back to .gitignore.
- Actions commits built dist/ before SSH deploy.

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
  index.css          ← ALL global styles + CSS variables. Single source of truth.
  main.jsx           ← App entry point
  App.jsx            ← Router config
  components/
    Banner.jsx       ← Gold top bar "Now Accepting Patients"
    Nav.jsx          ← Fixed nav, transparent → espresso on scroll
    Hero.jsx         ← Full viewport hero, 2-column grid
    Trust.jsx        ← Provider credibility section
    ServicesPanels.jsx ← Weight loss + aesthetics panels
    Testimonials.jsx ← 3-card grid, dark bg
    BrocktonSignal.jsx ← Community statement, NO CTA button
    CtaFooter.jsx    ← Final CTA box + footer
    useInView.js     ← IntersectionObserver hook for scroll animations
  pages/
    PageShell.jsx    ← Shared shell for all secondary pages
    About.jsx
    Services.jsx
    WeightLoss.jsx
    Aesthetics.jsx
    Book.jsx
    Contact.jsx

---

## DESIGN SYSTEM — NEVER DEVIATE FROM THIS

### Colors (src/index.css — ONLY place these are defined)

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
<ServicesPanels />
<Testimonials />
<BrocktonSignal />
<CtaFooter />

DO NOT reorder these.
DO NOT add sections without explicit approval.

---

## SECTION RULES — DO NOT CHANGE THESE

### Banner
"✦ Now Accepting Patients – Serving Brockton, Stoughton, Easton & Beyond ✦"
Gold bg, espresso-dark text, DM Sans 13px, weight 600, uppercase, letter-spacing 0.1em
Rose "Book Now" pill: position absolute, right 24px
Mobile: 11px text

### Hero
- Background: espresso-dark, min-height 100vh
- 2-column CSS grid, align-items center
- Bottom: gradient fadeout to cream
- Left: 3 staggered h1 elements ("Finally." / "Someone who" italic gold / "gets it.")
  Playfair clamp(52px→88px), weight 700
- Left subtext: two-element structure inside hero__sub-wrap:
  1. hero__sub-heading — gold, DM Sans 18px, weight 600:
     "Personalized Care for Your Best Health, Energy, and Confidence"
  2. hero__sub — cream 17px, weight 300, rgba(cream, 0.7): body copy
- Left buttons: rose primary "Book Free Consultation →" + cream outline secondary "Our Services"
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
- Heading: "Brockton" cream + italic gold "deserves this."
  Playfair clamp(56px→120px), letter-spacing -0.03em
- NO CTA BUTTON. This section has no button. Do not add one.
- KEEP BROCKTON-SPECIFIC. Do not generalize to "South Shore."

### CTA + Footer
- CTA inner box: espresso bg, border-radius 12px, 2-column grid
- Rose button: "Book Now – It Is Free →"
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

### Nav links (all instances — App.jsx homepage + PageShell.jsx secondary pages)
About | Services | Weight Loss | Aesthetics | DOT Exams | Contact
DOT Exams links to: /services/dot-exams

### Routes
  /about                          → About Us (PageShell placeholder)
  /services                       → Our Services (custom two-column layout)
  /weight-loss                    → Medical Weight Loss (PageShell placeholder)
  /aesthetics                     → Aesthetic Services (PageShell placeholder)
  /services/dot-exams             → DOT Medical Exams (PageShell placeholder)
  /services/hormone-vitamin-therapy → Hormone & Vitamin Therapy (PageShell placeholder)
  /book                           → Book Now (phone + email visible, no PageShell placeholder)
  /contact                        → Contact Us (PageShell placeholder)

### Services page — card list (in order)
  1. Medical Weight Loss       → /weight-loss
  2. Aesthetic Treatments      → /aesthetics
  3. Hormone & Vitamin Therapy → /services/hormone-vitamin-therapy
  4. DOT Medical Exams         → /services/dot-exams

Do not build out secondary pages without session instruction.

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
- Free 15-minute consultation is always the primary CTA.
- Instagram DM always included as booking channel.
- Short sentences. Short paragraphs.

### Banned words — NEVER appear on this site
journey | transform | transformation | holistic |
cutting-edge | wellness journey | affordable

---

## KNOWN GAPS — DO NOT CLOSE WITHOUT INSTRUCTION

CRITICAL (blocks launch):
  [ ] Real phone number — placeholder is (508) 000-0000
  [ ] Real email — placeholder is hello@refynme.com
  [ ] Lead capture form — needed before any paid traffic
  [x] Provider hero photo — public/images/provider-hero.png (done)

IMPORTANT:
  [ ] SEO meta tags — title, description, OG tags, canonical
  [ ] Google Analytics — wire before launch
  [ ] Social handles — replace href="#" with real URLs
  [ ] About page — blocked on provider bio

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