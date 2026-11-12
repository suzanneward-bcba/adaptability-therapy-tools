/* Pick and Play offline support. Bump VERSION whenever pick-and-play.html changes. */
const VERSION = 'pp-2026-11-12';
const CORE = ['pick-and-play.html', 'pick-and-play.webmanifest', 'pick-and-play-icon.png',
              'pick-and-play-192.png', 'pick-and-play-512.png', 'pick-and-play-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('pp-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/pick-and-play.html');
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (isPage) {
    // Online: get the latest version and keep a copy. Offline: use the copy.
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('pick-and-play.html', copy)); return res;
    }).catch(() => caches.match('pick-and-play.html')));
  } else if (isFont || url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit)));
  }
});
