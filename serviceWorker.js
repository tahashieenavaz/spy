const version = 21222321;
const cacheSlug = 'spygame';
const assets = [
  '/',
  '/index.html',
  '/assets/images/menu.svg',
  '/assets/images/logo.svg',
  '/assets/images/x.svg',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/eventListeners.js',
  '/assets/js/functions.js',
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
