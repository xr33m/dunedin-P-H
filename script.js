// Dunedin Plumbing & Heating — site scripts
// Small, dependency-free enhancements: mobile nav, sticky header shadow,
// back-to-top button, and a no-backend contact form handler.

const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initSmoothAnchorClose();
  initBackToTop();
  initContactForm();
  initScrollReveal();
  initCounters();
  initScrollspy();
  initHeroParallax();
  document.getElementById('year').textContent = new Date().getFullYear();
});

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
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

function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  const BUSINESS_EMAIL = 'info@dunedinplumbing.co.uk';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!name || !phone) {
      note.textContent = 'Please add your name and a phone number so we can call you back.';
      note.classList.add('is-error');
      return;
    }

    note.classList.remove('is-error');

    const subject = encodeURIComponent(`Callback request: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nService: ${service}\n\nDetails:\n${message || 'Not provided'}`
    );

    // No backend on this static site — hand the enquiry to the visitor's
    // email client, pre-filled, so nothing gets lost.
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;

    note.textContent = "Thanks! Your email app should now be open with your request ready to send.";
    form.reset();
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
