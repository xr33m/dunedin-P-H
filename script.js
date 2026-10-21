// Dunedin Plumbing & Heating — site scripts
// Small, dependency-free enhancements: mobile nav, sticky header shadow,
// back-to-top button, and a no-backend contact form handler.

// Google Ads conversion tracking (tag loaded in each page <head>).
// Paste each conversion action's label from Google Ads (the part after the slash
// in 'AW-16755258544/xxxx'). Empty labels are skipped, so nothing breaks before then.
const ADS_ID = 'AW-16755258544';
const ADS_LABELS = { lead: 'dsLgCKG40voZELDpw7U-', call: 'NLwNCMux1aQdELDpw7U-' };

function trackConversion(kind, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', kind === 'call' ? 'phone_call_click' : 'generate_lead', params);
  if (ADS_LABELS[kind]) window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${ADS_LABELS[kind]}`, ...params });
}

function initCallTracking() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="tel:"]');
    if (link) trackConversion('call', { link_url: link.getAttribute('href') });
  });
}

const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initSmoothAnchorClose();
  initBackToTop();
  initContactForm();
  initQuickForm();
  initCarousels();
  initScrollReveal();
  initCounters();
  initScrollspy();
  initHeroParallax();
  initSubmenus();
  initLightbox();
  initCallTracking();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  const setOpen = (isOpen, { returnFocus = false } = {}) => {
    nav.classList.toggle('is-open', isOpen);
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (isOpen) {
      const first = nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Escape closes the menu and puts focus back on the toggle.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false, { returnFocus: true });
    }
  });

  // Close when focus or a click leaves the open menu.
  document.addEventListener('click', (event) => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });
}

function initSmoothAnchorClose() {
  // Close the mobile menu after a nav link is tapped.
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  if (!nav) return;

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      if (toggle) {
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  });
}

function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------------------------------------------------------------------------
// Lead delivery, shared by the main booking form and the hero quick bar.
// Endpoint lives on #contactForm's data-endpoint (see README). Returns 'sent'
// when the webhook accepted it, 'mailto' when we fell back to the email app.
const BUSINESS_EMAIL = 'dunedinph@gmail.com';

function leadEndpoint() {
  const form = document.getElementById('contactForm');
  return form ? (form.dataset.endpoint || '').trim() : '';
}

async function deliverLead(data) {
  const endpoint = leadEndpoint();
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return 'sent';
    } catch (err) { /* fall through to email */ }
  }
  const when = data.day === 'Another day' ? data.date : data.day;
  const subject = encodeURIComponent(`Callback request: ${data.service} (${data.urgency})`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || 'Not provided'}\nPostcode: ${data.postcode || 'Not provided'}\n` +
    `Urgency: ${data.urgency}\nService: ${data.service}\nCall back: ${when}, ${data.time}\n\nDetails:\n${data.message || 'Not provided'}`
  );
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  return 'mailto';
}

function phoneLooksValid(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  // Where callback requests are sent. Set data-endpoint="" on the form to a
  // webhook URL (e.g. a Make.com webhook that texts/emails Kevin). While it's
  // empty, the form falls back to opening the visitor's email app, pre-filled.

  const success = document.getElementById('formSuccess');
  const successText = document.getElementById('formSuccessText');
  const callout = document.getElementById('emergencyCallout');
  const dateRow = document.getElementById('dateRow');
  const dateInput = document.getElementById('callbackDate');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Dates: nothing in the past.
  if (dateInput) {
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = iso;
  }

  const value = (name) => {
    const el = form.elements[name];
    return el ? String(el.value || '').trim() : '';
  };

  const syncConditional = () => {
    if (callout) callout.hidden = !value('urgency').startsWith('Emergency');
    if (dateRow) {
      const pickDate = value('day') === 'Another day';
      dateRow.hidden = !pickDate;
      if (dateInput) dateInput.required = pickDate;
    }
  };
  form.addEventListener('change', syncConditional);
  syncConditional();

  form.addEventListener('input', (event) => {
    if (event.target.getAttribute('aria-invalid') === 'true' && event.target.value.trim()) {
      event.target.setAttribute('aria-invalid', 'false');
    }
  });

  const setError = (message, field) => {
    note.textContent = message;
    note.classList.add('is-error');
    if (field) field.focus();
  };

  const showSuccess = (data) => {
    const when = data.day === 'Another day' && data.date
      ? new Date(data.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
      : data.day.toLowerCase();
    const slot = data.time === 'Any time' ? '' : `, ${data.time.split(' (')[0].toLowerCase()}`;
    successText.textContent = `Thanks ${data.name.split(' ')[0]} — Kevin will call you on ${data.phone} ${when}${slot}.`;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    note.textContent = '';
    note.classList.remove('is-error');

    // Spam trap: real visitors never see or fill this field.
    if (value('company')) { showSuccess({ name: 'there', phone: 'your number', day: 'Today', time: 'Any time' }); return; }

    // Required fields: flag for screen readers and focus the first problem.
    const name = form.elements.name;
    const phone = form.elements.phone;
    const nameBad = !name.value.trim();
    const phoneBad = !phoneLooksValid(phone.value);
    name.setAttribute('aria-invalid', String(nameBad));
    phone.setAttribute('aria-invalid', String(phoneBad));

    if (nameBad) return setError('Please add your name so Kevin knows who he’s calling.', name);
    if (phoneBad) return setError('Please check your phone number — it looks a digit or two short.', phone);
    if (value('day') === 'Another day' && !value('date')) {
      dateInput.setAttribute('aria-invalid', 'true');
      return setError('Please pick a date for your callback.', dateInput);
    }

    const data = {
      name: value('name'),
      phone: value('phone'),
      email: value('email'),
      postcode: value('postcode').toUpperCase(),
      urgency: value('urgency'),
      service: value('service'),
      day: value('day'),
      date: value('day') === 'Another day' ? value('date') : '',
      time: value('time'),
      message: value('message'),
      page: window.location.pathname,
      lead_source: 'Website form',
      submitted_at: new Date().toISOString(),
    };

    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.disabled = true;
    const result = await deliverLead(data);
    submitBtn.removeAttribute('aria-busy');
    submitBtn.disabled = false;
    if (result === 'sent') {
      form.reset();
      trackConversion('lead', { lead_source: data.lead_source });
      showSuccess(data);
      return;
    }
    note.textContent = 'Your email app should now be open with your request filled in — just press send.';
  });
}

function initQuickForm() {
  const form = document.getElementById('quickForm');
  const note = document.getElementById('quickNote');
  if (!form || !note) return;
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('input', (event) => {
    if (event.target.getAttribute('aria-invalid') === 'true' && event.target.value.trim()) {
      event.target.setAttribute('aria-invalid', 'false');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    note.textContent = '';
    note.classList.remove('is-error');
    const name = form.elements.name;
    const phone = form.elements.phone;

    if (form.elements.company.value) return; // spam trap

    const nameBad = !name.value.trim();
    const phoneBad = !phoneLooksValid(phone.value);
    name.setAttribute('aria-invalid', String(nameBad));
    phone.setAttribute('aria-invalid', String(phoneBad));
    if (nameBad || phoneBad) {
      note.textContent = nameBad
        ? 'Please add your name so Kevin knows who he’s calling.'
        : 'Please check your phone number — it looks a digit or two short.';
      note.classList.add('is-error');
      (nameBad ? name : phone).focus();
      return;
    }

    const data = {
      name: name.value.trim(), phone: phone.value.trim(), email: '', postcode: '',
      urgency: 'Not specified (quick request)', service: form.elements.service.value,
      day: 'Today', date: '', time: 'Any time', message: '',
      page: window.location.pathname, lead_source: 'Website quick bar',
      submitted_at: new Date().toISOString(),
    };

    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    const result = await deliverLead(data);
    btn.removeAttribute('aria-busy');
    btn.disabled = false;

    if (result === 'sent') {
      trackConversion('lead', { lead_source: data.lead_source });
      const done = document.createElement('div');
      done.className = 'quick-done';
      done.setAttribute('tabindex', '-1');
      done.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><p></p>';
      done.querySelector('p').textContent =
        `Thanks ${data.name.split(' ')[0]} — Kevin will call you back shortly on ${data.phone}.`;
      form.replaceChildren(done);
      done.focus();
    } else {
      note.textContent = 'Your email app should now be open with your request filled in — just press send.';
    }
  });
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    if (!track) return;
    const items = Array.from(track.children);
    const behavior = PREFERS_REDUCED_MOTION ? 'auto' : 'smooth';

    const pageWidth = () => {
      const first = items[0];
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const perView = Math.max(1, Math.round((track.clientWidth + gap) / (first.offsetWidth + gap)));
      return { step: (first.offsetWidth + gap) * perView, perView, itemStep: first.offsetWidth + gap };
    };

    let dots = [];
    const buildDots = () => {
      if (!dotsWrap) return;
      const { perView } = pageWidth();
      const pages = Math.max(1, Math.ceil(items.length / perView));
      dotsWrap.replaceChildren();
      dots = Array.from({ length: pages }, () => dotsWrap.appendChild(document.createElement('span')));
    };

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      if (dots.length) {
        const { step } = pageWidth();
        const atEnd = track.scrollLeft >= max;
        const idx = atEnd ? dots.length - 1 : Math.round(track.scrollLeft / step);
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      }
      // Off-screen cards shouldn't be tab stops until scrolled into view.
      const left = track.scrollLeft, right = left + track.clientWidth;
      items.forEach((item) => {
        const visible = item.offsetLeft + item.offsetWidth / 2 >= left && item.offsetLeft + item.offsetWidth / 2 <= right;
        item.querySelectorAll('a, button').forEach((el) => {
          if (visible) el.removeAttribute('tabindex'); else el.setAttribute('tabindex', '-1');
        });
      });
    };

    prev && prev.addEventListener('click', () => track.scrollBy({ left: -pageWidth().step, behavior }));
    next && next.addEventListener('click', () => track.scrollBy({ left: pageWidth().step, behavior }));

    let ticking = false;
    track.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(() => { update(); ticking = false; }); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', () => { buildDots(); update(); });

    buildDots();
    update();
  });
}

function initScrollReveal() {
  if (PREFERS_REDUCED_MOTION) return;
  if (!('IntersectionObserver' in window)) return;

  // Progressive enhancement: the .reveal class (and its hidden starting
  // state) is only ever added here, by JS — so content stays visible by
  // default if JS fails to run.
  const groups = [
    '.section-head',
    '.service-card',
    '.why-card',
    '.review-card',
    '.related-card',
    '.about-copy',
    '.about-quote',
    '.hero-copy',
    '.hero-panel',
    '.includes-grid li',
    '.process-step',
    '.step',
    '.about-media',
    '.img-placeholder',
    '.services-cta',
    '.areas-list',
  ];

  const targets = document.querySelectorAll(groups.join(','));
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Stagger siblings within the same parent slightly, so grids animate
  // in as a wave rather than all at once.
  const delayByParent = new WeakMap();

  targets.forEach((el) => {
    el.classList.add('reveal');
    const parent = el.parentElement;
    const count = delayByParent.get(parent) || 0;
    el.style.transitionDelay = `${Math.min(count * 70, 420)}ms`;
    delayByParent.set(parent, count + 1);
    observer.observe(el);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const decimals = (el.getAttribute('data-count-to').split('.')[1] || '').length;
    const suffix = el.getAttribute('data-suffix') || '';

    if (PREFERS_REDUCED_MOTION || Number.isNaN(target)) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }


    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  if (!PREFERS_REDUCED_MOTION) {
    counters.forEach((el) => {
      const raw = el.getAttribute('data-count-to');
      const decimals = (raw.split('.')[1] || '').length;
      el.textContent = (0).toFixed(decimals) + (el.getAttribute('data-suffix') || '');
    });
  }
  counters.forEach((el) => observer.observe(el));
}

function initScrollspy() {
  const links = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

function initHeroParallax() {
  if (PREFERS_REDUCED_MOTION) return;
  const layers = document.querySelectorAll('.hero-decor');
  if (!layers.length) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    layers.forEach((layer) => {
      layer.style.transform = `translateY(${y * 0.12}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// Dropdown menus (Services / Areas). Hover + focus open them on desktop via
// CSS; the chevron button toggles them for touch, keyboard and the mobile menu.
function initSubmenus() {
  const items = document.querySelectorAll('.nav-item.has-sub');
  if (!items.length) return;
  const closeAll = (except) => items.forEach((item) => {
    if (item === except) return;
    item.classList.remove('is-open');
    const btn = item.querySelector('.sub-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
  items.forEach((item) => {
    const btn = item.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = !item.classList.contains('is-open');
      closeAll(item);
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item.has-sub')) closeAll();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector('.nav-item.is-open');
    if (open) {
      closeAll();
      const btn = open.querySelector('.sub-toggle');
      if (btn) btn.focus();
    }
  });
}

// Photo lightbox for gallery links (links still open the image without JS).
function initLightbox() {
  const links = Array.from(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');
  dialog.innerHTML = `<div class="lightbox-inner">
      <img alt="">
      <p class="lightbox-cap"></p>
      <button type="button" class="lb-btn lb-close" aria-label="Close photo">&times;</button>
      <button type="button" class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button>
      <button type="button" class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>
    </div>`;
  document.body.appendChild(dialog);
  const imgEl = dialog.querySelector('img');
  const cap = dialog.querySelector('.lightbox-cap');
  let group = [];
  let index = 0;

  const show = (i) => {
    index = (i + group.length) % group.length;
    const link = group[index];
    imgEl.src = link.getAttribute('href');
    imgEl.alt = link.dataset.caption || '';
    cap.textContent = `${link.dataset.caption || ''}  (${index + 1} of ${group.length})`;
    const single = group.length < 2;
    dialog.querySelector('.lb-prev').hidden = single;
    dialog.querySelector('.lb-next').hidden = single;
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      group = links.filter((l) => l.dataset.lightbox === link.dataset.lightbox);
      show(group.indexOf(link));
      dialog.showModal();
    });
  });
  dialog.querySelector('.lb-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (event) => { if (event.target === dialog || event.target.classList.contains('lightbox-inner')) dialog.close(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens.
  let startX = null;
  dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}
