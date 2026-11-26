// Generates public/og.png (1200x630) from an SVG. Run: node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F2A44"/><stop offset="1" stop-color="#081827"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.8"><stop offset="0" stop-color="#575be6" stop-opacity="0.6"/><stop offset="1" stop-color="#575be6" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="80" width="64" height="64" rx="14" fill="#575be6" stroke="#7cc8ff" stroke-opacity=".5"/>
  <text x="112" y="122" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#fff">MY</text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="84" fill="#fff" letter-spacing="-2">Mo'men Yosri</text>
  <text x="80" y="400" font-family="Arial, sans-serif" font-size="38" fill="#7cc8ff">Mobile Engineering Team Lead</text>
  <text x="80" y="460" font-family="Arial, sans-serif" font-size="30" fill="#C9D6E3">Flutter · Scalable mobile architecture · EduLens</text>
  <rect x="80" y="540" width="1040" height="1" fill="#C9D6E3" fill-opacity=".25"/>
  <text x="80" y="582" font-family="Courier New, monospace" font-size="24" fill="#C9D6E3">momen-yosri.github.io/my-portfolio</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('og.png written');
