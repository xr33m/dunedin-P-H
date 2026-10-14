// Dunedin Plumbing & Heating — site scripts
// Small, dependency-free enhancements: mobile nav, sticky header shadow,
// back-to-top button, and a no-backend contact form handler.

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initSmoothAnchorClose();
  initBackToTop();
  initContactForm();
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
