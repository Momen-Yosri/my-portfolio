# Mo'men Yosri | Portfolio

Astro + TypeScript static portfolio, deployed to GitHub Pages at <https://momen-yosri.github.io/my-portfolio/>.

```bash
npm install
npm run dev       # local dev server at /my-portfolio/
npm run build     # production build to dist/
npm run verify    # astro check + build (needs Node 20.19+ or 22; used in CI)
npm run preview
```

## Structure
- `src/data/` all content (profile, experience, projects, skills, education). Edit here, not in components.
- `src/components/`, `src/layouts/`, `src/pages/` Astro UI; case studies are generated from `projects.ts`.
- `ASSETS_NEEDED.md` open confirmations and images to provide.

Private project source code, internal URLs and business metrics must never be added to this repository.
