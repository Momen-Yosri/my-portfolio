// Hero carousel: a 3D ring of apps. The front one plays and recolours the hero.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = document.querySelector<HTMLElement>('[data-hero]');

if (hero) {
  const q = (s: string) => hero.querySelector<HTMLElement>(s)!;
  const stage = q('[data-stage]');
  const ring = q('[data-ring]');
  const pauseBtn = q('[data-pause]');
  const cards = Array.from(hero.querySelectorAll<HTMLButtonElement>('[data-card]'));
  const step = 360 / cards.length;

  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.setAttribute('aria-hidden', 'true');

  let turn = 0; // current angle
  let target = 0;
  let front = -1;
  let paused = reduce;
  let visible = true;
  let drag: { x: number; from: number; moved: boolean } | null = null;
  let dragged = false;
  let frame = 0;
  let timer = 0;

  const setFront = (i: number) => {
    if (i === front) return;
    front = i;
    const d = cards[i].dataset;
    cards.forEach((c, n) => c.parentElement!.classList.toggle('front', n === i));
    hero.style.setProperty('--brand', d.glow!);
    q('[data-source-label]').textContent = d.source!;
    for (const s of ['[data-current]', '[data-giant]']) {
      const name = document.createElement('bdi');
      name.textContent = d.name!;
      name.className = 'in';
      q(s).replaceChildren(name);
    }
    // keep the new <bdi> styled by the component's scoped CSS
    const cid = q('[data-giant]').getAttributeNames().find((n) => n.startsWith('data-astro-cid'));
    if (cid) q('[data-giant] bdi').setAttribute(cid, '');
    video.pause();
    video.src = d.video!;
    cards[i].appendChild(video);
    play();
  };

  const play = () => {
    // with motion paused the poster stays on screen
    video.style.display = paused ? 'none' : '';
    if (!paused && visible) video.play().catch(() => {});
    else video.pause();
  };

  const draw = () => {
    ring.style.setProperty('--turn', `${turn}deg`);
    cards.forEach((c, i) => {
      const facing = Math.cos(((i * step + turn) * Math.PI) / 180);
      c.parentElement!.style.setProperty('--o', String(Math.max(0.25, facing ** 2)));
    });
    const n = cards.length;
    setFront(((Math.round(-turn / step) % n) + n) % n);
  };

  const animate = () => {
    cancelAnimationFrame(frame);
    const tick = () => {
      turn += (target - turn) * (reduce ? 1 : 0.09);
      if (Math.abs(target - turn) < 0.05) turn = target;
      draw();
      if (turn !== target) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!paused && visible) timer = window.setTimeout(() => go(target - step), 3600);
  };

  const go = (angle: number) => {
    target = angle;
    animate();
    schedule();
  };

  q('[data-prev]').addEventListener('click', () => go(target + step));
  q('[data-next]').addEventListener('click', () => go(target - step));

  const setPaused = (v: boolean) => {
    paused = v;
    pauseBtn.textContent = v ? 'Play' : 'Pause';
    pauseBtn.setAttribute('aria-pressed', String(v));
    play();
    schedule();
  };
  pauseBtn.addEventListener('click', () => setPaused(!paused));

  cards.forEach((c, i) =>
    c.addEventListener('click', () => {
      if (dragged) return;
      // turn the shortest way round to the chosen card
      const delta = ((((-i * step - target) % 360) + 540) % 360) - 180;
      go(target + delta);
    }),
  );

  stage.addEventListener('pointerdown', (e) => {
    dragged = false;
    drag = { x: e.clientX, from: turn, moved: false };
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 6) return;
    drag.moved = dragged = true;
    window.clearTimeout(timer);
    cancelAnimationFrame(frame);
    turn = target = drag.from + dx * 0.35;
    draw();
  });
  const release = () => {
    if (!drag) return;
    if (drag.moved) go(Math.round(turn / step) * step);
    drag = null;
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    play();
    schedule();
  }).observe(stage);

  draw();
  setPaused(paused);
}

export {};
