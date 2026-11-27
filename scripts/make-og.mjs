// Generates public/og.png (1200x630) from an SVG. Run: node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f1ec"/><stop offset="1" stop-color="#ebe8e1"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.8"><stop offset="0" stop-color="#262626" stop-opacity="0.6"/><stop offset="1" stop-color="#262626" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(80,80) scale(0.1875)"><rect width="512" height="512" rx="128" fill="#12110f"/><path d="M96 120h62v272H96zM354 120h62v272h-62z" fill="#f3f1ec"/><path d="M168 120H188L256 208L324 120H344V200L286 274V392H226V274L168 200Z" fill="#8f8a80"/></g>
  <text x="80" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="84" fill="#12110f" letter-spacing="-2">Mo'men Yosri</text>
  <text x="80" y="400" font-family="Arial, sans-serif" font-size="38" fill="#12110f">Mobile Engineering Team Lead</text>
  <text x="80" y="460" font-family="Arial, sans-serif" font-size="30" fill="#45423c">Flutter · Scalable mobile architecture · EduLens</text>
  <rect x="80" y="540" width="1040" height="1" fill="#45423c" fill-opacity=".25"/>
  <text x="80" y="582" font-family="Courier New, monospace" font-size="24" fill="#45423c">momen-yosri.github.io/my-portfolio</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('og.png written');
