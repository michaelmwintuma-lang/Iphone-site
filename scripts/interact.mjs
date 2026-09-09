/**
 * Exercises the interactive flows the route-level smoke test can't reach:
 * the reserve modal and the compare drawer.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const OUT = '.smoke';
const width = Number(process.argv[2] || 1366);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height: 950 },
  deviceScaleFactor: 2,
  isMobile: width < 500,
  hasTouch: width < 500
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

// --- Reserve modal ---
await page.goto(`${BASE}/iphone/iphone-15-128gb`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Reserve this iPhone/i }).first().click();
await page.waitForSelector('.reserve-modal', { timeout: 5000 });
await page.waitForTimeout(400);
await page.locator('.reserve-modal').screenshot({ path: `${OUT}/reserve-${width}.png` });
console.log('OK   reserve modal opened');

// Empty submit must be blocked. Native `required` fires first, so assert the field is
// invalid and no WhatsApp handoff happened, rather than expecting the custom error.
await page.locator('.reserve-submit').click();
await page.waitForTimeout(300);
const blocked = await page.evaluate(() => {
  const form = document.querySelector('.reserve-form');
  return !form.checkValidity() && document.querySelectorAll('.reserve-success').length === 0;
});
console.log(blocked ? 'OK   empty submit blocked' : 'FAIL empty submit not blocked');

// A too-short MoMo number passes `required` but must still hit the custom check.
await page.fill('.reserve-field input[type="text"]:not(.reserve-honeypot)', 'Kwame Mensah');
await page.fill('.reserve-field input[type="tel"]', '0248');
await page.locator('.reserve-submit').click();
await page.waitForTimeout(400);
console.log(
  (await page.locator('.reserve-error').count()) > 0
    ? 'OK   short MoMo number rejected with visible error'
    : 'FAIL short MoMo number accepted'
);

// Escape closes.
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
console.log(
  (await page.locator('.reserve-modal').count()) === 0
    ? 'OK   Escape closes modal'
    : 'FAIL Escape did not close modal'
);

// --- Compare drawer ---
await page.goto(`${BASE}/all-iphones`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const compareBtns = page.locator('.card-compare-btn');
for (let i = 0; i < 3; i++) {
  await compareBtns.nth(i).click({ force: true });
  await page.waitForTimeout(180);
}
await page.waitForSelector('.compare-drawer', { timeout: 5000 });
await page.waitForTimeout(400);

const picked = await page.locator('.compare-bar-thumb').count();
console.log(picked === 3 ? 'OK   compare bar holds 3' : `FAIL compare bar holds ${picked}`);

// The table stays closed until asked for, so it never covers the catalog.
console.log(
  (await page.locator('.compare-table').count()) === 0
    ? 'OK   table stays collapsed until expanded'
    : 'FAIL table auto-expanded over the catalog'
);

// 4th must be refused (max 3).
await compareBtns.nth(3).click({ force: true });
await page.waitForTimeout(250);
const after = await page.locator('.compare-bar-thumb').count();
console.log(after === 3 ? 'OK   4th add correctly refused' : `FAIL grew to ${after}`);

// Expand and check the table.
await page.getByRole('button', { name: /Compare 3/i }).click();
await page.waitForTimeout(400);
const cols = await page.locator('.compare-head-cell').count();
console.log(cols === 3 ? 'OK   expanded table shows 3 columns' : `FAIL table has ${cols} columns`);

await page.locator('.compare-drawer').screenshot({ path: `${OUT}/compare-${width}.png` });

console.log(errors.length ? `\nERRORS:\n  ${errors.slice(0, 5).join('\n  ')}` : '\nNo console errors.');
await browser.close();
