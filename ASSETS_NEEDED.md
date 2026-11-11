# Assets and confirmations needed

Nothing below is faked on the site. Sections that need these assets are simply hidden or text-only until you supply them.

## Missing source document
`PORTFOLIO_SOURCE.md` was not found on this machine. The site was built from the facts in the original brief plus read-only checks of local project files. Please re-check every claim against your real source document before deploying.

## To confirm
- **Location** (`src/data/profile.ts`): shown as "Egypt". It is inferred, not confirmed. Set your city/country as you want it public.
- **Qanoni / Mr. Heta / TrendZone** (`src/data/projects.ts`, `moreProjects`): descriptions are deliberately minimal. Add real descriptions and public store links if you want them.
- **Certification dates**: ALX AI Career Essentials and IELTS have no date on the site (none were provided).
- **CV PDF**: the old `Mo'men-Yosri-CV.pdf` was removed from the live tree because it may contain your phone number. Provide a CV with no phone number if you want a download link.
- **Per-project "Problem" text** for NASU, Student App, CARVEN and Scanner is written from the product descriptions in the brief and local docs. Edit any that do not match your recollection.

## Visual assets to provide (optional but recommended)
Add real images under `src/assets/projects/<slug>/` and list them in the `screenshots` array of each project in `src/data/projects.ts`. Use store screenshots or your own device captures only. No confidential dashboards or admin screens.

| Project | Suggested assets |
| --- | --- |
| White-label Academy Platform | 2–3 screenshots of the Golden Academy store listing / app screens |
| NASU | Dashboard, lecture player, exam screen |
| EduLens Student App | Home, video lecture, bookstore |
| CARVEN | Course screen, QR attendance |
| EduLens Scanner | Scan screen, attendance history |
| Open Graph | `public/og.png` is a generated text card. Replace with a designed one if wanted (1200×630) |
