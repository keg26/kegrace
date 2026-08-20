/* KEG RACE · Puerta — service worker
   Cachea la app Y el SDK de Firebase, para que abra y restaure la sesión
   sin señal. Las llamadas a la base de datos siempre van a la red:
   si fallan, la app ya sabe encolar y seguir trabajando. */

const CACHE = 'kegrace-puerta-v2';

const LOCAL = ['./', './puerta.html', './manifest.json', './firebase-config.js'];

// El SDK vive en gstatic. Lo precacheamos para que import() funcione offline.
const SDK = [
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(LOCAL).catch(() => {});
    // Si gstatic falla, no rompemos la instalación.
    await Promise.all(SDK.map(u => c.add(u).catch(() => {})));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Datos en vivo (Firestore/Auth API): nunca cachear.
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('firebaseapp.com')) return;

  const esSDK = url.hostname === 'www.gstatic.com';
  if (url.origin !== self.location.origin && !esSDK) return;

  // SDK: cache primero (no cambia nunca en una versión fija).
  if (esSDK) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }))
    );
    return;
  }

  // App propia: red primero (para recibir actualizaciones), cache de respaldo.
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./puerta.html')))
  );
});
