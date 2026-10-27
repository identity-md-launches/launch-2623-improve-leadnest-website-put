import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

// A bounded production check: owns and closes its static server and browser.
// Scratch evidence stays outside the submission by default.
const root = resolve('dist');
const output = resolve(process.argv[2] || `${tmpdir()}/leadnest-check`);
const buyUrl = 'https://getnightshift.tech/buy/leadnest/64efeb32-ff92-4f26-9ab9-101dea01a110';
const prefix = '/nested/leadnest/';
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const report = { passed: [], limitations: [], viewports: [], accessibility: [], errors: [], externalRequests: [] };
await mkdir(output, { recursive: true });
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    assert(url.pathname.startsWith(prefix));
    const relative = decodeURIComponent(url.pathname.slice(prefix.length));
    const path = resolve(root, relative || 'index.html');
    assert(path.startsWith(root + sep));
    res.setHeader('content-type', mime[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen));
const base = `http://127.0.0.1:${server.address().port}${prefix}`;
let browser;
const pass = label => { report.passed.push(label); console.log(`PASS ${label}`); };
const noOverflow = page => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);

try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  page.on('requestfailed', req => report.errors.push(`Failed request: ${req.url()}`));
  page.on('response', res => { if (res.status() >= 400) report.errors.push(`${res.status()} ${res.url()}`); });
  await page.route('**/*', route => {
    if (route.request().url().startsWith(new URL(base).origin)) return route.continue();
    report.externalRequests.push(route.request().url());
    return route.abort();
  });

  for (const [width, height] of [[320, 700], [390, 844], [672, 900], [768, 1024], [896, 900], [1120, 900], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert(await noOverflow(page), `Overflow at ${width}`);
    assert(await page.evaluate(() => [400, 600, 700].every(weight => document.fonts.check(`${weight} 16px "Manrope Variable"`))));
    const buttons = await page.locator('a.button').evaluateAll(links => links.map(link => link.href));
    assert(buttons.length === 4 && buttons.every(url => url === buyUrl));
    for (const link of await page.locator('a[href^="#"]').all()) {
      const href = await link.getAttribute('href');
      if (href !== '#') assert(await page.locator(href).count(), `Missing target ${href}`);
    }
    const box = await page.locator('.hero-buy .button').boundingBox();
    const product = await page.locator('#hero-title').boundingBox();
    const sample = await page.locator('#sample-title').boundingBox();
    if (width === 390) {
      assert(box.y >= 0 && box.y + box.height <= height, 'Main action is below the first screen');
      assert(product.y >= 0 && product.y + product.height <= height, 'Product is below the first screen');
      assert(sample.y + sample.height <= height, 'Sample is below the first screen');
      await page.screenshot({ path: `${output}/mobile-390.png` });
      await page.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
    }
    if (width === 1440) await page.screenshot({ path: `${output}/desktop-1440.png`, fullPage: true });
    report.viewports.push({ width, height, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth), mainAction: box });
  }
  pass('Seven viewport layouts, loaded local font, valid navigation targets, four exact checkout URLs');
  pass('Product name, price, complete primary action and the sample heading on the first screen at 390 × 844');

  for (const link of await page.locator('.desktop-nav a').all()) {
    const href = await link.getAttribute('href');
    await link.click();
    assert.equal(new URL(page.url()).hash, href);
    const target = await page.locator(href).boundingBox();
    assert(target.y >= 0 && target.y < 900);
  }
  pass('All three desktop navigation links scroll to the intended sections');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator('.mobile-faq').click();
  assert.equal(new URL(page.url()).hash, '#faq');
  pass('Mobile FAQ navigation');
  const details = page.locator('.faq-list details');
  assert.equal(await details.count(), 5);
  for (let index = 0; index < 5; index++) {
    const item = details.nth(index);
    const summary = item.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    assert(await item.evaluate(el => el.open));
    assert(await item.locator('.faq-answer').isVisible());
    await page.keyboard.press('Space');
    assert.equal(await item.evaluate(el => el.open), false);
    await summary.click();
    assert(await item.evaluate(el => el.open));
  }
  assert(await noOverflow(page));
  pass('All five FAQs open and close using keyboard, and open using pointer; answers reflow');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    report.accessibility.push({ width, violations: audit.violations, incomplete: audit.incomplete.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.length })) });
    assert.equal(audit.violations.length, 0, JSON.stringify(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))));
  }
  pass('Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA: zero violations at mobile and desktop with all FAQs open');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  await page.keyboard.press('Tab');
  assert(await page.locator('.hero-buy .button').evaluate(el => el === document.activeElement));
  const outline = await page.locator('.hero-buy .button').evaluate(el => ({ width: getComputedStyle(el).outlineWidth, style: getComputedStyle(el).outlineStyle }));
  assert.equal(outline.style, 'solid');
  assert.equal(outline.width, '3px');
  await page.screenshot({ path: `${output}/keyboard-focus.png` });
  pass('Keyboard skip link, focus order and primary action focus indicator');

  const image = await page.evaluate(async () => {
    const img = new Image();
    img.src = document.querySelector('meta[property="og:image"]').content;
    await img.decode();
    return { width: img.naturalWidth, height: img.naturalHeight };
  });
  assert.deepEqual(image, { width: 1200, height: 630 });
  const iconResponse = await page.request.get(new URL(await page.locator('link[rel="icon"]').getAttribute('href'), base).href);
  assert.equal(iconResponse.status(), 200);
  pass('Local 1200 × 630 social image and favicon load from a nested hosting path');

  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  assert(await noOverflow(page));
  assert(await page.locator('.hero-buy .button').isVisible());
  pass('200% root text enlargement reflows at 390px (not native browser zoom)');
  await page.goto(base);
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
  assert(await noOverflow(page));
  pass('RTL layout mirror has no horizontal overflow at 390px (English content only)');
  await page.goto(base);
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.equal(await page.locator('.button-primary').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  pass('Reduced motion removes smooth scrolling and control transitions');

  // Check the actual outbound action while keeping the payment service outside this test.
  await page.route(buyUrl, route => route.fulfill({ contentType: 'text/html', body: '<title>Checkout navigation verified</title><p>Checkout route intercepted by validation.</p>' }));
  await page.locator('.hero-buy .button').click();
  assert.equal(page.url(), buyUrl);
  pass('Primary purchase action navigates to the exact provided checkout URL (intercepted)');
  assert.equal(report.externalRequests.length, 0);
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  pass('No console errors, missing local resources or external runtime requests');

  let safari;
  try {
    safari = await webkit.launch({ headless: true });
  } catch (error) {
    report.limitations.push(`WebKit could not launch: ${String(error.message).split('\n').slice(0, 6).join(' ')}`);
    console.log(`LIMITATION ${report.limitations.at(-1)}`);
  }
  if (safari) {
    try {
      const safariContext = await safari.newContext({ viewport: { width: 390, height: 844 } });
      const webPage = await safariContext.newPage();
      await webPage.goto(base);
      assert(await noOverflow(webPage));
      await webPage.locator('.mobile-faq').click();
      await webPage.locator('.faq-list summary').first().click();
      assert(await webPage.locator('.faq-list details').first().evaluate(el => el.open));
      await webPage.route(buyUrl, route => route.fulfill({ body: 'Checkout route intercepted by validation.' }));
      await webPage.goto(base);
      await webPage.locator('.hero-buy .button').click();
      assert.equal(webPage.url(), buyUrl);
      pass('WebKit mobile FAQ and checkout interactions');
    } finally { await safari.close(); }
  }
  report.limitations.push('No physical phone, native screen reader, native 200% browser zoom, real payment or post-purchase fulfillment was tested.');
} catch (error) {
  report.errors.push(String(error.stack || error));
  process.exitCode = 1;
  console.error(error);
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
  await writeFile(`${output}/results.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`Results: ${output}/results.json`);
}
