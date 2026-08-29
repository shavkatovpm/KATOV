import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'assets', 'website-natija-5-qoida');

function wrapLines(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function tspans(lines, x, lineHeight, startDy = 0) {
  return lines
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? startDy : lineHeight}">${line}</tspan>`)
    .join('');
}

const HEADLINE = 'MIJOZ NEGA KELMAYAPTI?';

// ---- Variant 1: black bg, centered bold headline ----
function variant1(w, h) {
  const lines = wrapLines(HEADLINE, 14);
  const cy = h / 2 - ((lines.length - 1) * 66) / 2;
  return `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#000000"/>
    <rect x="64" y="64" width="${w - 128}" height="4" fill="#ffffff"/>
    <text x="64" y="140" font-family="Arial, sans-serif" font-size="28" letter-spacing="4" fill="#ffffff">5 QOIDA</text>
    <text font-family="Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff" text-anchor="start">
      ${tspans(lines, 64, 82, cy - h / 2 + 300)}
    </text>
    <text x="64" y="${h - 72}" font-family="Arial, sans-serif" font-size="32" letter-spacing="6" fill="#ffffff">KATOV</text>
  </svg>`;
}

// ---- Variant 2: white bg, giant "5" as design element ----
function variant2(w, h) {
  const lines = wrapLines(HEADLINE, 12);
  return `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#ffffff"/>
    <text x="56" y="360" font-family="Arial, sans-serif" font-weight="700" font-size="340" fill="#000000">5</text>
    <text font-family="Arial, sans-serif" font-weight="700" font-size="58" fill="#000000">
      ${tspans(lines, 64, 68, 460)}
    </text>
    <rect x="64" y="${h - 120}" width="48" height="4" fill="#000000"/>
    <text x="64" y="${h - 72}" font-family="Arial, sans-serif" font-size="28" letter-spacing="6" fill="#000000">KATOV</text>
  </svg>`;
}

// ---- Variant 3: bordered minimal card, centered ----
function variant3(w, h) {
  const lines = wrapLines(HEADLINE, 13);
  const startY = h / 2 - ((lines.length - 1) * 70) / 2 - 20;
  return `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#ffffff"/>
    <rect x="48" y="48" width="${w - 96}" height="${h - 96}" fill="none" stroke="#000000" stroke-width="3"/>
    <text x="${w / 2}" y="${startY - 90}" font-family="Georgia, serif" font-size="120" fill="#000000" text-anchor="middle">&#8220;</text>
    <text font-family="Arial, sans-serif" font-weight="600" font-size="60" fill="#000000" text-anchor="middle">
      ${tspans(lines, w / 2, 70, startY)}
    </text>
    <text x="${w / 2}" y="${h - 80}" font-family="Arial, sans-serif" font-size="26" letter-spacing="6" fill="#000000" text-anchor="middle">KATOV</text>
  </svg>`;
}

const variants = [
  { n: 1, svg: variant1 },
  { n: 2, svg: variant2 },
  { n: 3, svg: variant3 },
];

async function run() {
  await mkdir(outDir, { recursive: true });
  for (const { n, svg } of variants) {
    const square = svg(1080, 1080);
    await sharp(Buffer.from(square)).png().toFile(path.join(outDir, `v${n}_1x1.png`));

    const tall = svg(1080, 1350);
    await sharp(Buffer.from(tall)).png().toFile(path.join(outDir, `v${n}_4x5.png`));

    console.log(`Variant ${n} tayyor (1:1 va 4:5)`);
  }
  console.log('Barcha placeholder rasmlar tayyor:', outDir);
}

run().catch((err) => {
  console.error('Xato:', err);
  process.exit(1);
});
