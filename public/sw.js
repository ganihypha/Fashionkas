// FashionKas Service Worker v2.5
// IMPORTANT: Bump this version on every deploy to bust stale caches
const CACHE_NAME = 'fashionkas-v2.5';

// Install - skip caching HTML pages (they change frequently)
// Only cache truly static assets
self.addEventListener('install', (event) => {
  // Force activation immediately (don't wait for old SW to die)
  self.skipWaiting();
});

// Activate - clean ALL old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - network first for everything, cache fallback only for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and API requests (always go to network)
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // For navigation requests (HTML pages): ALWAYS network, no cache fallback
  // This prevents serving stale HTML with broken JS
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline | FashionKas</title><style>body{font-family:Inter,sans-serif;background:#0A0A0A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center}.c{max-width:320px}.icon{font-size:48px;margin-bottom:16px}h1{font-size:20px;margin:0 0 8px}p{color:#888;font-size:14px;margin:0 0 16px}a{background:linear-gradient(135deg,#A855F7,#7C3AED);color:#fff;text-decoration:none;padding:10px 24px;border-radius:12px;font-size:14px;font-weight:600;display:inline-block}</style></head><body><div class="c"><div class="icon">📡</div><h1>Kamu Offline</h1><p>Periksa koneksi internet dan coba lagi.</p><a href="javascript:location.reload()">Coba Lagi</a></div></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
    );
    return;
  }

  // For static assets (CSS, JS, images): network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          return cached || new Response('Offline', { status: 503 });
        });
      })
  );
});
