# Dunedin Plumbing & Heating — Enhancement Plan

Status: **PLANNING — nothing below has been implemented yet.** This file is the
shared checklist. Tick items off as they're approved and built.

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

## Phase 1 — Design & Motion

*Acting as web designer. Images use styled placeholders (labelled blocks,
not stock photos) until Phase 0 assets arrive.*

- [ ] Scroll-triggered reveal animations on section content (fade + slide
      up), via vanilla `IntersectionObserver` — no added dependency
- [ ] Respect `prefers-reduced-motion`: all animation disabled/instant for
      users who request it
- [ ] Animated stat counters (5.0★, 20 reviews, 24/7) that count up once
      scrolled into view
- [ ] Scrollspy: active nav link highlights as you scroll past each section
- [ ] Refined sticky header: shrink/compact on scroll, not just a shadow
- [ ] Parallax/subtle depth on hero background gradient shapes
- [ ] Hover/press micro-interactions pass on buttons, cards, nav (tactile,
      not showy)
- [ ] Image placeholder system: labelled placeholder blocks (e.g. "Photo:
      Bathroom renovation, Edinburgh") sized correctly so real photos can
      be dropped in later by swapping a file, no layout changes needed
- [ ] Add a hero visual (placeholder) — currently text/stat-card only
- [ ] Apply the same motion system consistently across homepage, service
      pages and area pages

**Open question:** vanilla `IntersectionObserver` (zero dependencies, fast,
fully custom) vs. a small animation library like GSAP ScrollTrigger via CDN
(faster to build richer effects, adds ~40–60kb). Recommend vanilla unless
you want more elaborate parallax/pinning effects.

---

## Phase 2 — Typography & Copywriting

*Acting as copywriting/CRO specialist. Goal: more enquiries, more time on
page.*

- [ ] Audit and tighten type scale (headline sizes, line-height, measure)
      for readability on mobile and desktop
- [ ] Rewrite hero, service, and area copy using a persuasion framework
      (problem → agitation → solution) without sounding salesy
- [ ] Strengthen CTA microcopy (button text variants, urgency that's
      honest — e.g. tied to real 24hr availability, not fake scarcity)
- [ ] Add a short FAQ block per service (serves copy AND SEO — see Phase 3)
- [ ] Tighten paragraphs for scannability: shorter blocks, bolded key
      phrases, bullet-first where possible
- [ ] Social-proof callouts placed near CTAs, not just in the reviews
      section (e.g. a rating strip repeated near bottom-of-page CTAs)
- [ ] Review all placeholder/generic claims (e.g. "fully insured") and
      flag any that need Phase 0 data to become specific and provable
- [ ] Pass on About/Kevin section — more personal, specific detail (ties
      into EEAT in Phase 3)

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
