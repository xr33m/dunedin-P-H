# Dunedin Plumbing & Heating — Enhancement Plan

Status: **Phases 1 (Design & Motion) and 2 (Copywriting) are built and
pushed.** Phase 3+ are still planning only. This file is the shared
checklist — tick items off as they're approved and built.

Site lives in this folder as plain HTML/CSS/JS (`index.html`, `style.css`,
`script.js`, plus `/services/<slug>/` and `/areas/<slug>/` subpages). No
build step, no framework — keep it that way unless a phase below says
otherwise.

---

## Phase 0 — Content & Asset Prep *(suggested addition)*

Nothing in Phase 1–3 can fully finish without these inputs from the client.
Flagging now so it doesn't block later.

- [ ] Real photos: van/branding, Kevin and/or team, before/after job shots
      (bathroom, boiler, tenement work) — until supplied, Phase 1 uses
      **styled placeholders**, not stock photos
- [ ] Logo file (if one exists beyond the current text + icon mark)
- [ ] **Gas Safe Register number** — legally required to display for any UK
      business advertising gas boiler work (Phase 3 "Gas Boiler Servicing"
      page currently makes no certification claim; this needs a real
      number or the page's trust claims stay generic)
- [ ] Any other certifications/insurance details (public liability, OFTEC,
      trade body memberships)
- [ ] Confirm real contact email (site currently uses a placeholder:
      `info@dunedinplumbing.co.uk`)
- [ ] Confirm exact service area list / anything to add beyond the 6
      current area pages (Leith, Morningside, Corstorphine, Portobello,
      Musselburgh, Newington)
- [ ] Any additional Google reviews beyond the 4 currently quoted
- [ ] Real domain + hosting target (for Phase 6 launch)

---

## Phase 1 — Design & Motion ✅ DONE

*Acting as web designer. Images use styled placeholders (labelled blocks,
not stock photos) until Phase 0 assets arrive.*

- [x] Scroll-triggered reveal animations on section content (fade + slide
      up), via vanilla `IntersectionObserver` — no added dependency
- [x] Respect `prefers-reduced-motion`: all animation disabled/instant for
      users who request it
- [x] Animated stat counters (5.0★, 20 reviews) that count up once
      scrolled into view
- [x] Scrollspy: active nav link highlights as you scroll past each section
      (homepage; subpages link back to homepage anchors so scrollspy
      doesn't apply there)
- [x] Refined sticky header: shrinks/compacts on scroll, not just a shadow
- [x] Parallax/subtle depth on hero background gradient shapes (homepage +
      every service/area page)
- [x] Hover/press micro-interactions pass on buttons, cards, nav (tactile,
      not showy)
- [x] Image placeholder system: labelled placeholder blocks (e.g. "Photo:
      Bathroom renovation, Edinburgh") sized correctly so real photos can
      be dropped in later by swapping a file, no layout changes needed —
      used in a new homepage "Recent Work" gallery and every service/area
      page hero
- [x] Add a hero visual (placeholder) — "Recent Work" gallery added to
      homepage; service/area pages got a placeholder photo block each
- [x] Apply the same motion system consistently across homepage, service
      pages and area pages

Built with vanilla `IntersectionObserver` (confirmed: zero dependencies,
verified working with and without reduced-motion, and confirmed every
`.reveal` element resolves to visible after a real scroll-through on both
homepage and subpages).

---

## Phase 2 — Typography & Copywriting ✅ DONE

*Acting as copywriting/CRO specialist. Goal: more enquiries, more time on
page.*

Decisions locked in before writing (confirmed with client):
- **Voice:** team ("we"), not first-person Kevin
- **Core objection to beat:** trust — "cowboy plumbers" / scams — not price
  or speed
- **Urgency level:** strong, consequence-driven in emergency copy
- **FAQs:** written now (content), schema markup deferred to Phase 3

Framework per page type:
- Homepage hero / why-us / about: **PAS** + **HSO**, naming the fear
  (no-shows, shifting quotes, vanishing invoices) before the solution
- Service pages: **DIC** hook disrupting the "this is normal" assumption,
  then straight into proof
- Area pages: **AIDA**, same trust throughline, less narrative weight
- Emergency banner / urgent CTAs: compressed **DIC**, consequence-driven

- [x] Rewrite hero, service, and area copy using a persuasion framework
      (PAS/HSO/DIC/AIDA per page type, not one-size-fits-all)
- [x] Strengthen CTA microcopy and trust-bar/why-us copy around the
      cowboy-plumber objection specifically
- [x] Add a short FAQ block per service (3 Q&As each, written now —
      FAQPage schema itself is still Phase 3)
- [x] Social-proof callouts placed near CTAs (hero stat card, trust bar,
      about-stats) in addition to the dedicated reviews section
- [ ] Audit and tighten type scale (headline sizes, line-height, measure)
      for readability on mobile and desktop — not done this pass, still
      open if needed
- [ ] Review all placeholder/generic claims (e.g. "fully insured") and
      flag any that need Phase 0 data to become specific and provable —
      still open, blocked on Phase 0 client input
- [ ] Deeper pass on About section with specific, real detail once
      Phase 0 supplies more background — current version is a solid
      HSO draft but still somewhat generic without real specifics

---

## Phase 3 — SEO, Schema & EEAT

*Acting as SEO specialist.*

- [ ] Unique, keyword-targeted `<title>` and meta description per page
      (service pages and area pages have a first pass already — refine
      with real keyword targeting)
- [ ] One clear, unique H1 per page — audit for consistency across all
      19 pages
- [ ] Schema markup:
  - [ ] `LocalBusiness`/`Plumber` (already on homepage — expand with real
        address/geo if the client wants a public address)
  - [ ] `Service` schema per service page (already a first pass — refine)
  - [ ] `BreadcrumbList` schema matching the visible breadcrumbs
  - [ ] `FAQPage` schema once Phase 2 FAQs are written
  - [ ] Per-review `Review` markup (currently only aggregate rating)
- [ ] EEAT signals:
  - [ ] Expand About/Kevin section with specific, real experience details
  - [ ] Display certifications/Gas Safe number once Phase 0 supplies them
  - [ ] Consistent NAP (name/address/phone) across site, GBP and any
        directories
  - [ ] Link out to the real Google Business Profile for review
        verification
- [ ] Location pages: add local map embed (placeholder until a real
      address/area is confirmed), strengthen local-keyword usage in
      headings
- [ ] Technical SEO: `sitemap.xml`, `robots.txt`, canonical tags, Open
      Graph + Twitter Card meta, full favicon set, custom 404 page
- [ ] Submit to Google Search Console + Bing Webmaster Tools once live
      (Phase 6)

---

## Phase 4 — Performance & Accessibility *(suggested addition)*

- [ ] Core Web Vitals pass once real images land (lazy loading, correct
      sizing, modern formats)
- [ ] WCAG AA contrast check across the navy/copper/teal palette
- [ ] Full keyboard navigation + visible focus states audit
- [ ] Screen-reader pass on nav, forms, and icon-only buttons

## Phase 5 — Analytics & Conversion Tracking *(suggested addition)*

- [ ] GA4 or similar installed
- [ ] Call tracking on `tel:` links (click-to-call events)
- [ ] Form submission tracking on the contact form
- [ ] (Optional) scroll-depth / heatmap tool

## Phase 6 — QA & Launch *(suggested addition)*

- [ ] Cross-browser/device testing (iOS Safari, Android Chrome, desktop)
- [ ] Broken link check across all 19 pages
- [ ] Real domain, hosting, SSL
- [ ] Submit sitemap to Search Console/Bing

## Phase 7 — Post-Launch Maintenance *(suggested addition)*

- [ ] Cadence for refreshing reviews/testimonials
- [ ] Cadence for checking Core Web Vitals / broken links
- [ ] Who owns future content edits (this repo has no CMS — edits are
      direct HTML/CSS)

---

## Decisions needed before building anything

1. Confirm the phase order above (1 → 2 → 3, plus which of 4–7 to include)
2. Animation approach for Phase 1: vanilla JS vs. GSAP (see note above)
3. Phase 0 inputs — what can you supply now vs. what should stay
   placeholder for this round
4. Gas Safe / certification claims — confirm before Phase 3 publishes
   anything specific
