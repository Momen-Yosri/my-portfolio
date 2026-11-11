/** Prefix a path with the site base (/my-portfolio/) so it works on GitHub Pages. */
export function u(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
}
