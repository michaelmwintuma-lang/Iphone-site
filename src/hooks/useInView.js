import { useEffect, useRef, useState } from 'react';

/**
 * A single shared, debounced scroll/resize listener that re-checks every element still
 * waiting to be revealed. IntersectionObserver samples on frame boundaries, so a fast
 * fling-scroll can jump clean over an element and never report it — which would leave
 * that content permanently at opacity 0. One listener for the whole page, torn down when
 * the last waiter is revealed.
 */
const waiters = new Set();
let listening = false;
let timer = null;

function sweep() {
  for (const w of [...waiters]) {
    const node = w.ref.current;
    if (!node) { waiters.delete(w); continue; }
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 240 && rect.bottom > -240) {
      w.reveal();
      waiters.delete(w);
    }
  }
  if (waiters.size === 0) stopListening();
}

function onScroll() {
  clearTimeout(timer);
  timer = setTimeout(sweep, 90);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  clearTimeout(timer);
}

/**
 * Returns [ref, isInView]. Fires once, then stops watching — these are entrance
 * animations, not scroll-linked effects.
 *
 * Anything wrapped in this starts at opacity 0, so a missed callback means invisible
 * content. Hence three nets: a pre-firing rootMargin, an immediate rect check at mount,
 * and the shared scroll sweep above.
 */
export function useInView({ threshold = 0, rootMargin = '240px 0px 240px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    // Already on screen at mount (refresh mid-page, short pages, direct anchor).
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 240 && rect.bottom > -240) {
      setInView(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        reveal();
        observer.disconnect();
      }
    }, { threshold, rootMargin });
    observer.observe(node);

    const waiter = { ref, reveal };
    waiters.add(waiter);
    startListening();

    return () => {
      observer.disconnect();
      waiters.delete(waiter);
      if (waiters.size === 0) stopListening();
    };
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/**
 * Counts from 0 up to `target` once the element scrolls into view.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.4, rootMargin: '0px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || duration <= 0) {
      setValue(target);
      return;
    }

    let frame;
    const start = performance.now();
    // easeOutCubic — fast start, gentle settle
    const ease = t => 1 - Math.pow(1 - t, 3);

    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      const next = target * ease(progress);
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, decimals]);

  return [ref, value];
}
