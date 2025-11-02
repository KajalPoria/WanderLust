/* WanderLust Service Worker */
const VERSION = 'v1';
const STATIC_CACHE = `wl-static-${VERSION}`;
const PAGES_CACHE = `wl-pages-${VERSION}`;

// Local assets to precache
const PRECACHE_ASSETS = [
  '/offline.html',
  '/css/style.css',
  '/css/rating.css',
  '/js/script.js',
  '/js/map.js',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('wl-') && k !== STATIC_CACHE && k !== PAGES_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Network helper with timeout
async function networkWithTimeout(request, timeoutMs = 4000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    fetch(request)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigation requests: try network first, fall back to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await networkWithTimeout(request, 4000);
          const cache = await caches.open(PAGES_CACHE);
          cache.put(request, response.clone());
          return response;
        } catch (e) {
          const cache = await caches.open(PAGES_CACHE);
          const cached = await cache.match(request);
          return (
            cached || (await caches.match('/offline.html'))
          );
        }
      })()
    );
    return;
  }

  // Same-origin static assets: stale-while-revalidate
  if (url.origin === self.location.origin && (/\.(?:js|css|png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname) || url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/'))) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => undefined);
        return cached || fetchPromise || (await caches.match('/offline.html'));
      })()
    );
    return;
  }

  // External images and map tiles: cache-first with network fallback
  if (/tile\.openstreetmap\.org|unpkg\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.gstatic\.com|fonts\.googleapis\.com/.test(url.host)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (e) {
          return await caches.match('/offline.html');
        }
      })()
    );
    return;
  }
});
