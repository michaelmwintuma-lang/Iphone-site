/**
 * Ad-hoc screenshot helper for design review.
 *   node scripts/shot.mjs <route> <out.png> [selector] [width] [theme]
 */
import { chromium } from 'playwright';

const [route = '/', out = 'shot.png', selector = '', width = '1366', theme = 'light'] =
  process.argv.slice(2);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: Number(width), height: 950 },
  deviceScaleFactor: 2,
  isMobile: Number(width) < 500,
  hasTouch: Number(width) < 500
});
const page = await ctx.newPage();
await page.addInitScript(t => localStorage.setItem('paindem_theme', t), theme);
await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' });

// Fire every scroll reveal, then come back to the top.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 300));
});

if (selector) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator(selector).first().screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: true });
}

await browser.close();
console.log('wrote', out);
