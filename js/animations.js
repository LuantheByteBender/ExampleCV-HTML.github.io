/** Reveals About content once it enters the viewport, respecting motion preferences. */
const revealElements = document.querySelectorAll('.reveal-on-scroll, .journey-timeline');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enrich the fixed background without maintaining dozens of repetitive markup entries.
const particleField = document.querySelector('.page-particles');
if (particleField) {
  const extraParticles = document.createDocumentFragment();

  for (let index = 0; index < 40; index += 1) {
    const particle = document.createElement('i');
    const direction = index % 2 === 0 ? 1 : -1;
    particle.style.top = `${2 + ((index * 37 + 11) % 95)}%`;
    particle.style.left = `${2 + ((index * 53 + 17) % 95)}%`;
    particle.style.setProperty('--particle-size', `${1 + ((index * 5) % 3)}px`);
    particle.style.setProperty('--particle-duration', `${7 + ((index * 7) % 9)}s`);
    particle.style.setProperty('--drift-x', `${direction * (8 + ((index * 3) % 12))}px`);
    particle.style.setProperty('--drift-y', `${-(12 + ((index * 5) % 14))}px`);
    particle.style.animationDelay = `${-(index % 11)}s`;
    extraParticles.append(particle);
  }

  particleField.append(extraParticles);
}

// Make nearby badges gravitate towards the cursor anywhere in the profile area.
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.hero-visual').forEach((visual) => {
    const badges = [...visual.querySelectorAll('.magnetic-badge')];
    const attractionRadius = 340;
    const maxPull = 38;
    const restingPositions = new Map();
    const currentPositions = new Map();
    let pointer = null;
    let animationFrame = null;

    const saveRestingPositions = () => {
      badges.forEach((badge) => {
        const bounds = badge.getBoundingClientRect();
        restingPositions.set(badge, {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        });
        currentPositions.set(badge, { x: 0, y: 0 });
      });
    };

    const animate = () => {
      if (!pointer) return;

      badges.forEach((badge) => {
        const resting = restingPositions.get(badge);
        const current = currentPositions.get(badge);
        const offsetX = pointer.x - resting.x;
        const offsetY = pointer.y - resting.y;
        const distance = Math.hypot(offsetX, offsetY);
        const force = Math.pow(Math.max(0, 1 - distance / attractionRadius), 0.65);
        const targetX = force && distance ? (offsetX / distance) * force * maxPull : 0;
        const targetY = force && distance ? (offsetY / distance) * force * maxPull : 0;

        current.x += (targetX - current.x) * 0.14;
        current.y += (targetY - current.y) * 0.14;
        badge.style.transform = `translate(${current.x}px, ${current.y}px)`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    visual.addEventListener('pointerenter', () => {
      saveRestingPositions();
      badges.forEach((badge) => {
        badge.style.transition = 'none';
      });
    });

    visual.addEventListener('pointermove', (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    });

    visual.addEventListener('pointerleave', () => {
      pointer = null;
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      badges.forEach((badge) => {
        badge.style.transition = '';
        badge.style.transform = '';
      });
    });
  });
}

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => revealObserver.observe(element));
}
