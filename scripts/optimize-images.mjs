/**
 * Build-time asset pass.
 *
 *  1. Generates PWA icons from the shop logo.
 *  2. Produces sharp 1x and 2x WebP renditions of every phone image.
 *
 * IMPORTANT — source quality ceiling:
 * Most source PNGs are only ~250-290px wide. Nothing here can invent detail that was
 * never captured. What this does do is (a) resample with Lanczos3 rather than leaving the
 * browser to do a naive bilinear upscale, (b) apply a restrained unsharp mask to recover
 * perceived edge contrast, and (c) emit a true 2x file so retina screens stop guessing.
 * For genuinely crisp product shots the source images must be replaced at 1200px+ wide.
 * Run `npm run audit:images` to see which files are below par.
 *
 * Run with:  npm run optimize:images
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PHONES_DIR = path.join(ROOT, 'public', 'phones');
const ICONS_DIR = path.join(ROOT, 'public', 'icons');
const LOGO = path.join(ROOT, 'public', 'logo.jpg');

/** Width we want available at 2x for the largest on-screen use (hero ~420px CSS). */
const TARGET_2X = 840;

async function makeIcons() {
  await mkdir(ICONS_DIR, { recursive: true });

  await sharp(LOGO).resize(192, 192, { fit: 'cover', kernel: 'lanczos3' }).png()
    .toFile(path.join(ICONS_DIR, 'icon-192.png'));

  await sharp(LOGO).resize(512, 512, { fit: 'cover', kernel: 'lanczos3' }).png()
    .toFile(path.join(ICONS_DIR, 'icon-512.png'));

  // Maskable icons need ~10% safe padding on every edge or Android crops the logo.
  await sharp(LOGO)
    .resize(410, 410, { fit: 'cover', kernel: 'lanczos3' })
    .extend({
      top: 51, bottom: 51, left: 51, right: 51,
      background: { r: 10, g: 34, b: 63, alpha: 1 }
    })
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-maskable-512.png'));

  await sharp(LOGO).resize(48, 48, { fit: 'cover', kernel: 'lanczos3' }).png()
    .toFile(path.join(ICONS_DIR, 'favicon-48.png'));

  console.log('icons generated');
}

async function convertPhones() {
  const files = (await readdir(PHONES_DIR)).filter(f => f.endsWith('.png'));
  const sizes = {};
  let before = 0;
  let after = 0;
  const lowRes = [];

  for (const file of files) {
    const src = path.join(PHONES_DIR, file);
    const meta = await sharp(src).metadata();

    // Record the *display* geometry as the 1x rendition's dimensions.
    const oneX = Math.min(meta.width, TARGET_2X / 2);
    const scale = oneX / meta.width;
    const oneH = Math.round(meta.height * scale);

    sizes[`/phones/${file}`] = { width: Math.round(oneX), height: oneH };
    if (meta.width < 700) lowRes.push({ file, w: meta.width, h: meta.height });

    // 1x — downscale (or pass through) then gently sharpen.
    const out1 = src.replace(/\.png$/, '.webp');
    const info1 = await sharp(src)
      .resize(Math.round(oneX), oneH, { kernel: 'lanczos3', fit: 'inside' })
      .sharpen({ sigma: 0.6, m1: 0.4, m2: 0.9 })
      .webp({ quality: 92, effort: 6 })
      .toFile(out1);

    // 2x — the file retina screens actually need. Upscaling with lanczos3 + unsharp
    // beats the browser's own upscale, but cannot exceed the source's real detail.
    const out2 = src.replace(/\.png$/, '@2x.webp');
    const info2 = await sharp(src)
      .resize(Math.round(oneX * 2), oneH * 2, { kernel: 'lanczos3', fit: 'inside' })
      .sharpen({ sigma: 0.8, m1: 0.5, m2: 1.1 })
      .webp({ quality: 88, effort: 6 })
      .toFile(out2);

    before += (await stat(src)).size;
    after += info1.size + info2.size;
  }

  await writeFile(
    path.join(ROOT, 'src', 'data', 'image-sizes.json'),
    JSON.stringify(sizes, null, 2) + '\n'
  );

  console.log(
    `${files.length} images -> webp 1x+2x: ` +
    `${(before / 1024 / 1024).toFixed(2)} MB source -> ${(after / 1024 / 1024).toFixed(2)} MB output`
  );

  if (lowRes.length) {
    console.log(`\n${lowRes.length} source image(s) below 700px wide — these cannot render`);
    console.log('crisply at hero size no matter what we do. Replace these files:\n');
    lowRes.sort((a, b) => a.w - b.w);
    for (const r of lowRes) console.log(`   ${String(r.w).padStart(4)} x ${String(r.h).padEnd(5)}  ${r.file}`);
    console.log('\nAim for 1200px+ wide, transparent background PNG.');
  }
}

await makeIcons();
await convertPhones();
