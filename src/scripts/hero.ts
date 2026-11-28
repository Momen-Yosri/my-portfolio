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
  // stay see-through until there are frames, so the poster underneath never blanks
  video.addEventListener('playing', () => (video.style.opacity = ''));

  let turn = 0; // current angle
  let target = 0;
  let front = -1;
  let paused = reduce;
  let ready = document.readyState === 'complete';
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
    hero.style.setProperty('--primary', d.primary!);
    const name = document.createElement('bdi');
    name.textContent = d.name!;
    name.className = 'in';
    const label = q('[data-current]');
    // keep the new <bdi> styled by the component's scoped CSS
    const cid = label.getAttributeNames().find((n) => n.startsWith('data-astro-cid'));
    if (cid) name.setAttribute(cid, '');
    label.replaceChildren(name);
    const giant = document.createElement('bdi');
    giant.textContent = d.name!;
    q('[data-giant]').replaceChildren(giant);
    // drop the old video now; the new one loads once the ring stops
    video.pause();
    video.remove();
  };

  // swapping the video source mid-rotation is what made the ring stutter
  const attach = () => {
    const card = cards[front];
    // nothing is downloaded before the page has loaded, or while motion is paused
    if (!ready || paused) return;
    if (video.parentElement !== card) {
      video.style.opacity = '0';
      video.src = card.dataset.video!;
      card.appendChild(video);
    }
    play();
  };

  const play = () => {
    // with motion paused the poster stays on screen
    video.style.display = paused ? 'none' : '';
    if (!paused && visible) video.play().catch(() => {});
    else video.pause();
  };

  const draw = () => {
    ring.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${turn}deg)`;
    cards.forEach((c, i) => {
      // only the front card and its neighbours are painted
      const facing = Math.cos(((i * step + turn) * Math.PI) / 180);
      const o = Math.max(0, Math.min(1, (facing - 0.45) / 0.5));
      const li = c.parentElement!;
      li.style.opacity = o.toFixed(3);
      li.style.visibility = o > 0 ? 'visible' : 'hidden';
    });
    const n = cards.length;
    setFront(((Math.round(-turn / step) % n) + n) % n);
  };

  // fixed-duration easing, so speed does not depend on the frame rate
  const animate = () => {
    cancelAnimationFrame(frame);
    const from = turn;
    const duration = reduce ? 0 : 650;
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      const p = duration ? Math.min(1, (now - start) / duration) : 1;
      turn = from + (target - from) * (1 - Math.pow(1 - p, 3));
      draw();
      if (p < 1) frame = requestAnimationFrame(tick);
      else attach();
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
    if (v) play();
    else attach();
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

  // the grid floor only animates while the hero is on screen
  const floor = q('.floor i');
  new IntersectionObserver(([e]) => {
    floor.style.animationPlayState = e.isIntersecting ? '' : 'paused';
  }).observe(hero);

  draw();
  setPaused(paused);
  if (!ready) {
    window.addEventListener(
      'load',
      () => {
        ready = true;
        attach();
      },
      { once: true },
    );
  }
}

export {};
