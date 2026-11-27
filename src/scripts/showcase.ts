// Splash-screen player: one video element, auto-advances while on screen.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-showcase]').forEach((root) => {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector(s) as unknown as T;
  const video = q<HTMLVideoElement>('video');
  const screen = q('[data-screen]');
  const toggle = q<HTMLButtonElement>('[data-toggle]');
  const stores = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-store]'));
  const bar = q('[data-bar]');
  const items = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-app]'));
  let index = 0;
  let visible = false;
  let paused = reduce; // user intent; reduced motion starts paused
  let timer = 0;

  video.muted = true;
  const play = () => {
    if (visible && !paused) video.play().catch(() => {});
  };

  const select = (i: number) => {
    index = (i + items.length) % items.length;
    const d = items[index].dataset;
    window.clearTimeout(timer);
    items.forEach((b, n) => b.setAttribute('aria-pressed', String(n === index)));
    root.closest<HTMLElement>('.showcase')!.style.setProperty('--primary', d.primary!);
    screen.style.background = d.color!;
    video.poster = d.poster!;
    video.src = d.video!;
    video.setAttribute('aria-label', `${d.name} splash screen`);
    q('[data-name]').textContent = d.name!;
    q('[data-count]').textContent = String(index + 1).padStart(2, '0');
    stores.forEach((a) => {
      const href = d[a.dataset.store!];
      a.hidden = !href;
      if (href) a.href = href;
      else a.removeAttribute('href');
    });
    bar.style.transform = 'scaleX(0)';
    screen.classList.remove('swap');
    void screen.offsetWidth; // restart the animation
    screen.classList.add('swap');
    play();
  };

  items.forEach((b, i) =>
    b.addEventListener('click', () => {
      paused = false;
      visible = true;
      select(i);
    }),
  );
  toggle.addEventListener('click', () => {
    paused = !video.paused;
    window.clearTimeout(timer);
    if (paused) video.pause();
    else video.play().catch(() => {});
  });
  video.addEventListener('play', () => (toggle.textContent = 'Pause'));
  video.addEventListener('pause', () => (toggle.textContent = 'Play'));
  video.addEventListener('timeupdate', () => {
    if (video.duration) bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
  });
  video.addEventListener('ended', () => {
    // hold the final logo briefly, then move on (never under reduced motion)
    timer = window.setTimeout(() => {
      if (!reduce && !paused && visible) select(index + 1);
    }, 900);
  });

  new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (!visible) {
        window.clearTimeout(timer);
        video.pause();
      } else if (video.ended && !reduce && !paused) select(index + 1);
      else play();
    },
    { threshold: 0.35 },
  ).observe(screen);
});

export {};
