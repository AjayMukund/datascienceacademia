/* Data Science Academia — service worker
   Strategy: HTML → network-first (always fresh when online, cached copy offline);
             CSS / JS / fonts / images → stale-while-revalidate;
             cross-origin (Supabase, Chatbase, CDN) → never cached.
   Bump VERSION to drop old caches. Static assets are also cache-busted with ?v=hash by the build. */
const VERSION = 'dsa-v7';
const RUNTIME = VERSION + '-runtime';

self.addEventListener('install', () => self.skipWaiting());

// Shown when the phone has no connection and the page was never saved — instead of the browser's
// "This site can't be reached / ERR_FAILED" (2026-11-25).
function offlinePage() {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>You're offline | Data Science Academia</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F6F3EC;color:#282D30;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-align:center;padding:24px}
h1{color:#10263D;font-size:1.6rem;margin:.6rem 0}p{color:#55606A;line-height:1.6;max-width:340px;margin:0 auto 1.4rem}
button{background:#10263D;color:#F6F3EC;border:0;border-radius:10px;padding:.85rem 1.6rem;font-size:1rem;font-weight:600}
svg{width:48px;height:48px;stroke:#C9A970;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}</style></head>
<body><div><svg viewBox="0 0 24 24"><path d="M12 20h.01M8.5 16.43a5 5 0 0 1 7 0M5 12.86a10 10 0 0 1 5.17-2.69M19 12.86a10 10 0 0 0-2.01-1.53M2 8.82a15 15 0 0 1 4.18-2.65M22 8.82a15 15 0 0 0-11.29-3.76M2 2l20 20"/></svg>
<h1>You're offline</h1><p>This page needs an internet connection. Check your Wi-Fi or mobile data, then try again.</p>
<button onclick="location.reload()">Try again</button></div></body></html>`;
  return new Response(html, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

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
      }).catch(() => caches.match(req).then(c => c || offlinePage()))
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
