// Interactive screen decks: tap a screen to bring it forward, tilt with the
// pointer, and cycle on its own while visible. Used by projects and spotlight.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.querySelectorAll<HTMLElement>('[data-deck]').forEach((deck) => {
  const cards = Array.from(deck.querySelectorAll<HTMLElement>('[data-deck-card]'));
  const n = cards.length;
  if (n < 2) return;
  const half = Math.floor(n / 2);
  // offset from the centre: -half … +half
  const offsets = cards.map((c) => Number(c.style.getPropertyValue('--o')));
  let visible = false;
  let engaged = false;
  let timer = 0;

  const render = () => {
    cards.forEach((c, i) => {
      c.style.setProperty('--o', String(offsets[i]));
      c.style.setProperty('--d', String(Math.abs(offsets[i])));
      c.setAttribute('aria-pressed', String(offsets[i] === 0));
    });
  };

  const bring = (index: number) => {
    const shift = offsets[index];
    if (!shift) return;
    offsets.forEach((o, i) => (offsets[i] = ((((o - shift + half) % n) + n) % n) - half));
    render();
  };

  const schedule = () => {
    window.clearInterval(timer);
    if (reduce || !visible || engaged) return;
    timer = window.setInterval(() => bring(offsets.indexOf(1)), 2800);
  };

  cards.forEach((c, i) =>
    c.addEventListener('click', () => {
      bring(i);
      schedule();
    }),
  );

  const engage = (value: boolean) => {
    engaged = value;
    schedule();
  };
  deck.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && engage(true));
  deck.addEventListener('focusin', () => engage(true));
  deck.addEventListener('focusout', () => engage(false));

  // swipe on touch screens
  let startX: number | null = null;
  deck.addEventListener('pointerdown', (e) => (startX = e.clientX));
  deck.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) bring(offsets.indexOf(dx < 0 ? 1 : -1));
  });

  // tilt and spotlight follow the pointer
  deck.addEventListener('pointermove', (e) => {
    if (reduce || !finePointer) return;
    const r = deck.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    deck.style.setProperty('--tx', (x - 0.5).toFixed(3));
    deck.style.setProperty('--ty', (y - 0.5).toFixed(3));
    deck.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    deck.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  });
  deck.addEventListener('pointerleave', () => {
    ['--tx', '--ty', '--gx', '--gy'].forEach((p) => deck.style.removeProperty(p));
    engage(false);
  });

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    },
    { threshold: 0.5 },
  ).observe(deck);

  render();
});

export {};
