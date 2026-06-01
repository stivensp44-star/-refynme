# RefynMe — Brand & Build Standards

This is the single source of truth for the RefynMe website.
Read this file at the start of EVERY session before touching
any code. No exceptions.

---

## 1. BUSINESS IDENTITY

- Entity: RefynMe Medical and Wellness, PLLC (Massachusetts)
- Provider: Board-Certified Nurse Practitioner, Brockton, MA
- Tagline: "Results you see. Confidence you own."
- Domain: refynme.com (Hostinger)
- GitHub: github.com/stivensp44-star/-refynme
- Stack: Vite + React 19, React Router DOM 7, pure CSS

---

## 2. DESIGN SYSTEM

### Color Tokens (defined in src/index.css — never invent new colors)
- `--espresso`:      #2C1810  ← nav solid, primary dark
- `--espresso-dark`: #1C0F0A  ← hero bg, testimonials bg
- `--espresso-mid`:  #3D1F14  ← testimonial cards
- `--gold`:          #D4A853  ← accents, headlines, bullets
- `--gold-light`:    #E2C47A  ← hover states
- `--cream`:         #FAF6F0  ← light sections
- `--cream-dark`:    #F0E8DC  ← image placeholders
- `--rose`:          #C4687A  ← all CTA buttons
- `--rose-light`:    #CC7080  ← rose tag borders
- `--white`:         #FFFCF8  ← section backgrounds

### Typography
- `--font-serif`: Playfair Display (400, 500, 700, italic)
- `--font-sans`:  DM Sans (300, 400, 500, 600)
- NEVER introduce a third typeface.

### Spacing
- Section padding desktop: 96px top and bottom
- Section padding mobile:  64px top and bottom
- Max content width: 1280px, centered, margin: 0 auto
- All body paragraphs: letter-spacing 0.01em

### Animations
- fadeUp keyframe: opacity 0→1, translateY 32px→0
- pulse keyframe: opacity 1→0.4→1 (2s loop)
- useInView hook (IntersectionObserver, threshold 0.15)
- All sections except Hero get fade-up on scroll

---

## 3. VOICE & COPY RULES

- Talk to ONE person. Never a crowd.
- Lead with the problem. Not the service.
- NP credential is a FEATURE. Never a disclaimer.
- Short sentences. Short paragraphs. Mobile-first reading.
- Community-first, anti-corporate tone.
- Free 15-minute consultation is always the primary CTA.
- Instagram DM is always included as a booking channel.

### Banned Words (never appear anywhere on the site)
journey | transform | transformation | holistic |
cutting-edge | wellness journey | affordable

---

## 4. GEO STRATEGY — THREE-LAYER ARCHITECTURE

This site serves 5-7 South Shore towns. No physical lease
signed yet. Strategy keeps homepage geo-neutral while
town pages handle local SEO.

### Layer 1 — Homepage (geo-neutral, human-led)
- Hero speaks to a person and a feeling. NOT a town.
- One reach line sits LOW on the page (not in the hero):
  "Serving Brockton, Stoughton, Easton, Bridgewater
   and the surrounding South Shore."
- No "most affordable" in any headline. Ever.

### Layer 2 — Town Landing Pages (SEO engine)
- One page per town. Both services on each page.
- URLs: /medical-weight-loss-brockton, /botox-stoughton, etc.
- Each needs 2-3 genuinely local sentences (not find-replace)
- Build Brockton page first. Template others until lease signed.
- These pages start ranking NOW — publish before lease.

### Layer 3 — Google Business Profile
- Waits for physical address (lease not signed yet)
- GBP setup is gated on confirmed practice location

---

## 5. HOMEPAGE — EXACT SECTION MAP

Render order in <Home />:
  <Banner />
  <Nav />
  <Hero />
  <Trust />
  <ServicesPanels />
  <Testimonials />
  <BrocktonSignal />
  <CtaFooter />  ← includes footer

### BANNER
- Background: var(--gold), height: 40px, z-index: 1001
- Text: "✦ Now Accepting Patients — Serving Brockton,
         Stoughton, Easton & Beyond ✦"
- DM Sans 13px, weight 600, uppercase, letter-spacing 0.1em
- Color: var(--espresso-dark)
- Rose "Book Now" pill: position absolute, right: 24px
- Mobile: text 11px

### NAV
- Fixed, top: 40px (below banner), z-index: 1000
- Default: transparent
- On scroll (>40px): rgba(44,24,16,0.97) + blur(12px)
- Logo left: gold "R" circle + "Refyn" white + "Me" gold
- Center links: About / Services / Weight Loss /
  Aesthetics / Contact — 11px, uppercase, gold on hover
- Right: "Book Now" rose button → /book
- Mobile: nav links hidden

### HERO
- Background: var(--espresso-dark), min-height: 100vh
- Layout: CSS grid 2 columns, align-items: center
- Padding: 96px 40px, max-width: 1280px
- Bottom: gradient fadeout to var(--cream)

LEFT COLUMN:
  - NO geo label (removed — hero is geo-neutral)
  - Headline (3 separate h1 elements):
      "Finally." — cream
      "<em>Someone who</em>" — italic gold
      "gets it." — cream
    Playfair clamp(52px→88px), weight 700, staggered fadeUp
  - Subtext: "Medical weight loss and aesthetic care by a
    board-certified Nurse Practitioner — built for women who
    deserve better than what they've been offered."
    17px, weight 300, rgba(cream, 0.7)
  - Buttons: "Start Your Journey →" (rose) + "Our Services"
    (outline cream, 2px border)

RIGHT COLUMN:
  - Photo wrap: 3:4 portrait placeholder, max-width: 460px
  - Badge 1 (top left of photo): ✦ circle + "Board-Certified /
    Nurse Practitioner" — espresso dark bg, gold border
  - Badge 2 (bottom right of photo): rose pulse dot +
    "Now Accepting Patients" — rose bg, rose border
  - Badges hidden on mobile

### TRUST BUILDER
- Background: var(--white), padding: 96px 40px
- Layout: 2 columns (1fr 1fr), gap: 80px

LEFT:
  - Image placeholder: 4:5 aspect ratio, cream-dark bg
  - Gold bracket corners: TL + BR, 40×40px, 2px solid gold
  - "2+" years card: absolute bottom-right INSIDE placeholder
    Playfair 48px gold + "Years Serving Brockton" cream

RIGHT:
  - Label: "Meet Your Provider" (gold)
  - Heading: "Expert care. Finally close to home."
    ("home." is italic rose)
  - Body: "As a board-certified Nurse Practitioner rooted
    right here in Brockton, I combine clinical precision with
    genuine community care. You're not a number — you're a
    neighbor. And you deserve a provider who treats you
    that way."
  - Credentials (✦ gold diamond bullet each):
      ✦ Board-Certified Nurse Practitioner (NP-BC)
      ✦ Specialized training in medical weight management
      ✦ Advanced aesthetic injector — Botox & fillers
      ✦ Brockton resident & community advocate
  - CTA: "Read My Full Story →" → /about (rose)

### SERVICES PANELS
- Background: var(--cream), padding-top: 96px
- Header centered: "What We Offer" label + gold lines
  Heading: "Two ways to" + italic gold "RefynMe."

PANEL 1 — WEIGHT LOSS (dark):
  - Left: espresso bg
    Label: "01 — Medical Weight Loss" (gold)
    Heading: "Real results. Real medicine."
    Body: "Clinically prescribed programs built for your body
    and your life. GLP-1 injections, oral medications, and
    personalized dietary guidance — supervised by a medical
    professional who actually knows your name."
    Tags (gold border, 3px radius):
      GLP-1 Injections | Oral Medications |
      Dietary Guidance | Ongoing Support
    CTA: "Explore Weight Loss →" → /weight-loss (auto-width)
  - Right: photo placeholder + "Medically Prescribed" badge

PANEL 2 — AESTHETICS (light, reversed):
  - Left: photo placeholder + "Natural Results" badge
  - Right: white bg
    Label: "02 — Aesthetic Services" (ROSE — not gold)
    Heading: "Look like yourself. Only more you."
    Body: "Botox, dermal fillers, and aesthetic treatments
    administered by a board-certified NP. Not a technician
    with a certificate. A medical professional who
    understands anatomy."
    Tags (rose border, 3px radius):
      Botox | Dermal Fillers |
      Lip Enhancement | Jawline Sculpting
    CTA: "Explore Aesthetics →" → /aesthetics (auto-width)

### TESTIMONIALS
- Background: #1C0F0A, padding: 96px 40px
- Header: "Patient Stories" label + gold lines
  Heading: "Real results. Real people."
- Grid: 3 columns, gap: 24px

CARD 1:
  ★★★★★
  "I had been trying to lose weight for three years. She
  actually looked at my labs, asked about my life, and built
  a plan for me. I have lost 24 lbs and I finally feel like
  myself again."
  Maria T. — Brockton — Weight Loss tag (gold border)

CARD 2:
  ★★★★★
  "I was nervous about Botox but she made me feel so
  comfortable. She explained every step and the results are
  so natural. My coworkers keep asking what I am doing
  differently."
  Keisha M. — Brockton — Aesthetics tag (rose border)

CARD 3:
  ★★★★★
  "Finally a provider who understands my skin tone and treats
  me like a person. Her medical background shows in everything
  she does. I will not go anywhere else."
  Sandra R. — Stoughton — Aesthetics tag (rose border)

Card CSS: espresso-mid bg, gold border 1px rgba(0.2),
border-radius 6px, padding 36px 32px
Tag pills: border-radius 3px
Mobile: 1 column

### BROCKTON SIGNAL
- Background: #0F0806, padding: 96px 40px, text-align: center
- Decorative CSS circles (gold border, opacity 0.1):
    Circle 1: 600px | Circle 2: 900px — both centered, absolute
- Label: "For Our Community" + gold side lines
- Heading: "Brockton" (cream) + italic gold "deserves this."
  Playfair clamp(56px→120px), letter-spacing -0.03em
- Body: "For too long, getting world-class medical aesthetic
  and wellness care meant leaving the city. We built RefynMe
  so you don't have to."
  17px, rgba(cream, 0.5), max-width 580px
- NO CTA button. Let the copy land.
- KEEP THIS SECTION BROCKTON-SPECIFIC. Do not generalize it.

### FINAL CTA + FOOTER
CTA BOX:
  - Wrapper: var(--cream) bg, padding: 96px 40px
  - Inner box: var(--espresso), border-radius 12px,
    padding: 72px 80px, grid 2 columns (1fr auto)
  - Left: "Start Today" label + "Ready to start?" heading +
    italic gold "We are ready for you." +
    "Book a free 15-minute consultation.
     No pressure. No commitment."
  - Right: rose "Book Now — It is Free →" button +
    "(508) 000-0000" muted text

FOOTER:
  - Background: var(--espresso), padding: 80px 40px 0
  - 4 columns: Brand | Services | Company | Contact
  - Brand: Logo + "Results you see. Confidence you own." +
    IG/TK/FB social squares
  - Bottom bar left: "© 2026 RefynMe. All rights reserved."
  - Bottom bar right: italic gold "Because you deserve care
    that gets you."
  - NOTE: Copyright year is 2026. Not 2025.

---

## 6. SECONDARY PAGES — CURRENT STATE

All 6 use <PageShell> from src/pages/PageShell.jsx.
PageShell renders: solid espresso nav + centered hero +
footer. Subtext: "This page is coming soon. Book a free
consultation while you wait."

Routes:
  /about        → About Us
  /services     → Our Services
  /weight-loss  → Medical Weight Loss
  /aesthetics   → Aesthetic Services
  /book         → Book Now (custom: show phone + email)
  /contact      → Contact Us

These are placeholders. Full pages get built per session.

---

## 7. KNOWN GAPS (fix in order of priority)

CRITICAL:
  [ ] Lead capture form — wire before driving any traffic
      Form → email + Google Sheet minimum
  [ ] Real phone number — replace (508) 000-0000 everywhere
  [ ] Real email — replace hello@refynme.com everywhere

IMPORTANT:
  [ ] SEO meta tags — description, OG tags, canonical URL
  [ ] Social links — replace href="#" with real handles
  [ ] Google Analytics — wire before launch
  [ ] About page — real content (blocked on wife's bio)
  [ ] Professional photos — blocked on wife

NEW WORK:
  [ ] Brockton town landing page
      URL: /medical-weight-loss-botox-brockton
  [ ] Town page template (for Stoughton, Easton, etc.)
  [ ] Reach line — add below Trust Builder on homepage

---

## 8. DEPLOYMENT RULES

- ALWAYS build on `staging` branch first
- `npm run build` must complete zero errors before any deploy
- Merge `staging` → `main` only after clean build + review
- `main` = what is live on refynme.com
- GitHub push to main triggers Hostinger auto-deploy

---

## 9. WHAT NEVER CHANGES WITHOUT EXPLICIT APPROVAL

- Color tokens (never add new colors)
- Font stack (never add a third font)
- Brockton Signal section (keep Brockton-specific)
- Tag pill border-radius (always 3px — never rounded)
- Button style (never full-width on desktop)
- Section padding rhythm (96px desktop / 64px mobile)
- Banned words list
