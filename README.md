# Dunedin Plumbing & Heating — Enhancement Plan

Status: **Phases 1 (Design & Motion), 2 (Copywriting), 3 (SEO/Schema)
and 4 (Performance & Accessibility) are built and pushed** — Phase 3's EEAT items and favicon set remain
blocked on Phase 0 client data. Phase 4's image performance item waits on real photos. Phases 5+ are
still planning only. This
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

## Phase 4 — Performance & Accessibility ✅ DONE (images pending)

- [ ] Core Web Vitals pass once real images land — **blocked on Phase 0
      photos**. Prep done: a real `<img>` dropped inside any
      `.img-placeholder` now fills the same box (no layout shift). When
      adding photos use `loading="lazy" decoding="async"`, explicit
      `width`/`height`, and WebP/AVIF.
- [x] WCAG AA contrast check across the navy/copper/teal palette — the
      original copper (#e8622c) only reached 3.4:1 with white, failing AA
      for buttons and small text. Added `--copper-700` (#bf4a1a, 4.99:1)
      and `--copper-800` (#a3401a, 6.35:1) for primary buttons, the
      mobile call bar, skip link, links, active nav, form errors and the
      emergency banner. Bright copper kept for icons/borders/decoration,
      where 3:1 applies and it passes. Teal, muted text and all
      white-on-navy text already passed.
- [x] Full keyboard navigation + visible focus states — global
      `:focus-visible` ring (teal on light, white on dark sections), form
      focus ring, skip link now lands fully on screen. Mobile menu: focus
      moves into the menu on open, Escape closes it and returns focus to
      the toggle, clicking outside closes it.
- [x] Screen-reader pass on nav, forms, and icon-only buttons — all
      decorative SVGs `aria-hidden`; star glyphs hidden (rating is in the
      text next to them); menu toggle label switches Open/Close; form
      marks missing fields `aria-invalid`, focuses the first one and
      announces the error via the existing live region; stat counters
      hold their real value in the HTML (JS only animates them).
- [x] Reduced motion now also disables smooth scrolling and hover
      transitions site-wide.

### Running locally / on Bolt.new

`package.json` + `vite.config.js` exist only so Bolt (or any machine) can
preview the site — the site itself is still plain HTML/CSS/JS.

- `npm install` then `npm run dev` → live preview with all pages
- `npm run build` → copies the site unchanged into `dist/` for deploys
  (publish directory: `dist`)

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
