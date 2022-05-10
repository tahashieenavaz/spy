const version = 3220;
const cacheSlug = 'spygame';
const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/logo.svg',
  '/style.css',
  '/eventListeners.js',
  '/functions.js',
  '/wordlist.json',
];

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
      return res || fetch(fe.request);
    })
  );
});
