const CACHE = 'dsa-v1';
const PRECACHE = [
  '/',
  '/datascienceacademia/',
  '/datascienceacademia/index.html',
  '/datascienceacademia/login.html',
  '/datascienceacademia/portal.css',
  '/datascienceacademia/style.css',
  '/datascienceacademia/script.js',
  '/datascienceacademia/js/supabase-client.js',
  '/datascienceacademia/js/auth-guard.js',
  '/datascienceacademia/js/portal.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
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
  // Only cache same-origin GET requests; skip Supabase API calls
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('supabase.co')) return;
  if (e.request.url.includes('cdn.jsdelivr.net')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
      return cached || network;
    })
  );
});
