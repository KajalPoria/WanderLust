// WanderLust Service Worker for Offline Support
const CACHE_VERSION = 'wanderlust-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/listings',
    '/css/style.css',
    '/css/rating.css',
    '/js/script.js',
    '/js/map.js',
    '/offline.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

// Maximum cache sizes
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 100;

// Helper: Limit cache size
const limitCacheSize = (cacheName, maxItems) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > maxItems) {
                cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
            }
        });
    });
};

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
            })
            .catch(err => {
                console.log('[SW] Cache install failed:', err);
                // Don't fail install if some assets can't be cached
                return Promise.resolve();
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name.startsWith('wanderlust-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome extensions and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Strategy 1: Cache-first for images (including Cloudinary)
    if (request.destination === 'image' || url.hostname.includes('cloudinary') || /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(fetchResponse => {
                    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'error') {
                        return fetchResponse;
                    }
                    return caches.open(IMAGE_CACHE).then(cache => {
                        cache.put(request, fetchResponse.clone());
                        limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
                        return fetchResponse;
                    });
                }).catch(() => {
                    // Return placeholder image for offline
                    return new Response(
                        '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#e0e0e0"/><text x="50%" y="50%" text-anchor="middle" fill="#999" font-size="16">Image unavailable offline</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                });
            })
        );
        return;
    }

    // Strategy 2: Cache-first for static assets (CSS, JS, fonts)
    if (url.pathname.match(/\.(css|js|woff2?|ttf|eot)$/)) {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request).then(fetchResponse => {
                    if (!fetchResponse || fetchResponse.status !== 200) {
                        return fetchResponse;
                    }
                    return caches.open(STATIC_CACHE).then(cache => {
                        cache.put(request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }

    // Strategy 3: Network-first for API calls and dynamic content
    if (url.pathname.startsWith('/listings') || url.pathname.startsWith('/bookings') || url.pathname.startsWith('/wishlist')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }
                    // Cache successful responses
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                        limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
                    });
                    return response;
                })
                .catch(() => {
                    // Try to serve from cache if network fails
                    return caches.match(request).then(response => {
                        if (response) {
                            return response;
                        }
                        // If no cache and it's an HTML request, show offline page with cached listings
                        if (request.headers.get('accept')?.includes('text/html')) {
                            console.log('[SW] Serving offline page for:', request.url);
                            return caches.match('/offline.html');
                        }
                    });
                })
        );
        return;
    }

    // Strategy 4: Network-first with cache fallback for everything else
    event.respondWith(
        fetch(request)
            .then(response => {
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(request, responseClone);
                    limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
                });
                return response;
            })
            .catch(() => {
                return caches.match(request).then(response => {
                    if (response) {
                        return response;
                    }
                    const acceptHeader = request.headers.get('accept');
                    if (acceptHeader && acceptHeader.includes('text/html')) {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
    if (event.data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(name => caches.delete(name))
                );
            }).then(() => {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});
