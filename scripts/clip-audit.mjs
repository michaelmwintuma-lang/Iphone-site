/**
 * Finds content that is CLIPPED rather than merely overflowing.
 *
 * The mobile stylesheet sets `overflow-x: hidden` on html/body/#root, so a document-level
 * scrollWidth check reports clean even when a child is being cut off mid-word. This walks
 * the tree and reports any element whose right edge lands outside its clipping ancestor.
 */
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE || 'http://localhost:3000';
const WIDTH = Number(process.argv[2] || 390);

const routes = [
  '/', '/calculator', '/all-iphones', '/iphone/iphone-15-128gb',
  '/trade-in', '/faq', '/visit-shop', '/how-it-works'
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: 900 },
  isMobile: WIDTH < 500,
  hasTouch: WIDTH < 500
});
const page = await ctx.newPage();

let problems = 0;

for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const found = await page.evaluate(vw => {
    const bad = [];
    const seen = new Set();

    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;

      // Ignore things that are deliberately scrollable in their own right.
      let scrollable = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ov = getComputedStyle(p).overflowX;
        if (ov === 'auto' || ov === 'scroll') { scrollable = true; break; }
      }
      if (scrollable) continue;

      // The region ticker is an infinite marquee — extending past the viewport is
      // the whole point of it.
      if (el.closest('.marquee-section')) continue;

      // Right edge beyond the viewport => clipped, because the page cannot scroll.
      if (r.right > vw + 1 || r.left < -1) {
        const key = (el.className || el.tagName).toString().trim().split(/\s+/)[0];
        if (seen.has(key)) continue;
        seen.add(key);
        bad.push({
          sel: (el.tagName.toLowerCase() +
                (el.className ? '.' + el.className.toString().trim().split(/\s+/).join('.') : ''))
                .slice(0, 62),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width)
        });
      }
    }
    return bad;
  }, WIDTH);

  if (found.length) {
    problems += found.length;
    console.log(`\nCLIPPED  ${route}  (viewport ${WIDTH}px)`);
    for (const f of found.slice(0, 8)) {
      console.log(`   ${String(f.w).padStart(4)}px wide, right edge ${f.right}  ${f.sel}`);
    }
    if (found.length > 8) console.log(`   ...and ${found.length - 8} more`);
  } else {
    console.log(`OK       ${route}`);
  }
}

await browser.close();
console.log(problems === 0 ? '\nNo clipped content.' : `\n${problems} clipped element(s).`);
process.exit(problems === 0 ? 0 : 1);
