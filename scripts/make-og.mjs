// Generates public/og.png (1200x630) from an SVG. Run: node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141414"/><stop offset="1" stop-color="#030303"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.8"><stop offset="0" stop-color="#262626" stop-opacity="0.6"/><stop offset="1" stop-color="#262626" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80,80)"><rect width="64" height="64" rx="16" fill="#fff"/><path d="M15 47V19L32 35L49 19V47M32 35V48" fill="none" stroke="#050505" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
  <text x="80" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="84" fill="#fff" letter-spacing="-2">Mo'men Yosri</text>
  <text x="80" y="400" font-family="Arial, sans-serif" font-size="38" fill="#ffffff">Mobile Engineering Team Lead</text>
  <text x="80" y="460" font-family="Arial, sans-serif" font-size="30" fill="#CDCDCD">Flutter · Scalable mobile architecture · EduLens</text>
  <rect x="80" y="540" width="1040" height="1" fill="#CDCDCD" fill-opacity=".25"/>
  <text x="80" y="582" font-family="Courier New, monospace" font-size="24" fill="#CDCDCD">momen-yosri.github.io/my-portfolio</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('og.png written');
