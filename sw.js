/* Data Science Academia — service worker
   Strategy: HTML → network-first (always fresh when online, cached copy offline);
             CSS / JS / fonts / images → stale-while-revalidate;
             cross-origin (Supabase, Chatbase, CDN) → never cached.
   Bump VERSION to drop old caches. Static assets are also cache-busted with ?v=hash by the build. */
const VERSION = 'dsa-v5';
const RUNTIME = VERSION + '-runtime';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== RUNTIME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // never touch third parties
  if (url.pathname.includes('/admin/') || url.pathname.includes('/student/')) return; // portal pages stay live

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) caches.open(RUNTIME).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => caches.match(req).then(c => c || caches.match(new URL('404.html', self.registration.scope).href)))
    );
    return;
  }

  const dest = req.destination;
  if (['style', 'script', 'font', 'image'].includes(dest) || /\.(css|js|woff2|webp|png|jpg|jpeg|svg|ico)(\?|$)/.test(url.pathname + url.search)) {
    e.respondWith(
      caches.open(RUNTIME).then(cache =>
        cache.match(req).then(cached => {
          const network = fetch(req).then(res => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
