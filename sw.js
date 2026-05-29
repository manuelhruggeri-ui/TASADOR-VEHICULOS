const CACHE = 'tasador-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Para APIs externas siempre ir a la red
  if (e.request.url.includes('api.mercadolibre.com') ||
      e.request.url.includes('dolarapi.com') ||
      e.request.url.includes('fonts.googleapis.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Para assets propios: cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
