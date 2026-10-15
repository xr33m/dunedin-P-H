# Dunedin Plumbing & Heating — Enhancement Plan

Status: **Phases 1 (Design & Motion), 2 (Copywriting), 3 (SEO/Schema)
and 4 (Performance & Accessibility) are built and pushed, plus
the full service/area page structure** — Phase 3's EEAT items and favicon set remain
blocked on Phase 0 client data. Phases 5+ are still planning only. This
file is the shared checklist — tick items off as they're approved and
built.

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
- [x] Animated stat counters (5.0★, 25 Google reviews) that count up once
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

## Phase 3 — SEO, Schema & EEAT ✅ MOSTLY DONE

*Acting as SEO specialist.*

- [x] Unique `<title>` and meta description per page (all 14 pages —
      service/area titles follow a `{Service/Area} Edinburgh | Brand`
      pattern; descriptions truncate at word boundaries, not mid-word)
- [x] One clear, unique H1 per page — audited across all pages
      (homepage, 7 service, 6 area, 404) via automated scan
- [x] Schema markup:
  - [x] `LocalBusiness`/`Plumber` on homepage, expanded with `url` and
        per-review `Review` entries (no street address — see EEAT below)
  - [x] `Service` schema per service page, refined with `description`
        and canonical `url`
  - [x] `BreadcrumbList` schema matching the visible breadcrumbs on
        every service/area page
  - [x] `FAQPage` schema wrapping the Phase 2 FAQs on every service page
  - [x] Per-review `Review` markup (homepage: 6 reviews; each
        service/area page: its own featured review) — in addition to,
        not instead of, aggregate rating
- [ ] EEAT signals:
  - [ ] Expand About section with specific, real experience details —
        still blocked on more Phase 0 background info
  - [ ] Display certifications/Gas Safe number — **blocked on Phase 0**
  - [ ] Consistent NAP (name/address/phone) — already consistent
        site-wide (no street address used anywhere, so nothing to
        contradict)
  - [ ] Link out to the real Google Business Profile — **blocked on
        Phase 0** (need the real GBP URL)
- [x] Location pages: added a local map placeholder (dashed block,
      sized for a real Google Maps embed) to every area page; headings
      already use `{Service} in {Area}` / `Plumbing & Heating in {Area}`
      patterns
- [x] Technical SEO: `sitemap.xml` (all 14 indexable pages), `robots.txt`,
      canonical tags, Open Graph + Twitter Card meta on every page,
      custom 404 page matching the design system
  - [ ] Full favicon set (apple-touch-icon, multiple raster sizes) —
        **blocked on Phase 0** (no image-generation tool available here;
        needs a real logo/icon asset to export from)
- [ ] Submit to Google Search Console + Bing Webmaster Tools once live
      (Phase 6 — needs real hosting first)

Bug fixed in this pass: lead copy containing embedded quotes (e.g.
`"just old"`, `"nearly fixed"`) was breaking out of the meta
description/OG/Twitter `content="..."` attributes. Added proper
HTML-attribute escaping across all generated pages.

---

## Phase 4 — Performance & Accessibility ✅ DONE

- [x] Real photos (35, from the client's Drive) converted to WebP at
      480/640/960/1440px, all camera/GPS metadata stripped, served with
      `srcset`, explicit width/height (no layout shift), lazy-loaded below
      the fold, hero image preloaded with `fetchpriority="high"`
- [x] Fonts self-hosted (`/assets/fonts`, OFL) — no Google Fonts requests
- [x] `npm run build` minifies CSS/JS; `_headers` sets long cache on assets
- [x] Lighthouse (mobile, local, uncompressed): Performance 93–97,
      Accessibility 100, Best Practices 100, SEO 100, CLS 0
- [x] WCAG AA contrast across the palette (copper-700/800 for text)
- [x] Keyboard: visible focus, dropdown menus open with a button and close
      with Escape, lightbox has arrow-key and swipe navigation
- [x] Screen readers: decorative icons hidden, labelled carousels and menus

## Site structure (generated) ✅

All service and area pages are generated from `scripts/site-data.mjs` by
`scripts/generate.mjs`. **Don't hand-edit files in `/services` or `/areas`
— edit the data file and run `npm run generate`.** The generator also
refreshes the header, footer, services carousel, recent work, areas and
contact sections on `index.html` (between `<!-- gen:… -->` markers).

- 11 services (no gas/boiler work): Emergency Plumbing, Leak Detection &
  Repair, Bathroom Renovations (flagship, 23-photo gallery), Kitchen
  Fitting, Radiator Repair & Installation, Blocked Drains & Waste Pipes,
  Tap Repair & Installation, Water Heater Installation & Repairs, Water
  Line Repair, Lead Pipe Replacement, General Plumbing & Heating
- 18 areas: Leith, Portobello, Morningside, Bruntsfield, Marchmont,
  Newington, Stockbridge, New Town, Old Town, Corstorphine, Gorgie & Dalry,
  Murrayfield, Colinton, Liberton, Trinity & Granton, Musselburgh,
  Dalkeith, Prestonpans
- 198 area × service pages (`/areas/<area>/<service>/`) with copy tailored
  to each area's housing stock, local FAQs, Service/FAQ/Breadcrumb schema
- `/services/gas-boiler-servicing/` 301-redirects to General Plumbing &
  Heating (`_redirects`)
- [ ] Confirm with Kevin: kitchen fitting and blocked drains are services
      he wants to advertise
- [ ] Confirm `enquires@dunedinplumbing.co.uk` (from his current site) is
      the right mailbox — the form's email fallback sends there

### Running locally / on Bolt.new

`package.json` + `vite.config.js` exist only so Bolt (or any machine) can
preview the site — the site itself is still plain HTML/CSS/JS.

- `npm install` then `npm run dev` → live preview with all pages
- `npm run generate` → rebuilds all service/area pages from the data file
- `npm run build` → generates, then copies + minifies into `dist/` for
  deploys (publish directory: `dist`)

## Conversion upgrades ✅ DONE (callback form + trust strip)

- [x] **Callback booking form on every page** (homepage, all 7 service
      pages, all 6 area pages) — urgency, service (pre-selected on service
      pages), preferred day/date and time window, name, phone, optional
      postcode/email/details. Emergency choice shows a "call now" prompt.
      Validates phone numbers, flags errors for screen readers, has a
      spam honeypot, and shows a confirmation with the chosen callback time.
- [ ] **Connect the form to Kevin** — set `data-endpoint="…"` on
      `#contactForm` to a webhook (e.g. Make.com → SMS via the Dunedin
      Twilio number and/or email). Until then it falls back to opening
      the visitor's email app pre-filled (the old behaviour). Payload is
      JSON: name, phone, email, postcode, urgency, service, day, date,
      time, message, page, submitted_at.
- [x] **Trust strip on every page** — 5.0★ / 25 Google reviews, 24/7,
      price agreed before we start, named plumber; reassurance line under
      every submit button.
- [ ] Add to the trust strip once Kevin confirms: public liability
      insurance, workmanship guarantee length, payment methods (slot is
      marked with a comment in the HTML).

## Homepage redesign v2 ✅ DONE

Layout patterns taken from a reference plumbing site (structure only —
Dunedin's own brand colours, copy and claims):

- [x] Condensed uppercase display headings (Barlow Condensed), chip-style
      section badges, squarer buttons with ↗ arrows — applied site-wide
- [x] Hero: badge, headline, 3 icon USPs, Book + phone buttons, Google
      rating badge, large photo slot with ring + "24/7" tag
- [x] "Request a callback" quick bar overlapping the hero (name, phone,
      service) — sends through the same pipeline as the main form
- [x] Services carousel: photo cards with white label panels and icon
      badges, arrows, dots, swipe on mobile
- [x] About split: photo with stat chips (5.0★ rating, 25 reviews)
- [x] How it works: 4 connected steps (replaces the old Why Us grid;
      nav label is now "How It Works")
- [x] Testimonials: dark band review carousel with avatars and stars
- [ ] Real photos for: hero (Kevin + van), each service card, about image
- [ ] Optional: carry the hero/photo layout through to service and area pages

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
