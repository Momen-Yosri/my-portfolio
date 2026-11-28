const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add('in');
          io.unobserve(el);
          const wait = (parseFloat(el.style.getPropertyValue('--d')) || 0) + 750;
          window.setTimeout(() => el.classList.add('done'), wait);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

// Counters: the final value is already in the HTML; animate only if motion is allowed
if (!reduce && 'IntersectionObserver' in window) {
  const cio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        cio.unobserve(el);
        const to = Number(el.dataset.countTo);
        const pre = el.dataset.prefix ?? '';
        const suf = el.dataset.suffix ?? '';
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${pre}${Math.round(to * eased)}${suf}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => cio.observe(el));
}

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  const set = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.open = String(open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      set(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1000px)').addEventListener('change', (m) => m.matches && set(false));
}

// Active section highlight
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const secs = links
  .map((l) => document.getElementById(l.hash.slice(1)))
  .filter((s): s is HTMLElement => !!s);
if (secs.length && 'IntersectionObserver' in window) {
  const sio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((l) =>
            l.hash === `#${e.target.id}` ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'),
          );
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  secs.forEach((s) => sio.observe(s));
}

// Nav background on scroll
const header = document.querySelector('.site-header');
const progress = document.querySelector<HTMLElement>('.scroll-progress');
const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress?.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
};
onScroll();
// at most one update per frame, however often scroll fires
let scrollQueued = false;
window.addEventListener(
  'scroll',
  () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      onScroll();
    });
  },
  { passive: true },
);

// Pointer effects: card spotlight (mouse only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) =>
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }),
  );
}
