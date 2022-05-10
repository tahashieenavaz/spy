const cacheSlug = 'spygame';
const assets = ['/', '/index.html', '/app.js', 'logo.svg', 'style.css'];

self.addEventListener('install', (ie) => {
  ie.waitUntil(
    caches.open(cacheSlug).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fe) => {
  fe.respondWith(
    caches.match(fe.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
