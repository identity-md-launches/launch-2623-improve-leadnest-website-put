import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const svg = await readFile('src/assets/share-card.svg', 'utf8');
const fontPath = fileURLToPath(import.meta.resolve('@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'));
const font = await readFile(fontPath);
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.setContent(`<style>@font-face{font-family:'Manrope Variable';src:url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');font-weight:200 800}body{margin:0}svg{display:block}</style>${svg}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og-image.png' });
  console.log('Generated public/og-image.png (1200 × 630) from src/assets/share-card.svg');
} finally { await browser.close(); }
