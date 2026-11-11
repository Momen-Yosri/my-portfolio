import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Project repository => served from https://momen-yosri.github.io/my-portfolio/
export default defineConfig({
  site: 'https://momen-yosri.github.io',
  base: '/my-portfolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
