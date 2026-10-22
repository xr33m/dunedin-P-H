// ---------------------------------------------------------------------------
// Static page generator — run with `npm run generate`.
// Builds: /services/*, /areas/*, /areas/<area>/<service>/, sitemap.xml,
// and refreshes the shared header/footer/sections on index.html
// and 404.html (between <!-- gen:NAME --> markers).
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, SERVICES, AREAS, REVIEWS, STEPS, TYPE_LABEL, INDEXED_COMBOS } from './site-data.mjs';
import { GUIDES } from './guides-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = JSON.parse(readFileSync(join(ROOT, 'scripts/images.json'), 'utf8'));
const CONTACT_TPL = readFileSync(join(ROOT, 'scripts/partials/contact.html'), 'utf8');
const TODAY = new Date().toISOString().slice(0, 10);

const svcBy = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
const areaBy = Object.fromEntries(AREAS.map((a) => [a.slug, a]));
const pages = []; // for sitemap

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const trim = (s, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,;:—-]\s*$/, '') + '…');
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);

const ICONS = {
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  drop: '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  sink: '<path d="M3 11h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 11V5a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  radiator: '<rect x="4" y="5" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 5v13M12 5v13M16 5v13M6 18v2M18 18v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  drain: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5a4.5 4.5 0 1 1-4.5 4.5M12 10a2 2 0 1 1-2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  tap: '<path d="M4 9h8a4 4 0 0 1 4 4v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 5h4M10 5v4M16 18v.5M16 21v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  heater: '<rect x="6" y="3" width="12" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 9c-1 1.2-1.6 2.2-1.6 3.2a1.6 1.6 0 0 0 3.2 0c0-1-.6-2-1.6-3.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 17h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  pipe: '<path d="M3 8h8a3 3 0 0 1 3 3v10M3 12h6a1 1 0 0 1 1 1v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 4v4M15 6h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  lead: '<path d="M4 12h16M6 12V7a2 2 0 0 1 2-2h3M6 12v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="16.5" r="1" fill="currentColor"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M5 5l4 4M3.5 6.5l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" fill="currentColor"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  pin: '<path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8"/>',
  arrow: '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  chev: '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  drip: '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z" fill="currentColor"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};
const icon = (name, cls = '', size) =>
  `<svg${cls ? ` class="${cls}"` : ''}${size ? ` width="${size}" height="${size}"` : ''} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
const ARROW = icon('arrow', 'arrow-ne');

const BRAND_MARK = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
          <path d="M24 4C24 4 12 18.5 12 28a12 12 0 0 0 24 0C36 18.5 24 4 24 4Z" fill="currentColor" opacity="0.15"/>
          <path d="M24 4C24 4 12 18.5 12 28a12 12 0 0 0 24 0C36 18.5 24 4 24 4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M18 28a6 6 0 0 0 6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;

// Responsive <img>. `sizes` describes the rendered width.
function img(name, alt, { sizes = '(max-width: 780px) 100vw, 400px', eager = false, cls = '' } = {}) {
  const m = IMAGES[name];
  if (!m) throw new Error(`Unknown image ${name}`);
  const srcset = m.sizes.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ');
  const base = m.sizes.includes(960) ? 960 : m.sizes[m.sizes.length - 1];
  const h = Math.round((base * m.h) / m.w);
  return `<img src="/assets/img/${name}-${base}.webp" srcset="${srcset}" sizes="${sizes}" width="${base}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
}
const largest = (name) => `/assets/img/${name}-${IMAGES[name].sizes.at(-1)}.webp`;
const photoBox = (name, alt, cls = '', opts = {}) => `<div class="img-placeholder has-img${cls}">${img(name, alt, opts)}</div>`;

// Meta title formula (agency SOP):
// "BEST [primary] [place], if you're looking for [primary], [secondary] or
//  [secondary] services near me then Dunedin Plumbing & Heating is the best company to use"
const metaTitle = (primary, place, kw1, kw2, kw3) =>
  `BEST ${primary} ${place}, if you're looking for ${kw1}, ${kw2} or ${kw3} services near me then ${SITE.name} is the best company to use`;
const kwOf = (slug) => svcBy[slug].kw;

const svcUrl = (s) => `/services/${s.slug}/`;
const areaUrl = (a) => `/areas/${a.slug}/`;
const comboUrl = (a, s) => `/areas/${a.slug}/${s.slug}/`;

// ---------- shared chrome ----------
function header({ home = false, contact = '#contact' } = {}) {
  const h = (anchor) => (home ? `#${anchor}` : `/#${anchor}`);
  const svcLinks = SERVICES.map((s) => `<li><a href="${svcUrl(s)}">${esc(s.name)}</a></li>`).join('\n            ');
  const areaLinks = AREAS.map((a) => `<li><a href="${areaUrl(a)}">${esc(a.name)}</a></li>`).join('\n            ');
  return `<!-- gen:header -->
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a href="${home ? '#top' : '/'}" class="brand brand-logo" aria-label="Dunedin Plumbing &amp; Heating — home">
      <img src="/assets/logo-160.webp" srcset="/assets/logo-96.webp 96w, /assets/logo-160.webp 160w, /assets/logo-240.webp 240w" sizes="80px" width="80" height="78" alt="Dunedin Plumbing &amp; Heating" fetchpriority="high">
    </a>

    <nav class="main-nav" id="mainNav" aria-label="Primary">
      <div class="nav-item has-sub">
        <a href="/services/" class="nav-top">Services</a>
        <button type="button" class="sub-toggle" aria-expanded="false" aria-controls="subServices"><span class="sr-only">Show services</span>${icon('chev')}</button>
        <div class="sub-menu" id="subServices">
          <ul>
            ${svcLinks}
          </ul>
        </div>
      </div>
      <a href="/services/bathroom-renovations/">Bathrooms</a>
      <div class="nav-item has-sub">
        <a href="/areas/" class="nav-top">Areas</a>
        <button type="button" class="sub-toggle" aria-expanded="false" aria-controls="subAreas"><span class="sr-only">Show areas</span>${icon('chev')}</button>
        <div class="sub-menu sub-menu-cols" id="subAreas">
          <ul>
            ${areaLinks}
          </ul>
        </div>
      </div>
      <a href="/guides/">Guides</a>
      <a href="/about/">About</a>
      <a href="${h('reviews')}">Reviews</a>
      <a href="${contact}">Contact</a>
    </nav>

    <div class="header-cta">
      <a href="tel:${SITE.phoneIntl}" class="btn btn-call">
        ${icon('phone', '', 18)}
        <span>${SITE.phone}</span>
      </a>
    </div>

    <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<!-- /gen:header -->`;
}

function footer({ home = false, contact = '#contact' } = {}) {
  const h = (anchor) => (home ? `#${anchor}` : `/#${anchor}`);
  return `<!-- gen:footer -->
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <a href="/" class="footer-logo" aria-label="Dunedin Plumbing &amp; Heating — home">
        <img src="/assets/logo-160.webp" srcset="/assets/logo-160.webp 160w, /assets/logo-240.webp 240w" sizes="120px" width="120" height="116" alt="Dunedin Plumbing &amp; Heating" loading="lazy" decoding="async">
      </a>
      <div>
        <p class="footer-tagline">Honest, local plumbing across Edinburgh, the Lothians and Fife.</p>
        <p class="footer-rating"><span class="stars" aria-hidden="true">★★★★★</span> ${SITE.rating} from ${SITE.reviewCount} Google reviews</p>
      </div>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      ${SERVICES.map((s) => `<a href="${svcUrl(s)}">${esc(s.name)}</a>`).join('\n      ')}
    </div>

    <div class="footer-col">
      <h4>Areas</h4>
      ${AREAS.slice(0, 10).map((a) => `<a href="${areaUrl(a)}">${esc(a.name)}</a>`).join('\n      ')}
      <a href="/areas/" class="footer-more">All areas →</a>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <a href="tel:${SITE.phoneIntl}">${SITE.phone}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <span>Open 24 hours</span>
      <a href="/about/">About us</a>
      <a href="/guides/">Plumbing guides</a>
      <a href="${h('reviews')}">Reviews</a>
      <a href="${contact}">Book a callback</a>
    </div>
  </div>

  <div class="container footer-bottom">
    <p>&copy; <span id="year">${new Date().getFullYear()}</span> Dunedin Plumbing &amp; Heating. All rights reserved.</p>
  </div>
</footer>

<nav class="mobile-call-bar" aria-label="Quick contact">
  <a href="tel:${SITE.phoneIntl}" class="mcb-call">
    ${icon('phone', '', 18)}
    <span>Call now</span>
  </a>
  <a href="${contact}" class="mcb-book">
    ${icon('calendar', '', 18)}
    <span>Book a callback</span>
  </a>
</nav>

<button class="back-to-top" id="backToTop" aria-label="Back to top">
  ${icon('up', '', 20)}
</button>
<!-- /gen:footer -->`;
}

function contactSection(preselect, place = 'Edinburgh') {
  const opts = [['Emergency plumbing', null], ...SERVICES.filter((s) => s.slug !== 'emergency-plumbing').map((s) => [s.name, s.slug]), ['Something else', null]]
    .map(([label, slug]) => `            <option value="${esc(label)}"${preselect && slug === preselect ? ' selected' : ''}>${esc(label)}</option>`)
    .join('\n');
  const html = CONTACT_TPL.replace('{{SERVICE_OPTIONS}}', opts).replace('{{CONTACT_H2}}', `Book a Plumber in ${esc(place)} — We’ll Call You Back`);
  return `<!-- gen:contact -->\n${html.trimEnd()}\n  <!-- /gen:contact -->`;
}

const TRUST_BAR = `  <section class="trust-bar" aria-label="Why customers choose us">
    <div class="container trust-bar-inner">
      <div class="trust-item"><strong>${SITE.rating}★</strong><span>${SITE.reviewCount} Google reviews</span></div>
      <div class="trust-item"><strong>24/7</strong><span>Emergency call-outs</span></div>
      <div class="trust-item"><strong>Fixed</strong><span>Price agreed before we start</span></div>
      <div class="trust-item"><strong>Local</strong><span>Named plumber, no call centre</span></div>
    </div>
  </section>`;

const chip = (text, dark = false) => `<p class="chip${dark ? ' chip-dark' : ''}"><span class="chip-icon" aria-hidden="true">${icon('drip')}</span>${text}</p>`;

function breadcrumb(items) {
  const html = items
    .map(([label, url], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${url}">${esc(label)}</a>`))
    .join('<span class="sep" aria-hidden="true">/</span>');
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${html}</nav>`;
}
const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([label, url], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: SITE.url + url })),
});

function pageHero({ crumbs, title, benefit, lead, photo, photoAlt, eyebrow }) {
  return `  <section class="page-hero page-hero-v2">
    <div class="hero-decor" aria-hidden="true"></div>
    <div class="container page-hero-grid">
      <div class="page-hero-copy">
        ${breadcrumb(crumbs)}
        ${eyebrow ? chip(eyebrow, true) : ''}
        <h1>${title}${benefit ? `<span class="h1-benefit"><span class="sr-only"> — </span>${benefit}</span>` : ''}</h1>
        <p class="page-hero-lead">${lead}</p>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-primary btn-lg">Book a Callback ${ARROW}</a>
          <a href="tel:${SITE.phoneIntl}" class="btn btn-white btn-lg">${icon('phone')}<span>${SITE.phone}</span></a>
        </div>
        <div class="rating-badge">
          <span class="rating-score">${SITE.rating}</span>
          <span class="rating-meta"><span class="stars" aria-hidden="true">★★★★★</span><span>${SITE.reviewCount} Google reviews</span></span>
        </div>
      </div>
      <div class="page-hero-media">
        ${photoBox(photo, photoAlt, ' page-hero-photo', { eager: true, sizes: '(max-width: 980px) 100vw, 520px' })}
      </div>
    </div>
  </section>`;
}

function reviewCards(names, heading = `Rated ${SITE.rating} on Google by ${SITE.reviewCount} Customers`) {
  const cards = names
    .map((n) => {
      const initials = n.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
      return `        <article class="t-card">
          <div class="t-head"><span class="t-avatar" aria-hidden="true">${initials}</span><strong>${esc(n)}</strong></div>
          <p>“${esc(REVIEWS[n])}”</p>
          <div class="t-foot"><span>Google review</span><span class="stars" role="img" aria-label="5 out of 5 stars">★★★★★</span></div>
        </article>`;
    })
    .join('\n');
  return `  <section class="section testimonials" id="reviews">
    <div class="container">
      <div class="section-head">
        ${chip('Reviews', true)}
        <h2>${heading}</h2>
      </div>
      <div class="t-grid t-grid-${Math.min(names.length, 3)}">
${cards}
      </div>
      <p class="t-summary"><strong>${SITE.rating}</strong> <span class="stars" aria-hidden="true">★★★★★</span> ${SITE.reviewCount} reviews on Google</p>
    </div>
  </section>`;
}

function faqSection(faqs, heading = 'What people ask before booking') {
  return `  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('Questions')}
        <h2>${heading}</h2>
      </div>
      <div class="faq-list">
${faqs.map(([q, a]) => `        <details class="faq-item">
          <summary><h3>${esc(q)}</h3>${icon('chev', 'faq-chev')}</summary>
          <p>${esc(a)}</p>
        </details>`).join('\n')}
      </div>
    </div>
  </section>`;
}
const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const stepsSection = (heading = 'How Our Plumbing Service Works') => `  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        ${chip('How it works')}
        <h2>${heading}</h2>
      </div>
      <ol class="steps steps-3">
${STEPS.map(([t, d], i) => `        <li class="step">
          <span class="step-icon" aria-hidden="true">${icon(['phone', 'calendar', 'check'][i])}</span>
          <h3><span class="step-num">${i + 1}.</span> ${esc(t)}</h3>
          <p>${esc(d)}</p>
        </li>`).join('\n')}
      </ol>
    </div>
  </section>`;

const emergency = (place = 'Edinburgh') => `  <section class="emergency-banner">
    <div class="container emergency-inner">
      <div>
        <p class="eyebrow eyebrow-light">Don't wait on this</p>
        <h2>24/7 Emergency Plumber in ${esc(place)}</h2>
        <p><strong>That drip won't still be a drip by morning.</strong> A small leak left overnight is a soaked ceiling by breakfast — and a far bigger bill than calling now. We're on call 24 hours a day, every day, and a real person answers.</p>
      </div>
      <a href="tel:${SITE.phoneIntl}" class="btn btn-primary btn-lg">Call ${SITE.phone}</a>
    </div>
  </section>`;

function svcCard(s, href = svcUrl(s), sizes = '(max-width: 560px) 86vw, (max-width: 1100px) 33vw, 280px', place = '') {
  return `          <article class="svc-card">
            ${photoBox(s.photo, s.photoAlt, ' svc-photo', { sizes })}
            <div class="svc-panel">
              <div class="svc-icon" aria-hidden="true">${icon(s.icon)}</div>
              <h3>${esc(s.name)}${place ? ` in ${esc(place)}` : ''}</h3>
              <p>${esc(s.short)}</p>
              <a href="${href}" class="service-link">Learn more<span class="sr-only"> about ${esc(s.name)}</span> ${ARROW}</a>
            </div>
          </article>`;
}

function galleryBlock(groups, idPrefix) {
  return groups
    .map((g, gi) => `      <div class="gallery-group">
        <h3>${esc(g.title)}</h3>
        <div class="photo-grid">
${g.photos.map(([name, alt]) => `          <a class="photo-item" href="${largest(name)}" data-lightbox="${idPrefix}-${gi}" data-caption="${esc(alt)}">
            ${img(name, alt, { sizes: '(max-width: 560px) 50vw, (max-width: 980px) 33vw, 280px' })}
          </a>`).join('\n')}
        </div>
      </div>`)
    .join('\n');
}

function areaPills(list, urlFn) {
  return `<div class="areas-list">
        ${list.map((x) => `<a href="${urlFn(x)}" class="area-pill">${esc(x.name)}</a>`).join('\n        ')}
      </div>`;
}

const businessNode = (extra = {}) => ({
  '@type': 'Plumber',
  '@id': `${SITE.url}/#business`,
  name: SITE.legalName,
  url: `${SITE.url}/`,
  telephone: SITE.phoneIntl,
  email: SITE.email,
  image: `${SITE.url}${largest('bath-freestanding')}`,
  logo: `${SITE.url}/assets/logo.png`,
  priceRange: '££',
  address: { '@type': 'PostalAddress', addressLocality: 'Edinburgh', addressCountry: 'GB' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
  ...extra,
});

function shell({ path, title, description, body, schema = [], preload, home = false, ogImage, place = 'Edinburgh', noindex = false }) {
  const canonical = SITE.url + path;
  const graph = JSON.stringify({ '@context': 'https://schema.org', '@graph': schema }, null, 1);
  const og = ogImage || largest('bath-freestanding');
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="6aGDR1Ic4Pho_zj1dd0wsI0neUsDuGTe3EBH4sDO0zA" />
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16755258544"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-16755258544');
  // Google forwarding number for visitors from ads (call conversions over 60s).
  // Swaps the visible number and every tel: link to the tracked number.
  gtag('config', 'AW-16755258544/4u8KCLvY1qQdELDpw7U-', {
    'phone_conversion_number': '07479 977246',
    'phone_conversion_callback': function (formatted, mobile) {
      var swap = function () {
        var dial = 'tel:' + String(mobile || formatted).replace(/[^+0-9]/g, '');
        document.querySelectorAll('a[href^="tel:"]').forEach(function (a) { a.href = dial; });
        var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
        while ((n = w.nextNode())) {
          if (n.nodeValue.indexOf('07479 977246') > -1 && !n.parentNode.closest('script')) {
            n.nodeValue = n.nodeValue.split('07479 977246').join(formatted);
          }
        }
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', swap); else swap();
    }
  });
</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dunedin Plumbing &amp; Heating">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${og}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/barlow-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload ? `<link rel="preload" as="image" href="/assets/img/${preload}-960.webp" imagesrcset="${IMAGES[preload].sizes.map((w) => `/assets/img/${preload}-${w}.webp ${w}w`).join(', ')}" imagesizes="(max-width: 980px) 100vw, 520px" fetchpriority="high">\n` : ''}<link rel="stylesheet" href="/style.css">
<script type="application/ld+json">
${graph}
</script>
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

${header({ home })}

<main id="main">
${body}
${contactSection(pageService(path), place)}
</main>

${footer({ home })}

<script src="/script.js" defer></script>
</body>
</html>
`;
}
// Which service to pre-select in the booking form for a given path.
function pageService(path) {
  const m = path.match(/\/(services|areas\/[^/]+)\/([^/]+)\/$/);
  return m && svcBy[m[2]] ? m[2] : null;
}

let generated = 0;
function write(path, html, priority = '0.6', indexed = true) {
  const dir = join(ROOT, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  generated++;
  if (indexed) pages.push({ path, priority }); // only indexable pages go in the sitemap
}
const isIndexedCombo = (a, s) => INDEXED_COMBOS.services.includes(s.slug) && INDEXED_COMBOS.areas.includes(a.slug);


// ---------- guides (blog) ----------
const guideUrl = (g) => `/guides/${g.slug}/`;
const guideBy = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
// escape text, then turn [[text|/url/]] into internal links
const rich = (t) => esc(t).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, txt, url) => `<a href="${url}">${txt}</a>`);
const plain = (t) => t.replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1');
const fmtDate = (d) => new Date(d + 'T12:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function guideCard(g) {
  return `          <article class="guide-card">
            <a href="${guideUrl(g)}" class="guide-card-media" tabindex="-1" aria-hidden="true">${photoBox(g.photo, '', ' guide-photo', { sizes: '(max-width: 560px) 92vw, (max-width: 1100px) 45vw, 360px' })}</a>
            <div class="guide-card-body">
              <h3><a href="${guideUrl(g)}">${esc(g.title)}</a></h3>
              <p>${esc(g.excerpt)}</p>
              <a href="${guideUrl(g)}" class="service-link">Read the guide<span class="sr-only">: ${esc(g.title)}</span> ${ARROW}</a>
            </div>
          </article>`;
}

function guideLinks(list, heading) {
  if (!list.length) return '';
  return `  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        ${chip('Guides')}
        <h2>${heading}</h2>
      </div>
      <div class="guide-grid">
${list.slice(0, 3).map(guideCard).join('\n')}
      </div>
    </div>
  </section>`;
}

function guidePage(g) {
  const path = guideUrl(g);
  const crumbs = [['Home', '/'], ['Guides', '/guides/'], [g.title, path]];
  const svcs = g.services.map((x) => svcBy[x]);
  const others = GUIDES.filter((o) => o !== g).sort((a, b) => b.services.filter((x) => g.services.includes(x)).length - a.services.filter((x) => g.services.includes(x)).length).slice(0, 3);
  const section = (sec) => `        <h2>${esc(sec.h2)}</h2>
${(sec.paras || []).map((p) => `        <p>${rich(p)}</p>`).join('\n')}
${sec.list ? `        <ul class="guide-list">\n${sec.list.map((li) => `          <li>${rich(li)}</li>`).join('\n')}\n        </ul>` : ''}
${sec.table ? `        <table class="guide-table"><tbody>\n${sec.table.map(([a, b]) => `          <tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('\n')}\n        </tbody></table>` : ''}
${(sec.after || []).map((p) => `        <p>${rich(p)}</p>`).join('\n')}`;
  const body = `${pageHero({ crumbs, title: esc(g.title), benefit: esc(g.benefit), lead: esc(g.excerpt), photo: g.photo, photoAlt: g.photoAlt, eyebrow: 'Edinburgh plumbing guide' })}

  <section class="section">
    <div class="container guide-layout">
      <article class="guide-body">
        <p class="guide-meta">By Dunedin Plumbing &amp; Heating · Updated <time datetime="${g.published}">${fmtDate(g.published)}</time></p>
        <aside class="guide-keypoints" aria-label="Key points">
          <p class="guide-keypoints-title">The short version</p>
          <ul>
${g.keyPoints.map((k) => `            <li>${icon('check')}<span>${rich(k)}</span></li>`).join('\n')}
          </ul>
        </aside>
${g.sections.map(section).join('\n')}
      </article>
      <aside class="guide-side">
        <div class="guide-side-card">
          <p class="guide-side-title">Need a hand with this?</p>
          <p>Local Edinburgh plumber, 24/7 for emergencies. Price agreed before we start.</p>
          <a href="tel:${SITE.phoneIntl}" class="btn btn-primary">${icon('phone')}<span>${SITE.phone}</span></a>
          <a href="#contact" class="btn btn-outline">Book a callback</a>
          <p class="guide-side-sub">Related services</p>
          <ul>
${svcs.map((x) => `            <li><a href="${svcUrl(x)}">${esc(x.name)}</a></li>`).join('\n')}
          </ul>
        </div>
      </aside>
    </div>
  </section>

${faqSection(g.faqs, `${esc(g.title.replace(/\?$/, ''))}: Common Questions`)}

${emergency()}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('Services')}
        <h2>The Services This Guide Relates To</h2>
      </div>
      <div class="card-grid card-grid-3">
${svcs.map((x) => svcCard(x, svcUrl(x), undefined, 'Edinburgh')).join('\n')}
      </div>
    </div>
  </section>

${guideLinks(others, 'More Plumbing Guides for Edinburgh Homes')}`;
  const schema = [
    businessNode(),
    {
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      image: SITE.url + largest(g.photo),
      datePublished: g.published,
      dateModified: g.published,
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: { '@id': `${SITE.url}/#business` },
      mainEntityOfPage: SITE.url + path,
      about: svcs.map((x) => ({ '@type': 'Service', name: x.name })),
    },
    faqSchema(g.faqs),
    breadcrumbSchema(crumbs),
  ];
  const [primary, k1, k2, k3] = g.kw;
  write(path, shell({ path, title: metaTitle(primary, 'Edinburgh', k1, k2, k3), description: trim(g.description), body, schema, preload: g.photo, ogImage: largest(g.photo) }), '0.7');
}

function guidesIndex() {
  const path = '/guides/';
  const crumbs = [['Home', '/'], ['Guides', path]];
  const body = `${pageHero({ crumbs, title: 'Plumbing Guides for Edinburgh Homes', benefit: 'Straight Answers From a Local Plumber', lead: 'Practical advice for Edinburgh tenements, flats and houses — what to do in an emergency, what things cost, and when it’s worth calling a plumber.', photo: 'copper-supply-valves', photoAlt: 'Copper water pipes with isolation valves', eyebrow: 'Guides' })}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('All guides')}
        <h2>Edinburgh Plumbing Advice, Costs &amp; Emergency Help</h2>
      </div>
      <div class="guide-grid">
${GUIDES.map(guideCard).join('\n')}
      </div>
    </div>
  </section>

${emergency()}`;
  const schema = [
    businessNode(),
    { '@type': 'CollectionPage', name: 'Plumbing Guides for Edinburgh Homes', url: SITE.url + path, hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: g.title, url: SITE.url + guideUrl(g) })) },
    breadcrumbSchema(crumbs),
  ];
  write(path, shell({ path, title: metaTitle('Plumbing Advice', 'Edinburgh', 'emergency plumbing', 'leak repair', 'bathroom renovation'), description: trim('Practical plumbing guides for Edinburgh homes: burst pipes, stopcocks, tenement leaks, lead pipes, low water pressure and what bathrooms and emergency plumbers cost.'), body, schema, preload: 'copper-supply-valves' }), '0.7');
}

// ---------- page builders ----------
function servicePage(s) {
  const path = svcUrl(s);
  const crumbs = [['Home', '/'], ['Services', '/services/'], [s.name, path]];
  const hasGallery = !!s.gallery;
  const relatedSvcs = s.related.map((r) => svcBy[r]);
  const body = `${pageHero({ crumbs, title: esc(s.name) + ' in Edinburgh', benefit: esc(s.benefit), lead: esc(s.intro), photo: s.heroPhoto || s.photo, photoAlt: s.heroAlt || s.photoAlt, eyebrow: 'Edinburgh, the Lothians &amp; Fife' })}

${TRUST_BAR}

  <section class="section">
    <div class="container split-2">
      <div>
        ${chip("What's included")}
        <h2>${esc(s.name)} in Edinburgh — What’s Included</h2>
        ${s.body.map((p) => `<p class="body-copy">${esc(p)}</p>`).join('\n        ')}
      </div>
      <ul class="includes-list">
        ${s.includes.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('\n        ')}
      </ul>
    </div>
  </section>
${hasGallery ? `
  <section class="section section-alt" id="gallery">
    <div class="container">
      <div class="section-head">
        ${chip('Our work')}
        <h2>${s.slug === 'bathroom-renovations' ? 'Bathroom Renovations We’ve Completed in Edinburgh' : `Recent ${esc(s.name)} Jobs in Edinburgh`}</h2>
        <p class="section-lead">Real photos from real Dunedin jobs — tap any photo to see it larger.</p>
      </div>
${galleryBlock(s.gallery, s.slug)}
    </div>
  </section>
` : ''}
${stepsSection(`How Our ${esc(s.name)} Service Works — Price Agreed First`)}

${reviewCards(s.reviews, `Rated ${SITE.rating} on Google by Edinburgh Customers`)}

${faqSection(s.faqs, `${esc(s.name)} in Edinburgh: Your Questions Answered`)}

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        ${chip('Areas')}
        <h2>${esc(s.name)} Across Edinburgh, the Lothians &amp; Fife</h2>
        <p class="section-lead">We cover Edinburgh, the Lothians and Fife. Pick your area for local details.</p>
      </div>
      ${areaPills(AREAS, (a) => comboUrl(a, s))}
    </div>
  </section>

${guideLinks(GUIDES.filter((g) => g.services.includes(s.slug)), `Helpful ${esc(s.name)} Guides for Edinburgh Homes`)}

${emergency()}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('Related')}
        <h2>Related Plumbing Services in Edinburgh</h2>
      </div>
      <div class="card-grid card-grid-3">
${relatedSvcs.map((r) => svcCard(r, svcUrl(r), undefined, 'Edinburgh')).join('\n')}
      </div>
    </div>
  </section>`;
  const schema = [
    businessNode({ areaServed: AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, ${a.region}` })) }),
    { '@type': 'Service', name: s.name, serviceType: s.name, description: s.intro, provider: { '@id': `${SITE.url}/#business` }, areaServed: { '@type': 'City', name: 'Edinburgh' }, url: SITE.url + path, image: SITE.url + largest(s.photo) },
    faqSchema(s.faqs),
    breadcrumbSchema(crumbs),
  ];
  write(path, shell({ path, title: metaTitle(s.name, 'Edinburgh', s.kw, kwOf(s.related[0]), kwOf(s.related[1])), description: trim(`${s.name} in Edinburgh from a 5-star rated local plumber. ${s.short} Call ${SITE.phone}.`), body, schema, preload: s.heroPhoto || s.photo, ogImage: largest(s.heroPhoto || s.photo) }), '0.9');
}

function servicesIndex() {
  const path = '/services/';
  const crumbs = [['Home', '/'], ['Services', path]];
  const body = `${pageHero({ crumbs, title: 'Plumbing Services in Edinburgh', benefit: 'Fixed Prices, 24/7 Emergency Cover', lead: 'Everything from a dripping tap to a full bathroom renovation — priced before we start, done by the same named plumber, and left tidy.', photo: 'shower-room-8', photoAlt: 'Walk-in shower with black-framed doors and marble-effect wall panels', eyebrow: 'What we do' })}

${TRUST_BAR}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('Services')}
        <h2>Every Plumbing Service We Offer in Edinburgh</h2>
      </div>
      <div class="card-grid card-grid-4">
${SERVICES.map((s) => svcCard(s)).join('\n')}
      </div>
    </div>
  </section>

${emergency()}`;
  const schema = [businessNode(), breadcrumbSchema(crumbs)];
  write(path, shell({ path, title: metaTitle('Plumbing Services', 'Edinburgh', 'emergency plumbing', 'leak repair', 'bathroom renovation'), description: trim(`Emergency plumbing, leak repairs, bathroom renovations, kitchens, radiators, drains and more across Edinburgh and the Lothians. 5.0★ from ${SITE.reviewCount} Google reviews.`), body, schema, preload: 'shower-room-8' }), '0.8');
}

function areaHub(a) {
  const path = areaUrl(a);
  const crumbs = [['Home', '/'], ['Areas', '/areas/'], [a.name, path]];
  const near = a.nearby.map((n) => areaBy[n]);
  const pickPhoto = ['bath-scallop-3', 'shower-room-8', 'bath-marble-2', 'bath-freestanding', 'radiator-column', 'kitchen-belfast-sink'][hash(a.slug) % 6];
  const faqs = [
    [`Do you cover all of ${a.name}?`, `Yes — ${a.postcodes} and the streets around ${a.landmarks}. We're also regularly in ${near.map((n) => n.name).join(', ')}.`],
    [`How quickly can you get to ${a.name}?`, `Most jobs in ${a.name} are booked same-day or next-day, and genuine emergencies are answered 24 hours a day.`],
    [`Do you charge extra to come to ${a.name}?`, `You'll get a clear price before any work starts — the same upfront pricing we use everywhere we cover.`],
  ];
  const reviewNames = [...new Set([...SERVICES[hash(a.slug) % SERVICES.length].reviews, 'Margaret Miller', 'Graham Steele'])].slice(0, 3);
  const body = `${pageHero({ crumbs, title: `Plumber in ${esc(a.name)}`, benefit: 'Fixed Prices &amp; 24/7 Emergency Cover', lead: esc(a.intro), photo: pickPhoto, photoAlt: 'A recent Dunedin Plumbing & Heating job', eyebrow: `${esc(a.name)}, ${esc(a.region)} · ${esc(a.postcodes)}` })}

${TRUST_BAR}

  <section class="section">
    <div class="container split-2">
      <div>
        ${chip(`Plumbing in ${esc(a.name)}`)}
        <h2>A Local ${esc(a.name)} Plumber Who Knows Your Home</h2>
        <p class="body-copy">${esc(a.local)}</p>
        <p class="body-copy">Whatever’s behind your walls, you get the same thing: the problem explained in plain English, a price agreed before any work starts, and the same named plumber if you ever need us again.</p>
      </div>
      <ul class="includes-list">
        <li>${icon('check')}<span>Covering ${esc(a.postcodes)} — ${esc(a.landmarks)}</span></li>
        <li>${icon('check')}<span>24-hour emergency call-outs</span></li>
        <li>${icon('check')}<span>Same-day or next-day for most jobs</span></li>
        <li>${icon('check')}<span>Fixed price agreed before we start</span></li>
        <li>${icon('check')}<span>Shoe covers on, mess cleared away</span></li>
        <li>${icon('check')}<span>${SITE.rating}★ from ${SITE.reviewCount} Google reviews</span></li>
      </ul>
    </div>
  </section>

  <section class="section section-alt" id="services">
    <div class="container">
      <div class="section-head">
        ${chip(`Services in ${esc(a.name)}`)}
        <h2>Plumbing Services in ${esc(a.name)}</h2>
        <p class="section-lead">Everything from a dripping tap to a full bathroom renovation — priced before we start.</p>
      </div>
      <div class="card-grid card-grid-4">
${SERVICES.map((s) => svcCard(s, comboUrl(a, s), undefined, a.name)).join('\n')}
      </div>
    </div>
  </section>

${reviewCards(reviewNames)}

${faqSection(faqs, `Plumbing in ${esc(a.name)}: Your Questions Answered`)}

${emergency(a.name)}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip('Nearby')}
        <h2>We Also Cover Areas Near ${esc(a.name)}</h2>
      </div>
      ${areaPills(near, areaUrl)}
      <p class="areas-note"><a href="/areas/">See every area we cover →</a></p>
    </div>
  </section>`;
  const schema = [
    businessNode({ areaServed: { '@type': 'Place', name: `${a.name}, ${a.region}` } }),
    faqSchema(faqs),
    breadcrumbSchema(crumbs),
  ];
  write(path, shell({ place: a.name, path, title: metaTitle('Plumber', a.name, 'plumbing', 'emergency plumbing', 'leak repair'), description: trim(`Trusted local plumber in ${a.name}, ${a.region}. Emergency call-outs 24/7, leak repairs, bathrooms, kitchens and radiators. 5.0★ from ${SITE.reviewCount} Google reviews. Call ${SITE.phone}.`), body, schema, preload: pickPhoto }), '0.8');
}

function areasIndex() {
  const path = '/areas/';
  const crumbs = [['Home', '/'], ['Areas', path]];
  const regions = [...new Set(AREAS.map((a) => a.region))];
  const body = `${pageHero({ crumbs, title: 'Areas We Cover', benefit: 'Edinburgh, the Lothians &amp; Fife', lead: 'Edinburgh, the Lothians and Fife — the same named plumber, the same upfront pricing and the same 24-hour emergency cover wherever you are.', photo: 'bath-scallop-1', photoAlt: 'Renovated bathroom with white scallop wall tiles', eyebrow: 'Coverage' })}

${TRUST_BAR}

  <section class="section">
    <div class="container">
${regions.map((r) => `      <div class="area-region">
        <h2>Plumbers in ${esc(r)}</h2>
        <div class="area-cards">
${AREAS.filter((a) => a.region === r).map((a) => `          <a class="area-card" href="${areaUrl(a)}">
            <span class="area-card-icon" aria-hidden="true">${icon('pin')}</span>
            <span class="area-card-text"><strong>${esc(a.name)}</strong><span>${esc(a.postcodes)}</span></span>
            ${ARROW}
          </a>`).join('\n')}
        </div>
      </div>`).join('\n')}
      <p class="areas-note">Not listed? We cover most of Edinburgh, the Lothians and south Fife — <a href="tel:${SITE.phoneIntl}">call ${SITE.phone}</a> and ask.</p>
    </div>
  </section>

${emergency()}`;
  const schema = [businessNode({ areaServed: AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, ${a.region}` })) }), breadcrumbSchema(crumbs)];
  write(path, shell({ path, title: metaTitle('Plumbers', 'Edinburgh, the Lothians & Fife', 'plumbing', 'emergency plumbing', 'bathroom renovation'), description: trim(`Local plumber covering ${AREAS.slice(0, 8).map((a) => a.name).join(', ')} and more across Edinburgh and the Lothians. 24/7 emergency call-outs.`), body, schema, preload: 'bath-scallop-1' }), '0.7');
}

function comboPage(a, s) {
  const path = comboUrl(a, s);
  const crumbs = [['Home', '/'], ['Areas', '/areas/'], [a.name, areaUrl(a)], [s.name, path]];
  const near = a.nearby.map((n) => areaBy[n]);
  const t1 = a.types[0], t2 = a.types[1];
  const review = s.reviews[hash(a.slug + s.slug) % s.reviews.length];
  const second = s.reviews.find((r) => r !== review);
  const faqs = [
    s.localFaq(a),
    [`Do you cover all of ${a.name}?`, `Yes — ${a.postcodes} and the streets around ${a.landmarks}. We also cover ${near.slice(0, 3).map((n) => n.name).join(', ')} and ${near[3].name}.`],
    s.faqs[hash(a.slug) % s.faqs.length],
  ];
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const body = `${pageHero({ crumbs, title: `${esc(s.name)} in ${esc(a.name)}`, benefit: esc(s.benefit), lead: esc(s.lead(a)), photo: s.photo, photoAlt: s.photoAlt, eyebrow: `${esc(a.name)} · ${esc(a.postcodes)}` })}

${TRUST_BAR}

  <section class="section">
    <div class="container split-2">
      <div>
        ${chip(`${esc(s.name)} in ${esc(a.name)}`)}
        <h2>${esc(s.name)} for ${esc(a.name)}’s ${TYPE_LABEL[t1]}</h2>
        <p class="body-copy">${esc(a.local)}</p>
        <p class="body-copy">${esc(s.angle[t1])}</p>
        ${t2 && t2 !== t1 ? `<p class="body-copy">${esc(s.angle[t2])}</p>` : ''}
      </div>
      <div>
        <h3 class="list-title">What’s included in ${esc(a.name)}</h3>
        <ul class="includes-list">
          ${s.includes.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('\n          ')}
        </ul>
        <a href="${svcUrl(s)}" class="text-link">More about ${esc(s.name)} ${ARROW}</a>
      </div>
    </div>
  </section>

${reviewCards([review, second].filter(Boolean))}

${faqSection(faqs, `${esc(s.name)} in ${esc(a.name)}: Your Questions Answered`)}

${emergency(a.name)}

  <section class="section">
    <div class="container">
      <div class="section-head">
        ${chip(`More in ${esc(a.name)}`)}
        <h2>More Plumbing Services in ${esc(a.name)}</h2>
      </div>
      <div class="link-grid">
        ${others.map((x) => `<a href="${comboUrl(a, x)}" class="link-card"><span class="link-card-icon" aria-hidden="true">${icon(x.icon)}</span><span>${esc(x.name)} in ${esc(a.name)}</span>${ARROW}</a>`).join('\n        ')}
      </div>
      <h2 class="list-title near-title">${esc(s.name)} Near ${esc(a.name)}</h2>
      ${areaPills(near, (n) => comboUrl(n, s))}
      <p class="areas-note"><a href="${areaUrl(a)}">All plumbing services in ${esc(a.name)} →</a></p>
    </div>
  </section>`;
  const schema = [
    businessNode(),
    { '@type': 'Service', name: `${s.name} in ${a.name}`, serviceType: s.name, provider: { '@id': `${SITE.url}/#business` }, areaServed: { '@type': 'Place', name: `${a.name}, ${a.region}`, address: { '@type': 'PostalAddress', addressLocality: a.name, addressRegion: a.region, addressCountry: 'GB' } }, url: SITE.url + path },
    faqSchema(faqs),
    breadcrumbSchema(crumbs),
  ];
  write(path, shell({ place: a.name, path, title: metaTitle(s.name, a.name, s.kw, kwOf(s.related[0]), kwOf(s.related[1])), description: trim(`${s.name} in ${a.name} (${a.postcodes}) from a 5-star rated local plumber. ${s.short} Call ${SITE.phone}.`), body, schema, preload: s.photo, ogImage: largest(s.photo), noindex: !isIndexedCombo(a, s) }), '0.6', isIndexedCombo(a, s));
}

// ---------- About page ----------
function aboutPage() {
  const path = '/about/';
  const crumbs = [['Home', '/'], ['About', path]];
  const featured = ['emergency-plumbing', 'bathroom-renovations', 'leak-repair'].map((x) => svcBy[x]);
  const stories = [
    ['Margaret Miller', 'bath-scallop-1', 'Reliable, on time, never overcharges'],
    ['Gabriela Popova', 'copper-supply-valves', 'At our door within the hour'],
    ['Margaret Mckay', 'shower-room-8', 'A very professional bathroom refit'],
    ['Andrew Jamieson', 'radiator-column', 'First-class service, every time'],
  ];
  const pricing = [
    ['Emergency call-outs', 'Made safe first — price agreed before the permanent fix', 'emergency-plumbing'],
    ['Bathroom renovations', 'One fixed price after we’ve seen the room', 'bathroom-renovations'],
    ['Leaks, taps and repairs', 'A straight price on the first call for most jobs', 'leak-repair'],
  ];
  const body = `  <section class="section about-intro">
    <div class="container">
      ${breadcrumb(crumbs).replace('class="breadcrumb"', 'class="breadcrumb on-light"')}
      ${chip('Our story')}
      <h1 class="about-h1">About Dunedin Plumbing &amp; Heating<span class="h1-benefit"><span class="sr-only"> — </span>Edinburgh’s Honest, Local Plumber</span></h1>
      ${photoBox('kitchen-sink-fitting', 'Belfast sink being fitted between new kitchen units by Dunedin Plumbing & Heating', ' about-banner', { eager: true, sizes: '(max-width: 1200px) 100vw, 1160px' })}
    </div>
  </section>

  <section class="section about-story">
    <div class="container about-story-grid">
      <h2 class="story-h2"><span class="chip-icon" aria-hidden="true">${icon('drip')}</span>Our Story: An Edinburgh Plumber Built on Repeat Customers</h2>
      <div>
        <p class="about-statement">At Dunedin Plumbing &amp; Heating, we fix leaks, refit bathrooms and keep heating running across Edinburgh, the Lothians and Fife. <span>Every job gets the same thing: a named plumber who turns up, explains the problem straight, and agrees the price before a single tool comes out.</span></p>
        <p class="body-copy">We didn’t grow by advertising — we grew because people who used us once called us again, for the next tap, the next radiator, the next renovation. Landlords trust us with their properties, families call us at 11pm when a pipe bursts, and neighbours pass our number along. That’s the whole model, and we protect it on every job.</p>
      </div>
    </div>
    <div class="container stagger-cards">
      <div class="stagger-card is-accent"><span class="stagger-icon">${icon('bolt')}</span><h3>Fast response</h3><p>Same-day for most jobs, 24/7 for genuine emergencies.</p></div>
      <div class="stagger-card"><span class="stagger-icon">${icon('pin')}</span><h3>A named plumber</h3><p>Kevin and the team — never a call centre or a stranger.</p></div>
      <div class="stagger-card"><span class="stagger-icon">${icon('check')}</span><h3>Price agreed first</h3><p>You know the cost before work starts. No surprises on the bill.</p></div>
      <div class="stagger-card"><span class="stagger-icon">${icon('drip')}</span><h3>${SITE.rating}★ on Google</h3><p>${SITE.reviewCount} five-star reviews from Edinburgh customers.</p></div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container about-split">
      <div class="about-media">${photoBox('shower-room-7', 'Black-framed shower enclosure and vanity in a Dunedin bathroom renovation', ' about-photo', { sizes: '(max-width: 980px) 100vw, 560px' })}</div>
      <div class="about-copy">
        ${chip('Our mission')}
        <h2>Plumbing Done Properly, Priced Honestly — Every Time</h2>
        <p class="body-copy">To be the Edinburgh plumber people recommend without thinking twice: on time, clear about the options, tidy in your home, and still reachable long after the invoice is paid.</p>
        <ul class="check-list">
          <li>${icon('check')}<span>Turn up when we say we will</span></li>
          <li>${icon('check')}<span>Explain the problem in plain English</span></li>
          <li>${icon('check')}<span>Agree one price before work starts</span></li>
          <li>${icon('check')}<span>Leave your home as we found it</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container what-grid">
      <div>
        ${chip('What we do')}
        <h2>Plumbing and Heating Across Edinburgh, the Lothians &amp; Fife</h2>
        <p class="body-copy">Eleven services, one standard — from a dripping tap to a full bathroom renovation.</p>
        <a href="/services/" class="btn btn-outline">Explore all services ${ARROW}</a>
      </div>
      <div class="what-cards">
${featured.map((x, i) => `        <a class="what-card${i === 1 ? ' is-accent' : ''}" href="${svcUrl(x)}">
          <span class="stagger-icon">${icon(x.icon)}</span>
          <span class="what-text"><strong>${esc(x.name)}</strong><span>${esc(x.short)}</span></span>
          <span class="what-arrow">${ARROW}</span>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head section-head-split">
        <div>
          ${chip('Honest pricing')}
          <h2>Pricing That Matches Our Promise</h2>
        </div>
        <a href="#contact" class="btn btn-outline">Get a price ${ARROW}</a>
      </div>
      <div class="price-grid">
        <div class="price-rows">
${pricing.map(([t, d, slug], i) => `          <a class="price-row${i === 0 ? ' is-accent' : ''}" href="${svcUrl(svcBy[slug])}">
            <strong>${esc(t)}</strong><span>${esc(d)}</span><span class="what-arrow">${ARROW}</span>
          </a>`).join('\n')}
        </div>
        ${photoBox('kitchen-water-heater', 'Neatly plumbed under-sink water heater and filter in a kitchen cupboard', ' price-photo', { sizes: '(max-width: 980px) 100vw, 300px' })}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head" style="text-align:left;margin-left:0">
        ${chip('Our values')}
        <h2>Built on Honest Work, Job After Job</h2>
      </div>
      <div class="values-grid">
        <div class="value-card is-accent"><span class="value-num">01.</span><h3>Honesty</h3><p>We tell you what actually needs doing — and what can wait. No scare tactics, no upsell, no invented extras.</p></div>
        <div class="value-card"><span class="value-num">02.</span><h3>Quality</h3><p>Proper materials, proper fittings and work that’s still standing years later — on a ten-minute tap fix or a full refit.</p></div>
        <div class="value-card"><span class="value-num">03.</span><h3>Accountability</h3><p>Same named plumber, same phone number. If something isn’t right after we’ve gone, you call us, not a stranger.</p></div>
      </div>
    </div>
  </section>

  <section class="section section-alt" id="reviews">
    <div class="container">
      <div class="section-head">
        ${chip('Client feedback')}
        <h2>What Edinburgh Customers Say About Kevin</h2>
      </div>
      <div class="carousel story-carousel" data-carousel>
        <div class="carousel-track" role="list" aria-label="Customer stories">
${stories.map(([n, photo, headline]) => `          <div class="story-card" role="listitem">
            ${photoBox(photo, 'A Dunedin Plumbing & Heating job', ' story-photo', { sizes: '(max-width: 780px) 100vw, 460px' })}
            <div class="story-body">
              <p class="story-label">Google review · <span class="stars" aria-hidden="true">★★★★★</span><span class="sr-only">5 out of 5 stars</span></p>
              <p class="story-headline">“${esc(headline)}”</p>
              <p class="story-quote">“${esc(REVIEWS[n])}”</p>
              <p class="story-name">${esc(n)}</p>
            </div>
          </div>`).join('\n')}
        </div>
        <div class="carousel-controls">
          <button type="button" class="carousel-btn carousel-prev" aria-label="Previous story"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <div class="carousel-dots" aria-hidden="true"></div>
          <button type="button" class="carousel-btn carousel-next" aria-label="Next story"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner">
    ${img('bath-marble-2', '', { sizes: '100vw', cls: 'cta-bg' }).replace('alt=""', 'alt="" aria-hidden="true"')}
    <div class="container cta-inner">
      <div>
        ${chip('Get in touch', true)}
        <h2>Need a Plumber in Edinburgh? We’re Ready to Help.</h2>
      </div>
      <a href="#contact" class="btn btn-primary btn-lg">Book a Callback ${ARROW}</a>
    </div>
  </section>`;
  const schema = [
    businessNode(),
    { '@type': 'AboutPage', name: 'About Dunedin Plumbing & Heating', url: SITE.url + path, about: { '@id': `${SITE.url}/#business` } },
    breadcrumbSchema(crumbs),
  ];
  write(path, shell({ path, title: metaTitle('Local Plumber', 'Edinburgh', 'plumbing', 'leak repair', 'radiator repair'), description: trim(`About Dunedin Plumbing & Heating: a named, local Edinburgh plumber with ${SITE.reviewCount} five-star Google reviews. On time, price agreed before we start, 24/7 emergencies. Call ${SITE.phone}.`), body, schema, preload: 'kitchen-sink-fitting' }), '0.7');
}

// ---------- homepage / 404 sections ----------
function homeServices() {
  return `<!-- gen:services -->
  <section class="section" id="services">
    <div class="container">
      <div class="section-head section-head-split">
        <div>
          ${chip('Plumbing services')}
          <h2>Plumbing Services in Edinburgh, the Lothians &amp; Fife</h2>
        </div>
        <a href="/services/" class="btn btn-outline">All services ${ARROW}</a>
      </div>

      <div class="carousel" data-carousel>
        <div class="carousel-track" role="list" aria-label="Our services">
${SERVICES.map((s) => svcCard(s).replace('<article class="svc-card">', '<div class="svc-card" role="listitem">').replace(/<\/article>$/, '</div>')).join('\n')}
        </div>
        <div class="carousel-controls">
          <button type="button" class="carousel-btn carousel-prev" aria-label="Previous services"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <div class="carousel-dots" aria-hidden="true"></div>
          <button type="button" class="carousel-btn carousel-next" aria-label="More services"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>
    </div>
  </section>
  <!-- /gen:services -->`;
}

function homeWork() {
  const picks = [['bath-scallop-1', 'Scallop-tile bathroom'], ['shower-room-8', 'Walk-in shower room'], ['bath-freestanding', 'Freestanding bath'], ['bath-marble-2', 'Marble-effect wet-wall bathroom'], ['kitchen-belfast-sink', 'Belfast sink in an oak worktop'], ['radiator-column', 'Column radiator']];
  return `<!-- gen:work -->
  <section class="section">
    <div class="container">
      <div class="section-head section-head-split">
        <div>
          ${chip('Recent work')}
          <h2>Recent Bathroom &amp; Plumbing Jobs in Edinburgh</h2>
        </div>
        <a href="/services/bathroom-renovations/#gallery" class="btn btn-outline">See the bathroom gallery ${ARROW}</a>
      </div>
      <div class="work-grid">
${picks.map(([n, cap]) => `        <a class="photo-item work-item" href="${largest(n)}" data-lightbox="home-work" data-caption="${esc(cap)}">
          ${img(n, cap, { sizes: '(max-width: 560px) 50vw, (max-width: 980px) 33vw, 380px' })}
          <span class="work-cap" aria-hidden="true">${esc(cap)}</span>
        </a>`).join('\n')}
      </div>
    </div>
  </section>
  <!-- /gen:work -->`;
}

function homeAreas() {
  return `<!-- gen:areas -->
  <section class="section" id="areas">
    <div class="container areas-inner">
      <div class="section-head">
        ${chip('Coverage')}
        <h2>Covering Edinburgh, the Lothians &amp; Fife</h2>
        <p class="section-lead">From Old Town closes and New Town townhouses to Musselburgh, Dunfermline and Kirkcaldy — the same named plumber and the same upfront pricing wherever you are.</p>
      </div>
      ${areaPills(AREAS, areaUrl)}
      <p class="areas-note">Not listed? We cover most of Edinburgh, the Lothians and south Fife — just give us a call.</p>
    </div>
  </section>
  <!-- /gen:areas -->`;
}

function replaceBlock(html, name, content, file) {
  const re = new RegExp(`<!-- gen:${name} -->[\\s\\S]*?<!-- /gen:${name} -->`);
  if (!re.test(html)) throw new Error(`Marker gen:${name} missing in ${file}`);
  return html.replace(re, () => content.trim());
}

function refreshStatic(file, blocks) {
  const p = join(ROOT, file);
  let html = readFileSync(p, 'utf8');
  for (const [name, content] of Object.entries(blocks)) html = replaceBlock(html, name, content, file);
  writeFileSync(p, html);
}

// ---------- run ----------
// Clear previously generated area/service folders (keeps nothing stale).
for (const dir of ['services', 'areas']) {
  const full = join(ROOT, dir);
  if (existsSync(full)) rmSync(full, { recursive: true, force: true });
}

pages.push({ path: '/', priority: '1.0' });
servicesIndex();
SERVICES.forEach(servicePage);
areasIndex();
aboutPage();
AREAS.forEach(areaHub);
AREAS.forEach((a) => SERVICES.forEach((s) => comboPage(a, s)));
guidesIndex();
GUIDES.forEach(guidePage);

refreshStatic('index.html', { header: header({ home: true }), services: homeServices(), work: homeWork(), areas: homeAreas(), contact: contactSection(null), footer: footer({ home: true }) });
refreshStatic('404.html', { header: header({ contact: '/#contact' }), footer: footer({ contact: '/#contact' }) });

writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${TODAY}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`);

// Redirects and headers live in vercel.json.

console.log(`Generated ${generated} pages, ${pages.length} indexed/in sitemap (${SERVICES.length} services × ${AREAS.length} areas).`);
