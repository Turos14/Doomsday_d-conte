// Réseau d'abord (pour récupérer les nouveaux liens), cache en secours hors ligne
const CACHE = "doomsday-v3";
const FICHIERS = [
  "./", "index.html", "style.css", "app.js", "videos.js", "manifest.json",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png",
  "img/photo-j2.jpg", "img/photo-j4.jpg", "img/photo-j8.jpg", "img/photo-j11.jpg", "img/photo-j13.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then((rep) => {
        const copie = rep.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copie));
        return rep;
      })
      .catch(() => caches.match(e.request))
  );
});
