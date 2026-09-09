import React from 'react';
import SIZES from '../data/image-sizes.json';

/**
 * Serves WebP with a 1x/2x srcset so retina screens get real pixels instead of a browser
 * upscale, plus a PNG fallback. Always emits intrinsic width/height so the browser
 * reserves the box before the image lands.
 *
 * `width` sets the *display* width. It is capped at the rendition's natural width —
 * stretching a 280px source across 420px is what made the phones look soft.
 */
export default function PhoneImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  ...rest
}) {
  const intrinsic = SIZES[src];
  const webp1x = src.replace(/\.png$/, '.webp');
  const webp2x = src.replace(/\.png$/, '@2x.webp');

  let w = width;
  let h = height;

  if (intrinsic) {
    // Never ask the browser to draw larger than the rendition we actually have.
    if (w) w = Math.min(w, intrinsic.width);
    if (w && !h) h = Math.round((intrinsic.height / intrinsic.width) * w);
    else if (h && !w) w = Math.round((intrinsic.width / intrinsic.height) * h);
    else if (!w && !h) { w = intrinsic.width; h = intrinsic.height; }
  }

  return (
    <picture>
      <source srcSet={`${webp1x} 1x, ${webp2x} 2x`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={w}
        height={h}
        loading={loading}
        decoding="async"
        fetchpriority={fetchPriority}
        {...rest}
      />
    </picture>
  );
}
