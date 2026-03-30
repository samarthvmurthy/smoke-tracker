const CACHE = 'smokefree-v1';
const SHELL = [
  '/index.html',
  '/app.html',
  '/about.html',
  '/favicon.svg',
  '/manifest.json'
];

// Cache the app shell on install
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

// Remove old caches on activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: app requires Supabase so we always try network.
// Fall back to cache only if offline (shows the shell at minimum).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update cache with fresh response for shell files
        if (SHELL.some(path => e.request.url.endsWith(path))) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
