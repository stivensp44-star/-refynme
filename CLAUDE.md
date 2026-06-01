# RefynMe — Brand & Build Standards

This file is the single source of truth for the RefynMe website. Read it at the start of every session before making any change.

## Business
- Entity: RefynMe Medical and Wellness, PLLC (Massachusetts)
- Provider: Board-Certified Nurse Practitioner, Brockton, MA
- Tagline: "Results you see. Confidence you own."
- Domain: refynme.com (hosted on Hostinger)
- Stack: Vite + React

## Color Tokens (defined in index.css — do not invent new colors)
- `--espresso`: #2C1810
- `--espresso-dark`: #1C0F0A
- `--espresso-mid`: #3D1F14
- `--gold`: #D4A853
- `--gold-light`: #E2C47A
- `--cream`: #FAF6F0
- `--cream-dark`: #F0E8DC
- `--rose`: #C4687A
- `--rose-light`: #CC7080
- `--white`: #FFFCF8

## Typography
- Headlines + italic accents: Playfair Display
- Body + UI: DM Sans
- Never introduce a third typeface.

## Voice Rules
- Talk to ONE person, not a crowd.
- Lead with the problem, not the service.
- The NP credential is a feature, not a disclaimer — state it with confidence.
- Direct, community-first, anti-corporate.

## Banned Words
Never use: journey, transform, holistic, cutting-edge.

## Geographic Anchor
- "Brockton, MA" is named repeatedly as a trust signal.
- Primary SEO keywords: medical weight loss Brockton MA, Botox Brockton MA, semaglutide Brockton MA.

## Authority Marker
- "Board-Certified Nurse Practitioner" appears in hero, trust section, and service panels.

## Deploy Rule
- `npm run build` MUST complete with zero errors before any deploy.
- Production deploy = upload `dist/index.html` + `dist/assets/` to Hostinger `public_html`.

## Branch Workflow
- Build on `staging`. Merge to `main` only after `npm run build` passes clean.
- `main` reflects what is live on refynme.com.
