/**
 * Headless smoke test: loads every route in both themes plus a mobile pass, and fails on
 * console/page errors, empty renders, or horizontal overflow.
 *
 * Start the dev server first, then:  npm run smoke
 * Screenshots land in .smoke/ (gitignored).
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.SMOKE_BASE || 'http://localhost:3000';
const OUT = process.env.SMOKE_OUT || path.resolve(import.meta.dirname, '..', '.smoke');
fs.mkdirSync(OUT, { recursive: true });

const routes = [
  ['home', '/'],
  ['calculator', '/calculator'],
  ['catalog', '/all-iphones'],
  ['product', '/iphone/iphone-15-128gb'],
  ['trade-in', '/trade-in'],
  ['faq', '/faq'],
  ['visit-shop', '/visit-shop'],
  ['how-it-works', '/how-it-works'],
  ['notfound', '/this-route-does-not-exist']
];

const browser = await chromium.launch();
let failures = 0;

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

  await page.addInitScript(t => localStorage.setItem('paindem_theme', t), theme);

  for (const [name, route] of routes) {
    errors.length = 0;
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);

    const domSize = await page.$eval('#root', el => el.innerHTML.length).catch(() => 0);
    const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => '(no h1)');
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    );

    const ok = errors.length === 0 && domSize > 500;
    if (!ok) failures++;
    console.log(
      `${ok ? 'OK  ' : 'FAIL'} [${theme}] ${route.padEnd(30)} dom=${String(domSize).padStart(6)} ` +
      `overflowX=${overflow} h1="${h1.slice(0, 44)}"`
    );
    errors.slice(0, 3).forEach(e => console.log('       ! ' + e.slice(0, 170)));

    if (theme === 'light') {
      // Scroll the whole page so IntersectionObserver reveals fire before capture,
      // otherwise full-page shots show blank bands where content hasn't animated in.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 250));
      });
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: name !== 'home' });
    }
  }
  await context.close();
}

// Mobile pass — horizontal overflow is the classic regression here.
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
});
const mp = await mobile.newPage();
mp.on('pageerror', e => { console.log('       ! mobile PAGEERROR: ' + e.message); failures++; });

// Every route, not a subset — the trade-in clipping bug hid in a route this pass skipped.
for (const [name, route] of routes) {
  await mp.goto(BASE + route, { waitUntil: 'networkidle' });
  await mp.waitForTimeout(600);
  // Fire scroll reveals so the capture isn't full of blank bands.
  await mp.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 250));
  });
  const overflow = await mp.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  const ok = overflow === 0;
  if (!ok) failures++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} [mobile390] ${route.padEnd(30)} overflowX=${overflow}`);
  await mp.screenshot({ path: `${OUT}/mobile-${name}.png`, fullPage: true });
}
await mobile.close();
await browser.close();

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
