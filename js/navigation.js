/** Production navigation: mobile drawer, smooth scrolling, and active section state. */
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const navBackdrop = document.querySelector('.nav-backdrop');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

/** Keeps the header’s glass treatment in sync with scroll position. */
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);

/** Opens or closes the mobile drawer and keeps ARIA state accurate. */
const setMenuState = (isOpen) => {
  navToggle?.setAttribute('aria-expanded', String(isOpen));
  navToggle?.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  navToggle?.classList.toggle('is-open', isOpen);
  navMenu?.classList.toggle('is-open', isOpen);
  navBackdrop?.classList.toggle('is-visible', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
};

const setActiveLink = (id) => navLinks.forEach((link) => {
  const active = link.getAttribute('href') === `#${id}`;
  link.toggleAttribute('aria-current', active);
  if (active) link.setAttribute('aria-current', 'page');
});

updateHeader();
window.addEventListener('scroll', updateHeader, { passive:true });
navToggle?.addEventListener('click', () => setMenuState(navToggle.getAttribute('aria-expanded') !== 'true'));
navBackdrop?.addEventListener('click', () => setMenuState(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenuState(false); });

navLinks.forEach((link) => link.addEventListener('click', (event) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (!section) return;
  event.preventDefault();
  section.scrollIntoView({ behavior:'smooth', block:'start' });
  setMenuState(false);
}));

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveLink(visible.target.id);
}, { rootMargin:'-35% 0px -55% 0px', threshold:[0,.1,.4] });
trackedSections.forEach((section) => observer.observe(section));
