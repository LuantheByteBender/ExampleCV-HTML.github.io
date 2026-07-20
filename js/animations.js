/** Reveals About content once it enters the viewport, respecting motion preferences. */
const revealElements = document.querySelectorAll('.reveal-on-scroll, .journey-timeline');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold:0.14 });

  revealElements.forEach((element) => revealObserver.observe(element));
}
