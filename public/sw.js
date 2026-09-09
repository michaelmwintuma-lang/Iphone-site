/**
 * Paindem Smart Cells service worker.
 *
 * Goal is data frugality, not offline-first purity: on a Ghanaian mobile bundle the phone
 * images are the expensive part, so those are cached hard. The app shell uses
 * network-first so a redeploy is picked up on the next visit rather than being pinned
 * to a stale build.
 */
const VERSION = 'v1';
const SHELL_CACHE = `paindem-shell-${VERSION}`;
const ASSET_CACHE = `paindem-assets-${VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(['/', '/index.html', '/manifest.webmanifest']))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== SHELL_CACHE && k !== ASSET_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never touch cross-origin traffic — fonts, WhatsApp, the form endpoint, maps.
  if (url.origin !== self.location.origin) return;

  // Images and hashed build assets: cache-first, they're immutable.
  const isStatic =
    url.pathname.startsWith('/phones/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/assets/');

  if (isStatic) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigations: network-first, fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then(cache => cache.put('/index.html', copy));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
  }
});
